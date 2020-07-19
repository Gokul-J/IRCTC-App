import React from 'react';
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {

  handleLogout(event) {
    this.props.logoutUser(this.props.history);
    event.preventDefault();
  }

  render() {
    const { isAuthenticated, flash, flashMessage } = this.props;

    let view, flashMes;
    if (!isAuthenticated) {
      view =
        <div className="navbar-nav ml-auto">
          <a className="nav-item mr-sm-3 nav-link" href="/login">Login</a>
          <a className="nav-item mr-sm-3 nav-link" href="/register">SignUp</a>
        </div>
    }
    else {
      view =
        <div className="navbar-nav ml-auto">
          <p className="nav-item  nav-link">{this.props.user.name}</p>
          <p className="nav-item mr-sm-3 nav-link" onClick={this.handleLogout.bind(this)}>Logout</p>
        </div>
    }

    if(flash){
      flashMes= <p>{flashMessage}</p>
      // setTimeout(() => {
      //   this.props.resetFlash();
      // }, 5000);
    }
    return (
      <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed">
        <a className="navbar-brand" href="/">IRCTC</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">Book Tickets</a>
            <a className="nav-item nav-link" href="/viewTickets">View Tickets</a>
          </div>
          <div className=" ml-md-auto">
            {view}
          </div>
        </div>
      </nav>
      {flashMes}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    flashMessage: state.auth.flashMessage,
    flash: state.auth.flash
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: (history) => dispatch(authActions.logoutUser(history)),
    resetFlash: () => dispatch(authActions.resetFlash())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));