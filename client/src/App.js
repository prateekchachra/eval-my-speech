import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import {Provider} from 'react-redux';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import './App.css';



// Check for token

if(localStorage.jwtToken){
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() /1000;
  if(decoded.exp < currentTime){

    store.dispatch(logoutUser());

    //TODO: clear current profile

    window.location.href('/login');
  }
}
class App extends Component {




  render(){
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing}></Route>
      <div className="container">
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
      </div>
      <Footer />
    </div>
    </Router>
    </Provider>
  );
  }
}

export default App;
