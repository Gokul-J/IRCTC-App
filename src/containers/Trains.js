import React from 'react';
import { connect } from 'react-redux';

class Trains extends React.Component {
  render() {
    const { trainList } = this.props;

    return (
      <div className="text-center">
        <h1>Available Trains</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">PNR</th>
              <th scope="col">Depature</th>
              <th scope="col">Destination</th>
              <th scope="col">Depature Time</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Cost</th>
              <th scope="col">Seats Available</th>
              <th scope="Booking">Book Now</th>
            </tr>
          </thead>
          <tbody>
            {trainList.map(train => {
              return (
                <tr key={train._id}>
                  <th scope="row">1</th>
                  <td>{train._id}</td>
                  <td>{train.from}</td>
                  <td>{train.to}</td>
                  <td>{train.cost}</td>
                  <td>{Math.floor(Math.random()*1024)}/1024</td>
                  <td><button className="btn btn-primary">Book</button></td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trainList: state.train.trainList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trains);