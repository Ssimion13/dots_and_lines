import React, { Component } from 'react';
import LoginForm from "./LoginForm";
import {connect} from "react-redux"
import {login} from "../Redux/auth"

class LoginFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                username: "",
                password: ""
            }
        }
    }

    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    clearInputs() {
        this.setState({
            inputs: {
                username: "",
                password: ""
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        // This is where we will call our signin function from redux
        this.props.login(this.state.inputs)
        this.clearInputs();
    }

    render() {
        return (
            <LoginForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                {...this.state.inputs} />
        )
    }
}

export default connect(null, {login})(LoginFormContainer);
