import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaAccusoft,
    FaPaperPlane,
    FaPage4,
    FaPaperclip,
    FaFileExcel,
    FaGifts,
    FaGalacticRepublic,
    FaLine,
    FaLaptop,
    FaGetPocket,
    FaBlog,
    FaDashcube,
    FaListAlt,
    FaListOl,
    FaListUl
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/ProfDashboard",
            name:"ProfDashboard",
            icon:<FaListAlt/>
        },
        {
            path:"/GenerateQuestion",
            name:"Generate Question",
            icon:<FaListUl/>
        },
        {
            path:"/Result",
            name:"Results",
            icon:<FaRegChartBar/>
        }
    ]
    return (
        <div id="div1">
            
            <div id="sidebar1" style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div id="top_section" className="top_section">
                   <h1 id="logo" style={{display: isOpen ? "block" : "none"}} className="logo">OEPS</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} id="bars" className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} id="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} id="linktext">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main id="main">{children}</main>
        </div>
    );
};

export default Sidebar;