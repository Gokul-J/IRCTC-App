import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
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
    // console.log(divs);
    for (let i = 0; i < ticketCount; i++) {
      let pass = divs[i].childNodes
      // console.log(pass);
      const details = {};
      pass.forEach(passenger => {
        if (passenger.tagName === 'INPUT') {
          details[passenger.name] = passenger.value;
        }
        passenger.value = null;
      })
      passengers.push(details);
    }
    console.log(this.state);
    // console.log(passengers);
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
          this.setState({user: this.props.user.id})

          this.genDate();
        })
    }
    else{
      this.props.history.goBack();
    }
  }

  render() {
    const { train } = this.state;
    let input = []
    for (let i = 1; i <= this.state.ticketCount; i++) {
      input.push(
        <div key={i}>
          <span className="mx-3 mb-2">{i}</span>
          <input className="mx-3 mb-2" type="text" name="name" />
          <input className="mx-3 mb-2" type="text" name="age" />
        </div>
      )
    }

    // console.log(this.state)
    return (
      <div>
        <Navbar />
        <div className="container text-center">
          <h1> Bookings Page</h1>
          <ul className="list-inline text-left">
            <div className="row train-details">
              <li className="list-inline-item col-5">PNR : {train.pnr}</li>
              <li className="list-inline-item col-5">Name : {train.name}</li>
              <li className="list-inline-item col-5">From : {train.from}</li>
              <li className="list-inline-item col-5">To : {train.to}</li>
              <li className="list-inline-item col-5">Depature Date : {this.state.dDate}</li>
              <li className="list-inline-item col-5">Arrival Date : {this.state.aDate}</li>
              <li className="list-inline-item col-5">Depature Time : {train.dTime}</li>
              <li className="list-inline-item col-5">Arrival Time : {train.aTime}</li>
              <li className="list-inline-item col-5">Cost : {train.cost}</li>
            </div>
          </ul>
          <span>No. Of Tickets : </span>
          <select defaultValue={this.state.ticketCount} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <div> Cost: {this.state.ticketCount * train.cost}</div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            {input}
            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
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

export default connect(mapStateToProps)(Booking);