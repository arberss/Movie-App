import React from 'react';
import './App.css';

import Header from './components/Header';
import Movies from './components/Movies';
import SingleMovie from './components/SingleMovie';
import Error from './components/Error';
import Bookmarks from './components/Bookmarks';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Movies} />
          <Route exact path='/movie' component={SingleMovie} />
          <Route exact path='/bookmarks' component={Bookmarks} />
          <Route path='/movie' component={Error} />
          <Route component={Error} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
