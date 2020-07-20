import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.isAuthenticated || !this.props.location.state) {
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
        this.props.history.push("/viewTickets", { flash: true });
      })
    event.preventDefault();
  }

  render() {
    const { ticketCount, train } = this.state;
    return (
      <div className="">
        <div className="">
          <h1 className="text-center">Payments Page</h1>
          {/* <p>This is Demo Payment PAGE</p> */}
          <div className="payment">
            <form>
              <div className="form-group">
                <label className="ml-3 ml-md-5 col-4" htmlFor="name" >Name :</label>
                <input className="col-5" id="name" type="text" placeholder={this.props.user.name} disabled />
              </div>
              <div className="form-group">
                <label className="ml-3 ml-md-5 col-4" htmlFor="cNum" >Card Number :</label>
                <input className="col-5" id="cNum" type="text" placeholder="#### #### #### ####" disabled />
              </div>
              <div className="form-group">
                <label className="ml-3 ml-md-5 col-4" htmlFor="expDate" >Expiry Date :</label>
                <input className="col-5" id="expDate" type="text" placeholder="##/##" disabled />
              </div>
              <div className="form-group">
                <label className="ml-3 ml-md-5 col-4" htmlFor="CVV" >CVV :</label>
                <input className="col-5" id="CVV" type="text" placeholder="###" disabled />
              </div>
              <div className="form-group">
                <label className="ml-3 ml-md-5 col-4" htmlFor="amount" >Amount :</label>
                <input className="col-5" id="amount" type="text" placeholder={ticketCount * train.cost} disabled />
              </div>
            </form>
            <div className="text-center">
              <input type="submit" className="btn btn-success" value="Pay Now" onClick={this.handleSubmit} />
            </div>
          </div>
        </div>
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