import React from 'react';
import { LogoutUser } from "../user/users";
import { Link } from "react-router-dom";



export function Navigation () {    // if login change navbar

   function Mainlogo() {
      var user_id = localStorage.getItem("id")

      if (localStorage.getItem("jwt") !== null) {
         return(
            <Link to={`/user/${user_id}`} className="navbar-brand bg-black text-white">EliceIn</Link>
         )
      } 
   
      return(
         <Link to="/" className="navbar-brand text-white">EliceIn</Link>
      );
   }
   
   function Submenu(){

       var user_id = localStorage.getItem("id")

      if (localStorage.getItem("jwt") !== null) {
         return (
            <ul className="nav nav-pills-black nav-justified " bg = "rgb(50,150,150)">
               <Link className="nav-link text-white" to={`/user/${user_id}`}>Main</Link>
               <Link className="nav-link text-white" to="/network">Network</Link>
               <Link className="nav-link text-white" to="/"><LogoutUser /></Link>
            </ul>
         )
      }
      return (
         <ul className="nav nav-pills-black nav-justified" style ={{text : "red"}}>
            <Link className="nav-link text-white" to="/">Login</Link>
         </ul>
      )
   } 

   return (
       <div div className="fluid">
         <nav className="navbar navbar-light justify-content-between">
               <Mainlogo />
               <Submenu />
         </nav>
       </div>
    );
}