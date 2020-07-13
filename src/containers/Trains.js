import React from 'react';
import { connect } from 'react-redux';

class Trains extends React.Component{
    render(){
        const { trainList } = this.props;

        return(
            <div className="text-center">
                <h1>Available Trains</h1>
                <ol>
                    {trainList.map(train => {
                        return(
                        <li key={train._id}>{train.from}-{train.to}-Rs{train.cost}</li>
                        )
                    })}
                </ol>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        trainList : state.train.trainList
    }
}

const mapDispatchToProps = (dispatch) => {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trains);