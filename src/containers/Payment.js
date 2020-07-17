import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Payment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.props.location.state.state,
            userId : this.props.user.id
        };
        // console.log(this.state);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        console.log("Create Ticket")
        axios.post("/api/ticket/create", this.state);
        event.preventDefault();
    }

    render(){
        // console.log(this.props.location.state.state)
        return(
            <div>
                <h1>Payments Page</h1>
                <input type="submit" className="btn btn-success" onClick={this.handleSubmit} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user : state.auth.user
})

export default connect(mapStateToProps)(Payment);