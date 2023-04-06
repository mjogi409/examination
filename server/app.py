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
email_sender = "jogimalay11@gmail.com"
email_password = "aljyzdlnspczokwu"

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
    test_id = session["testid"]
    print("hello")
    qid = request.form.get("qid")
    print("world")
    cur = mysql.connection.cursor()

    results = cur.execute(
        "Select qu.examid,qu.uid,qu.qid,qu.q,qu.a,qu.b,qu.c,qu.d,qu.ans,qu.marks,e.subject,e.topic from questions qu inner join exam e on qu.examid=e.examid where qu.examid = %s and qu.qid=%s", (test_id, qid))

    if results > 0:
        data = cur.fetchone()
        del data['ans']
        return jsonify({"testid": test_id, "data": data})

    return


if __name__ == "__main__":
    app.run(debug=True)
