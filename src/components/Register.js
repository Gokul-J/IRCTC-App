import React from 'react';
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hideSignup() {
    this.props.showSignup(false);
  }

  showLogin() {
    this.props.showLogin(true);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    // console.log(this.state);
    const { name, email, password } = this.state;
    this.props.registerUser({ name: name, email: email, password: password }, this.props.history);
    event.preventDefault();
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.success !== false) {
      setTimeout(() => {
        this.props.showLogin(true);
      }, 1200)
    }
  }
  
  render() {
    return (
      <div className="form text-center">
        <h1>REGISTER</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Name" name="name" onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <input className="form-control" type="email" placeholder="Email" name="email" onChange={this.handleChange} required />
          </div>
          <div className="form-group">
            <input className="form-control" type="password" placeholder="password" name="password" onChange={this.handleChange} required />
          </div>
          <input type="submit" className="btn-size btn btn-success" />
          <p className="btn-size goBack btn btn-success" onClick={this.hideSignup.bind(this)}>Go Back</p>
          <p className="redirect">Existing User? <span onClick={this.showLogin.bind(this)}>LOGIN</span></p>
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
  registerUser: (userData, history) => dispatch(authActions.registerUser(userData, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);