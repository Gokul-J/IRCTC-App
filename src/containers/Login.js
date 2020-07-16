import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="Email" name="email" onChange={this.handleChange}  required/>
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange} required/>
                    <input type="submit" className="btn btn-success" />
                </form>
            </div>
        )
    }
}

export default Login;