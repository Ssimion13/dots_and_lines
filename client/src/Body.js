import React from "react";
import {Link} from "react-router-dom"
import dots from "./dots.jpg"


function Body (){
  return (
    <div className="body">
     <h1 className="Title"> Dots And Lines  </h1>
     <div className="rulesBox">
       <div className="homeImage">
         <img className="image" alt="Dot Picture" src={dots} />
       </div>
       <div className="rules">
         <br/>
         <h2>  How To Play </h2>
         <br/>
         <h3> To play the game, please create an account or login with the buttons in the top right corner of the screen. The game and play Buttons will not work if you are not logged in! </h3>
         <br/>
         <h3> Please note, this game is meant to be played with two players taking turns on the same computer! </h3>
         <br/>
         <h3> On your turn, place lines on the screen by clicking on a box that borders the line you want to create. Press Enter to place the line. You score a point and can go twice in a row if you make a 1+ full squares on your turn. Good Luck!</h3>
       </div>
     </div>
       <Link to="./Game/Game.js">
         <img alt="Button" src="http://www.thelibertybeacon.com/wp-content/uploads/2015/11/PlayButtonBlue.png" />
       </Link>
    </div>
  )
}

export default Body
