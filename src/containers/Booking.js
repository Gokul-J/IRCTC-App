import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            train: "",
            ticketNum: 1,
            passengers: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({ticketNum: event.target.value});
        // console.log(this.state.ticketNum)
    }

    handleSubmit(event){
        const {ticketNum, passengers} = this.state;
        const divs = event.target.childNodes;
        console.log(divs);
        for(let i=0; i<ticketNum; i++){
            let pass = divs[i].childNodes
            console.log(pass);
            const details={};
            pass.forEach( passenger => {
                if(passenger.tagName === 'INPUT'){
                    details[passenger.name] = passenger.value;
                }
                passenger.value=null;
            })
            passengers.push(details);
        }
        console.log(passengers);
        event.preventDefault();
    }

    componentDidMount() {
        // this.props.getTrain("/api/trains", {id:this.props.location.state.id});
        // axios.get("/api/trains/book/" + this.props.location.state.id)
        axios.get("/api/trains/book/" + this.props.location.state.id)
            .then(response => {
                this.setState({ train: response.data })
            })
    }

    render() {
        const {train} = this.state;
        const { dd, mm, yyyy } = this.props;
        let date = dd;
        let month = mm;
        let year = yyyy;
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
        let input=[]
        for(let i=1;i<=this.state.ticketNum;i++){
            input.push(
                <div>
                    <span  className="mx-3 mb-2">{i}</span>
                    <input className="mx-3 mb-2" type="text" name="name" />
                    <input className="mx-3 mb-2" type="text" name="age" />
                </div>
            )
        }
        return (
            <div className="container text-center">
                <h1> Bookings Page</h1>
                <ul className="list-inline text-left">
                    <div className="row">
                        <li className="list-inline-item col-5">PNR : {train._id}</li>
                        <li className="list-inline-item col-5">Name : {train.name}</li>
                        <li className="list-inline-item col-5">From : {train.from}</li>
                        <li className="list-inline-item col-5">To : {train.to}</li>
                        <li className="list-inline-item col-5">Depature Date : {(date<10?'0'+date:date)+"-"+(month<10?'0'+month:month)+"-"+year}</li>
                        <li className="list-inline-item col-5">Arrival Date : {(date+train.aDate)+"-"+(month<10?'0'+month:month)+"-"+year}</li>
                        <li className="list-inline-item col-5">Depature Time : {train.dTime}</li>
                        <li className="list-inline-item col-5">Arrival Time : {train.aTime}</li>
                        <li className="list-inline-item col-5">Cost : {train.cost}</li>
                    </div>
                </ul>
                <span>No. Of Tickets : </span>
                <select defaultValue={this.state.ticketNum} onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <div> Cost: {this.state.ticketNum * train.cost}</div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {/* <a className="btn btn-primary" href="#">Proceed to Payment</a> */}
                    {/* <input type="text" name="name" />
                    <input type="text" name="age" /> */}
                    {input}
                    <input type="submit" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      dd: state.train.dd,
      mm: state.train.mm,
      yyyy: state.train.yyyy
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Booking);