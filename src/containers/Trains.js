import React from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import axios from 'axios';

class Trains extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      trainList : []
    }
  }
  
  handleClick(id, event){
    console.log(this.props.isAuthenticated);
    if(!this.props.isAuthenticated){
      this.props.history.push("/login");
    }
    else{
      this.props.history.push("/bookTickets", {id: id});

    }
    event.preventDefault();
  }

  componentDidMount(){
    // console.log(this.props.location)
    axios.post("/api/trains/findTrains", {from:this.props.location.state.from, to:this.props.location.state.to})
      .then(response => {
        this.setState({trainList: response.data});
      })
  }

  render() {
    const { trainList } = this.state;
    let SN = 1;
    let date = localStorage.date;
    let month = localStorage.month;
    let year = localStorage.year;
    let table = [];
    trainList.forEach(train => {
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
      table.push(
        <tr key={SN}>
          <th scope="row">{SN++}</th>
          <td>{train._id}</td>
          <td>{train.name}</td>
          <td>{train.from}</td>
          <td>{train.to}</td>
          <td>{(date < 10 ? '0' + date : date) + "-" + (month < 10 ? '0' + month : month) + "-" + year}</td>
          <td>{train.dTime}</td>
          <td>{(Number(date) + train.aDate) + "-" + (month < 10 ? '0' + month : month) + "-" + year}</td>
          <td>{train.aTime}</td>
          <td>₹ {train.cost}</td>
          <td>{Math.floor(Math.random() * 1024)}/1024</td>
          <td><a className="btn btn-primary" onClick={this.handleClick.bind(this, train._id)}>Book</a></td>
        </tr>
      )
    })
    return (
      <div className="text-center">
        <Navbar />
        <h1>Available Trains</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">PNR</th>
              <th scope="col">Name</th>
              <th scope="col">Depature</th>
              <th scope="col">Destination</th>
              <th scope="col">Depature Date</th>
              <th scope="col">Depature Time</th>
              <th scope="col">Arrival Date</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Cost</th>
              <th scope="col">Seats Available</th>
              <th scope="Booking">Book Now</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return{
      isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Trains);