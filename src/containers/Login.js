import React from 'react';
import * as authActions from '../actions/authActions';
import Navbar from '../components/Navbar';
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

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    // console.log(this.props.isAuthenticated)
    if (this.props.isAuthenticated) {
      this.props.history.goBack();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.goBack();
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    // console.log(this.state);
    const { email, password } = this.state;
    this.props.loginUser({ email: email, password: password });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="Email" name="email" onChange={this.handleChange} required />
          <input type="password" placeholder="password" name="password" onChange={this.handleChange} required />
          <input type="submit" className="btn btn-success" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  })
}

const mapDispatchToProps = dispatch => ({
  loginUser: (userData) => dispatch(authActions.loginUser(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);