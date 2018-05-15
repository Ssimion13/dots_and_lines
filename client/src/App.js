import React, {Component} from "react";
import {connect} from "react-redux"
import Navbar from "./Navbar";
import {Switch, Route, withRouter, Redirect} from "react-router-dom"
import Footer from "./Footer";
import Body from "./Body";
import Game from "./Game/Game"
import Login from "./Login"
import SignUp from "./SignUp"
import Profile from "./Profile"
import About from "./About.js"
import ProtectedRoute from "./ProtectedRoute.js"
import {verify} from "./Redux/auth"

class App extends Component {
    // componentDidMount(){
    //     let user = JSON.parse(localStorage.user)
    //     user.token = localStorage.token
    //     this.props.verify(user)
    // }
    render(){
        let isAuthenticated = false
        if (localStorage.token){
            isAuthenticated = true
        }
        console.log(isAuthenticated);


        return (
            <div className="app">
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Body}/>
                    <Route exact path="/about" component={About}/>
                    <Route path="/login" render={(props)=>{
                            return isAuthenticated ?
                            <Redirect to="/profile"/> :
                                <Login {...props}/>
                        }}/>
                    <Route path="/signup" component={SignUp}/>
                    <ProtectedRoute path="/profile" component={Profile}/>
                    <ProtectedRoute path="/game/game" component={Game}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.user
}

export default withRouter(connect(mapStateToProps,{verify})(App))
