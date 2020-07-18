import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    if(!this.props.isAuthenticated){
      this.props.history.goBack();
    }
    this.state = {
      ...this.props.location.state.state,
      // userId: this.props.user.id
    };
    console.log(this.state);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    axios.post("/api/ticket/create", this.state)
      .then(res => {
        this.props.history.push("/viewTickets");
      })
    event.preventDefault();
  }

  render() {
    // console.log(this.props.location.state.state)
    const { ticketCount, train } = this.state;
    return (
      <div className="text-center">
        <h1>Payments Page</h1>
        {/* <p>This is Demo Payment PAGE</p> */}
        <form className="">
          <div className="form-group">
            <label htmlFor="name" >Name</label>
            <input id="name" type="text" placeholder={this.props.user.name} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="cNum" >Card Number</label>
            <input id="cNum" type="text" placeholder="#### #### #### ####" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="expDate" >Expiry Date</label>
            <input id="expDate" type="text" placeholder="##/##" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="CVV" >CVV</label>
            <input id="CVV" type="text" placeholder="###" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="amount" >Amount</label>
            <input id="amount" type="text" placeholder={ticketCount * train.cost} disabled />
          </div>
        </form>
        <input type="submit" className="btn btn-success" value="Pay Now" onClick={this.handleSubmit} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})
}

export default connect(mapStateToProps)(Payment);