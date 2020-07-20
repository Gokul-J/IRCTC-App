import React from 'react';
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hideLogin(){
    this.props.showLogin(false);
  }

  showSignup(){
    this.props.showSignup(true);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    this.props.loginUser({ email: email, password: password });
    event.preventDefault();
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.success===true){
      console.log("update")
      this.hideLogin();
    }
  }

  render() {
    return (
      <div className="form text-center">
        <h1>LOGIN</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control" type="email" placeholder="Email" name="email" onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <input className="form-control" type="password" placeholder="password" name="password" onChange={this.handleChange} required />
          </div>
          <input type="submit" className="btn-size btn btn-success" />
          <p className="btn-size goBack btn btn-success" onClick={this.hideLogin.bind(this)}>Go Back</p>
          <p className="redirect">New User? <span onClick={this.showSignup.bind(this)}>SIGNUP</span></p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    success: state.auth.success
  })
}

const mapDispatchToProps = dispatch => ({
  loginUser: (userData) => dispatch(authActions.loginUser(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);