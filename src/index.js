import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Main from './containers/Main';
import Trains from './containers/Trains';
import Booking from './containers/Booking';
import Login from './containers/Login';
import Register from './containers/Register';
import * as serviceWorker from './serviceWorker';
import trainReducer from './reducers/trainReducer';
import { Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = combineReducers({train: trainReducer});
const store = createStore(rootReducer, applyMiddleware(logger, thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <Router>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/trains' component={Trains} />
          <Route path='/bookTickets' component={Booking} />
          <Route path="*" render={() => <Redirect to='/' />} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
