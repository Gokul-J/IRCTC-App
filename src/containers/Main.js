import React from 'react';
import * as actions from '../actions/trainAction';
import {connect} from 'react-redux';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      from: "",
      to: "",
      date: "",
      currDate: "",
      maxDate: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name] : event.target.value})  
  }

  handleSubmit(event){
    const {from, to, date} = this.state;
    this.props.searchTrains("/api/trains/findTrains", {from:from, to:to}, this.props.history)
    event.preventDefault();
  }

  fetchDate(){
    let date = new Date()
    console.log(date)
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm
    }
    console.log(date.getTime());
    const minDate = yyyy+'-'+mm+'-'+dd;
    const maxDate = yyyy+'-'+(Number(mm)+3)+'-'+dd;
    this.setState({currDate : minDate, maxDate : maxDate});
  }

  render() {
    return (
      <div className=" container text-center">
        <h1>Book Your Ticket</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">Preference</label>
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="from" value={this.state.from} onChange={this.handleChange} required>
              <option value="">FROM...</option>
              <option value="CHE">Chennai</option>
              <option value="MUM">Mumbai</option>
              <option value="DEL">Delhi</option>
              <option value="KOL">Kolkata</option>
            </select>
          </div>
          <div className="form-group">
            <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">Preference</label>
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="to" value={this.state.to} onChange={this.handleChange} required>
              <option value="">TO...</option>
              <option value="CHE">Chennai</option>
              <option value="MUM">Mumbai</option>
              <option value="DEL">Delhi</option>
              <option value="KOL">Kolkata</option>
            </select>
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="date">Date</label>
            <input type="date" id="date" name="date" defaultValue={this.state.date} onClick={this.fetchDate.bind(this)} onChange={this.handleChange} min={this.state.currDate} max={this.state.maxDate} required></input>
          </div>
          <input type="submit" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return{
    trainList : state.train.trainList
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    searchTrains : (url, body, history) => dispatch(actions.getTrains(url, body, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)