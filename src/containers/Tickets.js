import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import ViewTickets from '../components/ViewTickets'

class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: false
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      if (this.props.location.state) {
        this.setState({ flash: this.props.location.state.flash })
      }
    }
    else {
      this.props.history.push("/login");
    }
  }
  render() {
    let flashMessage;
    if(this.state.flash){
      flashMessage= <p className="flash text-center bg-success">Payment Successful</p>
      setTimeout(() => {
        this.setState({flash: false})
      }, 1000);
    }
    return (
      <div>
        <Navbar />
        {flashMessage}
        <div className="text-center">
          <h1 className="my-4">Tickets Page</h1>
          <ViewTickets {...this.props}/>
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

export default connect(mapStateToProps)(Tickets);