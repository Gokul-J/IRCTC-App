import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ViewTickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: []
    }
  }

  componentDidMount() {
    if(this.props.isAuthenticated){
      const userId = this.props.user.id;
      axios.get("/api/ticket/" + userId)
        .then(res => {
          console.log(res.data);
          this.setState({ tickets: res.data});
        })
    }
    else{
      this.props.history.push("/login");
    }
  }

  render() {
    // console.log(this.state.tickets);
    const { tickets } = this.state;
    if(tickets.length ===0 ){
      return <p>No Tickets Booked</p>
    }
    else{
      return (<div>
        {tickets.map(ticket => {
        let count=1;
        return (
          <div key={ticket._id} className="train-details">
            <ul className="list-inline text-left">
              <div className="row">
                <li className="list-inline-item col-5">PNR : {ticket.train.pnr}</li>
                <li className="list-inline-item col-5">Name : {ticket.train.name}</li>
                <li className="list-inline-item col-5">From : {ticket.train.from}</li>
                <li className="list-inline-item col-5">To : {ticket.train.to}</li>
                <li className="list-inline-item col-5">Depature Date : {ticket.dDate}</li>
                <li className="list-inline-item col-5">Arrival Date : {ticket.aDate}</li>
                <li className="list-inline-item col-5">Depature Time : {ticket.train.dTime}</li>
                <li className="list-inline-item col-5">Arrival Time : {ticket.train.aTime}</li>
              </div>
            </ul>
            <p>Passengers</p>
            <div className="container">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                </tr>
              </thead>
              <tbody>
                {ticket.passengers.map(passenger => {
                  return (
                    <tr key={count}>
                      <th scope="row">{count++}</th>
                      <td>{passenger.name}</td>
                      <td>{passenger.age}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          </div>
        )
      })}
    </div>
    )
    }
  }
}
const mapStateToProps = state => {
  // console.log(state);
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  })
}

export default connect(mapStateToProps)(ViewTickets);