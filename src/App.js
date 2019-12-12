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
      a: { num: "1", keys: "" },
      b: { num: "2", keys: "ABC" },
      c: { num: "3", keys: "DEF" },
      d: { num: "4", keys: "GHI" },
      e: { num: "5", keys: "JKL" },
      f: { num: "6", keys: "MNO" },
      g: { num: "7", keys: "PQRS" },
      h: { num: "8", keys: "TUV" },
      i: { num: "9", keys: "WXYZ" },
      j: { num: "", keys: "" },
      k: { num: "0", keys: "" },
      l: { num: "X", keys: "" }
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.queueKey = this.queueKey.bind(this);
  }
  updatePassword(e) {
    let numberPressed = e.target.name;
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
    } else {
      let keys = numberPressed + e.target.value;
      keys = keys.split("");
      if (keys.length > 1 && keys.length >= counter + 1) {
        lastkey = keys[counter];
        counter++;
        queue = true;
      } else {
        password += numberPressed;
        lastkey = "";
        counter = 0;
      }
    }

    this.setState({
      type: this.state.type,
      password: password,
      lastkey: lastkey,
      counter: counter
    });
    if (queue) window.timer = setTimeout(this.queueKey, 300);
  }
  queueKey() {
    this.setState({
      password: this.state.password + this.state.lastkey,
      lastkey: "",
      counter: 0
    });
  }
  render() {
    const keypad = this.keypad;
    return (
      <div className="container">
        <h1>Phone Keypad Password Entry</h1>
        <form>
          <label>Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.updatePassword}
          ></input>
        </form>
        <div className="keypad">
          {Object.keys(keypad).map((key, i) => (
            <button
              key={i}
              name={keypad[key].num}
              value={keypad[key].keys}
              onClick={this.updatePassword}
            >
              {keypad[key].num}
              <br />
              {keypad[key].keys}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
