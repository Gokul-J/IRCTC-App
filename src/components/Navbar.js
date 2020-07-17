import React from 'react';
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux';

class Navbar extends React.Component {

    handleLogout(event){
        this.props.logoutUser(this.props.history);
        event.preventDefault();
    }

    render() {
        const { isAuthenticated } = this.props;

        let view;
        if (!isAuthenticated) {
            view =
                <div className="navbar-nav ml-auto">
                    <a className="nav-item mr-sm-3 nav-link" href="/login">Login</a>
                    <a className="nav-item mr-sm-3 nav-link" href="/signup">SignUp</a>
                </div>
        }
        else {
            view =
                <div className="navbar-nav ml-auto">
                    <h6 className="nav-item text-white nav-link">{this.props.user.name}</h6>
                    <p className="nav-item mr-sm-3 nav-link" onClick={this.handleLogout.bind(this)}>Logout</p>
                </div>
        }
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark ">
                <a className="navbar-brand ml-sm-5 mx-auto" href="/">IRCTC</a>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
                <div className=" navbar-collapse text-center" id="navbarNav">
                    {view}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return{
        logoutUser : (history) => dispatch(authActions.logoutUser(history))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);