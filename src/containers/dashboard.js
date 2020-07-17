import React from 'react';
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux';

class dashboard extends React.Component{

    handleLogout(event){
        this.props.logoutUser(this.props.history);
        event.preventDefault();
    }

    render(){
        console.log(this.props.user);
        const name = this.props.user.name;
        console.log(name);
        return(
        <div>
            <h1>Logged in as {this.props.user.name}</h1>
            <button className="btn btn-danger" onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        logoutUser : (history) => dispatch(authActions.logoutUser(history))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(dashboard);