from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_mysqldb import MySQL
from config import Applicationconfig
from models import db, User
from smtplib import SMTP_SSL
import ssl
import random
from math import floor
from email.message import EmailMessage
from objective import ObjectiveTest
import pandas as pd

app = Flask(__name__)
app.config.from_object(Applicationconfig)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'oeps'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
email_sender = "malayjogi44@gmail.com"
email_password = "pyvskldepnljhlmt"

mysql = MySQL(app)
em = EmailMessage()
em["From"] = email_sender
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/@me")
@cross_origin(supports_credentials=True)
def get_current_user():
    user_id = session.get("user_id")
    email = session.get("email")

    if not email:
        return jsonify({"error": "Unauthorized"}), 401
    if user_id == None:
        return jsonify({"error": "Unauthenticated"}), 401

    user = User.query.filter_by(id=user_id).first()

    if user is None:

        if user_id == "admin":
            return jsonify({"id": "admin", "email": email})
        else:
            return jsonify({"error": "Unauthenticated"}), 401

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/register", methods=["POST"])
@cross_origin(supports_credentials=True)
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
    if email == "jogimalay11@gmail.com" and password == "123456":
        session["email"] = email
        session["user_id"] = "admin"
        return jsonify({"id": "admin", "email": email})

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id
    session["email"] = user.email

    return jsonify({
        "id": session["user_id"],
        "email": session["email"]
    })


@app.route("/logout", methods=["POST"])
@cross_origin(supports_credentials=True)
def logout_user():
    if session["email"] != None:
        session.pop("email")

    if session["user_id"] != None:
        session.pop("user_id")

    return "200"


@app.route("/sendotp")
@cross_origin(supports_credentials=True)
def sendotp():
    digits = "0123456789"
    OTP = ""
    for i in range(5):
        OTP += digits[floor(random.random() * 10)]
    session["otp"] = OTP
    subject = "OEPS - VERIFY OTP"
    body = """
        Hello sir/mam, Your Otp is :
    """ + OTP

    context = ssl.create_default_context()
    with SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        em["To"] = session["email"]
        em["Subject"] = subject
        em.set_content(body)
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, session["email"], em.as_string())
        del em["To"]
    return "otp has been sent successfully to " + session["email"]


@app.route("/verifyotp", methods=["POST"])
@cross_origin(supports_credentials=True)
def verifyotp():
    otpreq = request.json["otp"]
    otp = session["otp"]
    if (otpreq != otp):
        return jsonify({"error": "Unauthorized"}), 401
    return "200"


