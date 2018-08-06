import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import T9Button from './components/T9button/T9button';
// Testing ssh
class App extends Component {
  constructor() {
    super();
    this.state = {
      searchWord: '',
      words: [],
      shownTextIndex: 0
    };
  }

  render() {
    return (
      <div className="container text-center">
        <header>
          <h1>T9 predictive text Emulator</h1>
        </header>
        <hr />

        <div className="row">
          <div className="col-sm-4 offset-sm-4 emulator-container">
            <div className="row">
              <textarea
                className="form-control"
                readOnly="true"
                value={this.state.words.length === 0 ? '' : this.state.words[this.state.shownTextIndex]}
              ></textarea>
            </div>
            <div className="row btn-row">
              <div className="col-sm-4">
                <T9Button onClick={this.cycle} text="cycle" />
              </div>
              <div className="col-sm-4" />
              <div className="col-sm-4">
                <T9Button onClick={this.removeWord} text="delete" />
              </div>
            </div>
            <div className="row btn-row">
              <div className="col-sm-4">
                <T9Button disabled={true} text="1" />
              </div>
              <div className="col-sm-4">
                <T9Button onClick={event => this.addCharacter(event, 2)} text="2 abc" />
              </div>
              <div className="col-sm-4">
                <T9Button onClick={event => this.addCharacter(event, 3)} text="3 def" />
              </div>
            </div>
            <div className="row btn-row">
              <div className="col-sm-4">
                <T9Button onClick={event => this.addCharacter(event, 4)} text="4 ghi" />
              </div>
              <div className="col-sm-4">
                <T9Button onClick={event => this.addCharacter(event, 5)} text="5 jkl" />
              </div>
              <div className="col-sm-4">
                <T9Button onClick={event => this.addCharacter(event, 6)} text="6 mno" />
              </div>
            </div>
            <div className="row btn-row">
              <div className="col-sm-4">
                <T9Button onClick={event => this.addCharacter(event, 7)} text="7 pqrs" />
              </div>
              <div className="col-sm-4">
                <T9Button onClick={event => this.addCharacter(event, 8)} text="8 tuv" />
              </div>
              <div className="col-sm-4">
                <T9Button onClick={event => this.addCharacter(event, 9)} text="9 wxyz" />
              </div>
            </div>
            <div className="row btn-row">
              <div className="col-sm-4">
                <T9Button disabled={true} text="* #" />
              </div>
              <div className="col-sm-4">
                <T9Button disabled={true} text="0" />
              </div>
              <div className="col-sm-4">
                <T9Button text="space" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  cycle = () => {
    if (this.state.shownTextIndex < this.state.words.length) {
      let newIndex = this.state.shownTextIndex + 1;
      if (newIndex >= this.state.words.length) {
        newIndex = 0;
      }
      this.setState({ shownTextIndex: newIndex });
    }
  }

  removeWord = () => {
    if (this.state.searchWord.length > 0) {
      const word = this.state.searchWord;
      const newWord = word.length === 1 ? '' : word.substring(0, word.length - 1);
      this.setState({ searchWord: newWord, words: [] }, () => {
        if (this.state.searchWord.length > 0) {
          this.fetchWords();
        }
      });
    }
  }

  addCharacter = (event, character) => {
    this.setState(oldState => ({ searchWord: oldState.searchWord += character}), () => {
      if (this.state.searchWord.length > 0) {
        this.fetchWords();
      }
    });
  }

  fetchWords = () => {
    axios.get(`http://localhost:4000/api/v1/convertNumberToText/${this.state.searchWord}`)
      .then(response => {
        this.setState({words: response.data, shownTextIndex: 0});
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }
}

export default App;
