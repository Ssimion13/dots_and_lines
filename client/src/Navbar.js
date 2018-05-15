import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {logout} from "./Redux/auth"


function Navbar (props){
    let isAuthenticated = false
    if (localStorage.token){
        isAuthenticated = true
    }
  return (
    <div className="navbar">
      <div className="links"><Link className="linkText" to="/"> Home </Link></div>
      <div className="links"><Link className="linkText" to="/about"> About </Link></div>
      <div className="links"><Link className="linkText" to="/game/game"> Game </Link></div>
      {isAuthenticated ? null : <div className="links"><Link className="linkText" to="/login"> Login </Link></div>}
      {isAuthenticated ? null : <div className="links"><Link className="linkText" to="/signUp"> Sign Up </Link></div>}
      {isAuthenticated ? <div className="links"><Link className="linkText" to="/profile"> Profile </Link></div>: null}
      {isAuthenticated ? <div className="links" onClick={props.logout} to="/">Log Out</div>: null}
    </div>
  )
}

const mapStateToProps = (state) => {
    return state.user
}

export default connect(mapStateToProps, {logout})(Navbar)
