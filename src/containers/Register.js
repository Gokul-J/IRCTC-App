import React from 'react';
import * as authActions from '../actions/authActions';
import Navbar from '../components/Navbar';
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

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      this.props.history.goBack();
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    // console.log(this.state);
    const { name, email, password } = this.state;
    this.props.registerUser({ name: name, email: email, password: password }, this.props.history)
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Register Page</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" name="name" onChange={this.handleChange} required />
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
  registerUser: (userData, history) => dispatch(authActions.registerUser(userData, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);