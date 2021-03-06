import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

class ProtectedRoute extends Component {
    render(){
        let isAuthenticated = false
        if (localStorage.token){
            isAuthenticated = true
        }
        const Component = this.props.component
        const path = this.props.path
        return (isAuthenticated ?
                <Route path={path} render={(props) => {return <Component {...props} />}} /> :
                <Redirect to="/" />
        )
    }
}

const mapStateToProps = (state) => {
    return state.user
}

export default connect(mapStateToProps,{})(ProtectedRoute)
