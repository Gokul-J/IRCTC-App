import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
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

    render(){
        return(
            <div>
                <h1>Register Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Name" name="name" onChange={this.handleChange} required />
                    <input type="email" placeholder="Email" name="email" onChange={this.handleChange} required/>
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange} required />
                    <input type="submit" className="btn btn-success" />
                </form>
            </div>
        )
    }
}

export default Register;