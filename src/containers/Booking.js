import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      train: "",
      dDate: "",
      aDate: "",
      ticketCount: 1,
      passengers: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.genDate = this.genDate.bind(this);
  }

  handleChange(event) {
    this.setState({ ticketCount: event.target.value });
  }

  handleSubmit(event) {
    const { ticketCount, passengers } = this.state;
    const divs = event.target.childNodes;
    for (let i = 0; i < ticketCount; i++) {
      let pass = divs[i].childNodes
      const details = {};
      pass.forEach(passenger => {
        if (passenger.tagName === 'INPUT') {
          details[passenger.name] = passenger.value;
        }
        passenger.value = null;
      })
      passengers.push(details);
    }
    this.props.history.push("/payment", { state: this.state })
    event.preventDefault();
  }

  genDate() {
    const { train } = this.state;
    let date = localStorage.date;
    let month = localStorage.month;
    let year = localStorage.year;
    if (date > 30) {
      date = 1;
      if (month !== 12) {
        month += 1
      }
      else {
        month = 1;
        year += 1;
      }
    }
    let dDate = (date < 10 ? '0' + date : date) + "-" + (month < 10 ? '0' + month : month) + "-" + year;
    let aDate = (Number(date) + train.aDate) + "-" + (month < 10 ? '0' + month : month) + "-" + year;
    this.setState({ dDate: dDate, aDate: aDate })
  }

  componentDidMount() {
    if (this.props.isAuthenticated && this.props.location.state) {
      axios.get("/api/trains/book/" + this.props.location.state.id)
        .then(response => {
          this.setState({ train: response.data })
          this.setState({ user: this.props.user.id })

          this.genDate();
        })
    }
    else {
      this.props.history.goBack();
    }
  }

  render() {
    const { train } = this.state;
    let input = []
    for (let i = 1; i <= this.state.ticketCount; i++) {
      input.push(
        <div key={i} className="row passenger-input ">
          <span className=" passenger-num">{i}</span>
          <input className=" passenger-name" type="text" name="name" required />
          <input className=" passenger-age" type="Number" min="1" name="age" required />
        </div>
      )
    }
    return (
      <div>
        <Navbar />
        <div className="book-content">
          <h1 className="global-h1 text-center">TICKET BOOKING</h1>
          <div className="booking text-center">
          <div className="booking-page">
            <div className="text-left">
              <div className="row">
                <p className="booking-li col-sm-6">PNR : {train.pnr}</p>
                <p className="booking-li col-sm-6">Name : {train.name}</p>
                <p className="booking-li col-sm-6">From : {train.from}</p>
                <p className="booking-li col-sm-6">To : {train.to}</p>
                <p className="booking-li col-sm-6">Depature : {this.state.dDate}    {train.dTime}</p>
                <p className="booking-li col-sm-6">Arrival Date : {this.state.aDate}    {train.aTime}</p>
                {/* <li className="ml-5 col-12">Cost : {train.cost}</li> */}
              </div>
            </div>
            <span>No. Of Tickets : </span>
            <select defaultValue={this.state.ticketCount} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <div className="my-3"> Cost: {this.state.ticketCount * train.cost}</div>
          </div>
          <div className="">
            <h4>Passenger Details</h4>
            <div className="passengers text-left">
              <span className=" passenger-head-num">#</span>
              <span className=" passenger-head-name">Name</span>
              <span className=" passenger-head-age">Age</span>
              <form onSubmit={this.handleSubmit.bind(this)}>
                {input}
                <input type="submit" className="btn btn-primary btn-book btn-size" />
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  })
}

export default connect(mapStateToProps)(Booking);