@app.route('/test_generate', methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def test_generate():

    inputText = request.json["itext"]
    noOfQues = request.json["noq"]
    objective_generator = ObjectiveTest(inputText, noOfQues)
    question_list, answer_list = objective_generator.generate_test()
    testgenerate = zip(question_list, answer_list)
    return jsonify({"question": question_list, "answer": answer_list})


@app.route('/create_exam', methods=['POST'])
@cross_origin(supports_credentials=True)
def create_exam():

    topic = request.form.get("topic")
    subject = request.form.get("subject")
    examid = request.form.get("examid")
    file = request.files.get('file')
    file.save("upload/" + file.filename)
    print("Uploaded file: " + file.filename)
    fields = ['qid', 'q', 'a', 'b', 'c', 'd', 'ans', 'marks']
    file.seek(0)
    ef = pd.read_csv(file)
    df = pd.DataFrame(ef, columns=fields)
    cur = mysql.connection.cursor()

    cur.execute("INSERT INTO exam(examid,subject,topic,questionfile) values(%s,%s,%s,%s)",
                (examid, subject, topic, file.filename))
    cur.connection.commit()

    for row in ef.index:
        print(ef.index)
        cur.execute('INSERT INTO questions(examid,qid,q,a,b,c,d,ans,marks,uid) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)', (examid,
                    df['qid'][row], df['q'][row], df['a'][row], df['b'][row], df['c'][row], df['d'][row], df['ans'][row], df['marks'][row], session.get('email')))
        cur.connection.commit()
    return jsonify({
        "message": "created"
    })


@app.route('/give_test', methods=["POST"])
@cross_origin(supports_credentials=True)
def give_tests():
    try:
        test_id = request.form.get("exam_id")

        cur = mysql.connection.cursor()
        results = cur.execute(
            "SELECT examid,subject,topic FROM exam where examid = '"+test_id+"'")
        if results > 0:
            data = cur.fetchone()
            session["testid"] = test_id
            return jsonify({"results": data})
        else:
            return jsonify({"error": "Not Found"}), 404
    except:
        print("FAILED")
        return jsonify({"Exception": "there is an exception"})


@app.route("/testquiz", methods=["POST", "GET"])
@cross_origin(supports_credentials=True)
def test_quiz():
    session["changelog"] = 0
    test_id = session["testid"]
    qid = request.form.get("qid")

    cur = mysql.connection.cursor()
    cur2 = mysql.connection.cursor()
    results = cur.execute(
        "Select qu.examid,qu.uid,qu.qid,qu.q,qu.a,qu.b,qu.c,qu.d,qu.ans,qu.marks,e.subject,e.topic from questions qu inner join exam e on qu.examid=e.examid where qu.examid = %s and qu.qid=%s", (test_id, qid))
    results2 = cur2.execute(
        "Select MAX(CAST(qid as INT)) AS maxqid from questions")
    data2 = cur2.fetchone()
    if results > 0:
        data = cur.fetchone()

        del data['ans']
        print("MAXQID", (data2["maxqid"] + 1))
        return jsonify({"testid": test_id, "data": data, "maxqid": data2["maxqid"] + 1, "email": session.get('email')})
    else:

        return jsonify({"testid": test_id, "maxqid": data2["maxqid"] + 1})


@app.route("/submitquiz", methods=["POST"])
@cross_origin(supports_credentials=True)
def submitquiz():
    data = request.json["answer"]
    test_id = session["testid"]
    cur = mysql.connection.cursor()
    qid = []
    qqid = []
    option = []
    ans = []
    marks = []
    mark = []
    totalmarks = 0
    for k in data:
        qqid.append(k["qid"])
        option.append(k["option"])

    print(qqid)
    print(option)
    results = cur.execute(
        "Select cast(qid as INT) as qid,marks,ans from questions where examid = '"+test_id+"'")
    if results > 0:
        datas = cur.fetchall()
        for i in datas:
            qid.append(i["qid"])
            ans.append(i["ans"])
            marks.append(i["marks"])
        print("QID FROM DATABASE:", qid)
        print("ANS FROM DATABASE:", ans)
        print("MARKS FROM DATABASE:", marks)

        for j in range(len(qqid)):
            if qqid[j] == qid[j]:
                if option[j] == ans[j]:
                    mark.append(marks[j])
        for t in mark:
            totalmarks += t

        cur2 = mysql.connection.cursor()
        results2 = cur2.execute("INSERT INTO results values(%s,%s,%s)",
                                (session.get('email'), test_id, totalmarks))

        mysql.connection.commit()
        if results2 > 0:
            return jsonify({"answer": "fetched"})


@app.route("/weblog", methods=["POST"])
@cross_origin(supports_credentials=True)
def weblog():
    test_id = session["testid"]
    email = session["email"]
    tracker = request.json["weblog"]
    cur = mysql.connection.cursor()

    results = cur.execute(
        "Select * from weblog where uid = %s and examid=%s", (email, test_id))
    if results > 0:
        cur2 = mysql.connection.cursor()
        cur2.execute("Update weblog set tracker= %s where uid = %s and examid=%s",
                     (tracker, email, test_id))
    else:
        cur2 = mysql.connection.cursor()
        cur2.execute("Insert into weblog values(%s,%s,%s)",
                     (email, test_id, tracker))
    mysql.connection.commit()

    return jsonify({"success": True})


@app.route("/updatequestion", methods=["POST"])
@cross_origin(supports_credentials=True)
def updatequestion():
    test_id = request.json["ExamId"]
    email = session["email"]
    cur = mysql.connection.cursor()
    results = cur.execute(
        "Select * from questions where examid = %s and uid = %s", (test_id, email))
    if results > 0:
        data = cur.fetchall()
        qid = []
        question = []
        a = []
        b = []
        c = []
        d = []
        marks = []
        ans = []
        for i in data:
            qid.append(i['qid'])
            question.append(i['q'])
            marks.append(i['marks'])
            a.append(i['a'])
            b.append(i['b'])
            c.append(i['c'])
            d.append(i['d'])
            ans.append(i['ans'])

        return jsonify({"qid": qid, "q": question, "a": a, "b": b, "c": c, "d": d, "ans": ans, "marks": marks})


@app.route("/selectquestion", methods=["POST"])
@cross_origin(supports_credentials=True)
def selectquestion():
    test_id = request.json["ExamId"]
    qid = request.json["qid"]
    cur = mysql.connection.cursor()
    result = cur.execute(
        "SELECT * from questions where qid = %s and examid = %s and uid = %s", (qid, test_id, session["email"]))
    if result > 0:
        data = cur.fetchone()
        return jsonify({
            "qid": data["qid"],
            "question": data["q"],
            "answer": data["ans"],
            "a": data["a"],
            "b": data["b"],
            "c": data["c"],
            "d": data["d"],
            "marks": data["marks"]
        })
    else:
        return jsonify({"error": "Not found"})


@app.route("/updatedquestion", methods=["POST"])
@cross_origin(supports_credentials=True)
def updatedquestion():
    testid = request.json["ExamId"]
    qid = request.json["qid"]
    question = request.json["selectedquestion"]
    answer = request.json["selectedAnswer"]
    optiona = request.json["selectedoptiona"]
    optionb = request.json["selectedoptionb"]
    optionc = request.json["selectedoptionc"]
    optiond = request.json["selectedoptiond"]
    marks = request.json["selectedmarks"]

    cur = mysql.connection.cursor()
    cur.execute("Update questions set q = %s, ans=%s, a=%s,b=%s,c=%s,d=%s,marks=%s where qid = %s and examid = %s and uid= %s",
                (question, answer, optiona, optionb, optionc, optiond, marks, qid, testid, session["email"]))
    mysql.connection.commit()
    cur2 = mysql.connection.cursor()
    results = cur2.execute(
        "Select * from questions where qid=%s and examid=%s and uid=%s", (qid, testid, session["email"]))
    if results > 0:
        data = cur2.fetchone()
        return jsonify({
            "qid": data["qid"],
            "question": data["q"],
            "answer": data["ans"],
            "a": data["a"],
            "b": data["b"],
            "c": data["c"],
            "d": data["d"],
            "marks": data["marks"]
        })


if __name__ == "__main__":
    app.run(debug=True)
