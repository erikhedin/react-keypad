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
    // this.keypad = {
    //   a: "1",
    //   b: "2ABC",
    //   c: "3DEF",
    //   d: "4GHI",
    //   e: "5JKL",
    //   f: "6MNO",
    //   g: "7PQRS",
    //   h: "8TUV",
    //   i: "9WXYZ",
    //   j: "",
    //   k: "0",
    //   l: "X"
    // };
    this.keypad = [
       "1",
       "2ABC",
       "3DEF",
       "4GHI",
       "5JKL",
       "6MNO",
       "7PQRS",
       "8TUV",
       "9WXYZ",
       "",
       "0",
       "X"
    ];
    this.updatePassword = this.updatePassword.bind(this);
    this.queueKey = this.queueKey.bind(this);
    let timer = null;
    this.timer = timer;
  }
  
  updatePassword(e) {
    let numberPressed = e.target.name;
    let keys = e.target.value.split("");
    let password = this.state.password;
    let lastkey = this.state.lastkey;
    let counter = this.state.counter;
    let queue = false;

    if(this.timer) clearTimeout(this.timer);
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
      queue = true;
    }
    else {
      password += numberPressed;
      lastkey = numberPressed;
      counter = 0;
      queue = true;
    }
    this.setState({
      password: password,
      lastkey: lastkey,
      counter: counter
    });
    if (queue) this.timer = setTimeout(this.queueKey, 750);
  }
  queueKey() {
    this.setState({
      password: this.state.password,
      lastkey: "",
      counter: 0
    });
  }
  render() {
    let password = this.state.password.slice(0, -1).replace(/./g, '*');
    password += this.state.password.slice(-1);

    return (
      <div className="container">
        <h1>Phone Keypad Password Entry</h1>
        <form>
          <label>Password</label>
          <input
            name="password"
            value={password}
            onChange={this.updatePassword}
          ></input>
        </form>
        <div className="keypad">
          {this.keypad.map((key, i) => (
            <button
              key={i}
              name={key[0]}
              value={key}
              onClick={this.updatePassword}
            >
              {key[0]}
              <br />
              {key.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
