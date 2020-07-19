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
    if(this.props.location.state){
      axios.post("/api/trains/findTrains", {from:this.props.location.state.from, to:this.props.location.state.to})
        .then(response => {
          this.setState({trainList: response.data});
        })
    }
    else{
      this.props.history.goBack();
    }
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
        <tr className="tr" key={SN}>
          <th className="th" scope="row">{SN++}</th>
          <td className="td">{train.pnr}</td>
          <td className="td">{train.name}</td>
          <td className="td">{train.from}</td>
          <td className="td">{train.to}</td>
          <td className="td">{(date < 10 ? '0' + date : date) + "-" + (month < 10 ? '0' + month : month) + "-" + year}</td>
          <td className="td">{train.dTime}</td>
          <td className="td">{(Number(date) + train.aDate) + "-" + (month < 10 ? '0' + month : month) + "-" + year}</td>
          <td className="td">{train.aTime}</td>
          <td className="td">₹ {train.cost}</td>
          <td className="td">{Math.floor(Math.random() * 1024)}/1024</td>
          <td className="td"><p className="btn btn-primary" onClick={this.handleClick.bind(this, train._id)}>Book</p></td>
        </tr>
      )
    })
    return (
      <div className="text-center">
        <Navbar />
        <h1>Available Trains</h1>
        <table className="table train-table">
          <thead className="thead thead-dark">
            <tr className="tr">
              <th className="th" scope="col">#</th>
              <th className="th" scope="col">PNR</th>
              <th className="th" scope="col">Train Name</th>
              <th className="th" scope="col">Depature</th>
              <th className="th" scope="col">Destination</th>
              <th className="th" scope="col">Depature Date</th>
              <th className="th" scope="col">Depature Time</th>
              <th className="th" scope="col">Arrival Date</th>
              <th className="th" scope="col">Arrival Time</th>
              <th className="th" scope="col">Cost</th>
              <th className="th" scope="col">Seats Available</th>
              <th className="th" scope="Booking">Book Now</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {table}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return{
      isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Trains);