import React, {Component} from "react"
import {connect} from "react-redux"

class Profile extends Component {

    render(props){
        return(
            <div>
                <h2>Welcome, <i>@{this.props.username}</i></h2>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.user
}

export default connect(mapStateToProps, {})(Profile)
