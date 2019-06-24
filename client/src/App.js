import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

import { clearCurrentProfile } from './actions/profileActions';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddSpeeches from './components/add-speeches/AddSpeeches';
import Profiles from './components/profiles/Profiles';
import AddEvaluations from './components/add-speeches/AddEvaluations';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';

import EvaluationItem from './components/dashboard/EvaluationItem';
import SpeechItem from './components/dashboard/SpeechItem';
import Post from './components/post/Post';
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
    store.dispatch(clearCurrentProfile());
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
        <Route exact path="/not-found" component={NotFound}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/profiles" component={Profiles}></Route>
        <Route exact path="/profile/:handle" component={Profile}></Route>
        
        
        
        <Switch>
        <PrivateRoute exact path="/post/:id" component={Post}></PrivateRoute>
        </Switch>


        <Switch>
        <PrivateRoute exact path="/speech/:id" component={SpeechItem}></PrivateRoute>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/evaluation/:id" component={EvaluationItem}></PrivateRoute>
        </Switch>

        <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/add-speeches" component={AddSpeeches}></PrivateRoute>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/add-evaluations" component={AddEvaluations}></PrivateRoute>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/feed" component={Posts}></PrivateRoute>
        </Switch>
      </div>
      <Footer />
    </div>
    </Router>
    </Provider>
  );
  }
}

export default App;
