import React from 'react';
import Navbar from '../components/Navbar';
import './App.css';

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
    let Indate = new Date(date);
    let dd = Indate.getDate();
    let mm = Indate.getMonth()+1;
    if(mm<10){
      mm='0'+mm;
    }
    let yyyy = Indate.getFullYear();
    // console.log(dd+""+mm+""+yyyy)
    localStorage.setItem("date", dd);
    localStorage.setItem("month", mm);
    localStorage.setItem("year", yyyy);
    this.props.history.push("/trains", {from: from, to: to})
    event.preventDefault();
  }

  fetchDate(){
    let date = new Date()
    // console.log(date)
    let dd = date.getDate()+1;
    let mm = 12;
    let yyyy = date.getFullYear();
    let Maxyyyy = yyyy;
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm
    }
    let Maxmm = Number(mm)+3;
    if(Maxmm>12){
      Maxmm-=12;
      Maxyyyy+=1
    }
    if(Maxmm < 10){
      Maxmm = '0'+Maxmm;
    }
    const minDate = yyyy+'-'+mm+'-'+dd;
    const maxDate = Maxyyyy+'-'+Maxmm+'-'+dd;
    this.setState({currDate : minDate, maxDate : maxDate});
  }

  render() {
    return (
        <div>
        <Navbar />
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
      </div>
    )
  }
}

export default Main;