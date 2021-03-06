import React from 'react';
import Navbar from '../components/Navbar';
import './App.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      date: "",
      currDate: "",
      maxDate: "",
      flash: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    const { from, to, date } = this.state;
    if (from === to) {
      this.setState({ flash: true })
    }
    else {
      let Indate = new Date(date);
      let dd = Indate.getDate();
      let mm = Indate.getMonth() + 1;
      let yyyy = Indate.getFullYear();
      localStorage.setItem("date", dd);
      localStorage.setItem("month", mm);
      localStorage.setItem("year", yyyy);
      this.props.history.push("/trains", { from: from, to: to, view: true })
    }
    event.preventDefault();
  }

  fetchDate() {
    let date = new Date()
    let dd = date.getDate() + 1;
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let Maxyyyy = yyyy;
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    let Maxmm = Number(mm) + 3;
    if (Maxmm > 12) {
      Maxmm -= 12;
      Maxyyyy += 1
    }
    if (Maxmm < 10) {
      Maxmm = '0' + Maxmm;
    }
    const minDate = yyyy + '-' + mm + '-' + dd;
    const maxDate = Maxyyyy + '-' + Maxmm + '-' + dd;
    this.setState({ currDate: minDate, maxDate: maxDate });
  }

  render() {
    let flashMessage;
    if (this.state.flash) {
      flashMessage = <p className="flash text-center bg-danger">Depature and Destination cannot be Same</p>
      setTimeout(() => {
        this.setState({ flash: false })
      }, 1000);
    }
    return (
      <div>
        <Navbar />
        {flashMessage}
        <div className="main-image"></div>
        <div className=" mainContent">
          <div className="row">
            <div className=" mainForm col-lg-6 order-2 order-lg-1">
              <div className=" container text-center">
                <h1 className="book-h1"><div className="global-h1">Book</div> Your Ticket</h1>
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
                  <input id="main-submit" type="submit" className="btn btn-primary btn-lg" value="Search" />
                </form>
              </div>
            </div>
            <div className="mainText col-lg-6 order-1 order-lg-2">
              <h1 className="main-h1">Indian Railways</h1>
              <p className="main-p">Safety | Security | Punctuality</p>
            </div>
          </div>
          {/* <nav className="navbar navbar-expand-lg navbar-light fixed-bottom" style={{backgroundColor: "rgba(110, 107, 107, 0.3)"}}>
            <a className="navbar-brand mx-auto" href="https://github.com/Gokul-J/IRCTC-App" rel="noopener noreferrer" target="_blank"><i className="fab fa-github" style={{fontSize: "1.5em", color: "white"}}></i></a>
          </nav> */}
        </div>
      </div>
    )
  }
}

export default Main;