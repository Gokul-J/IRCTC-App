import React from 'react';
import { connect } from 'react-redux';

class Trains extends React.Component {

  
  handleClick(id, event){
    this.props.history.push("/bookTickets", {id: id})
  }

  render() {
    const { trainList, dd, mm, yyyy } = this.props;
    let SN = 1;
    let date = dd;
    let month = mm;
    let year = yyyy;
    let table = [];
    // for (let i = 0; i < 1; i++) {
      trainList.forEach(train => {
        if(date>30){
          date=1;
          if(month!==12){
            month+=1
          }
          else{
            month = 1;
            year+=1;
          }
        }
        table.push(
          <tr key={SN}>
            <th scope="row">{SN++}</th>
            <td>{train._id}</td>
            <td>{train.name}</td>
            <td>{train.from}</td>
            <td>{train.to}</td>
            <td>{(date<10?'0'+date:date)+"-"+(month<10?'0'+month:month)+"-"+year}</td>
            <td>{train.dTime}</td>
            <td>{(date+train.aDate)+"-"+(month<10?'0'+month:month)+"-"+year}</td>
            <td>{train.aTime}</td>
            <td>₹ {train.cost}</td>
            <td>{Math.floor(Math.random() * 1024)}/1024</td>
            <td><a className="btn btn-primary" onClick={this.handleClick.bind(this, train._id)}>Book</a></td>
          </tr>
        )
      })
    // }
    return (
      <div className="text-center">
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

const mapStateToProps = (state) => {
  return {
    trainList: state.train.trainList,
    dd: state.train.dd,
    mm: state.train.mm,
    yyyy: state.train.yyyy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trains);