import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      lastkey: "",
      counter: 0
    };
    this.keypad = {
      a: "1",
      b: "2ABC",
      c: "3DEF",
      d: "4GHI",
      e: "5JKL",
      f: "6MNO",
      g: "7PQRS",
      h: "8TUV",
      i: "9WXYZ",
      j: "",
      k: "0",
      l: "X"
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.queueKey = this.queueKey.bind(this);
  }
  updatePassword(e) {
    let numberPressed = e.target.name;
    let keys = e.target.value.split("");
    let password = this.state.password;
    let lastkey = this.state.lastkey;
    let counter = this.state.counter;
    let queue = false;

    if (window.timer) clearTimeout(window.timer);
    if (numberPressed === "password") return false;
    else if (numberPressed === "X") {
      password = password.slice(0, -1);
      lastkey = "";
      counter = 0;
    } 
    else if(keys.length > 1 && keys.indexOf(lastkey) > -1) {
      if(keys.length <= counter) counter = 0;
      lastkey = keys[counter];
      password = password.slice(0, -1);
      password += keys[counter];
      counter++;
      queue = true
    }
    else {
      password += numberPressed;
      lastkey = numberPressed;
      counter = 0;
    }
    this.setState({
      password: password,
      lastkey: lastkey,
      counter: counter
    });
    if (queue) window.timer = setTimeout(this.queueKey, 500);
  }
  queueKey() {
    this.setState({
      password: this.state.password,
      lastkey: "",
      counter: 0
    });
  }
  render() {
    const keypad = this.keypad;
    let password = this.state.password.slice(0, -1).replace(/./g, '*');
    password += this.state.password.slice(-1);

    return (
      <div className="container">
        <h1>Phone Keypad Password Entry</h1>
        <form>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.updatePassword}
          ></input>
        </form>
        <div className="keypad">
          {Object.keys(keypad).map((key, i) => (
            <button
              key={i}
              name={keypad[key][0]}
              value={keypad[key]}
              onClick={this.updatePassword}
            >
              {keypad[key][0]}
              <br />
              {keypad[key].slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
