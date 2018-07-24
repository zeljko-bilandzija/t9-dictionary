import React, { Component } from 'react';
import './App.css';

import Button from './components/button/button';

class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <header className="App-header">
          <h1 className="App-title">T9 predictive text Emulator</h1>
        </header>
        <hr/>
        
        <div className="row">
          <div class="col-sm-4 offset-sm-4 emulator-container">
            <div className="row">
              <textarea readonly="true"></textarea>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <Button />
              </div>
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
              <div className="col-sm-4">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
