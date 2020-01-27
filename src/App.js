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
    this.updatePassword = this.updatePassword.bind(this);
    this.queueKey = this.queueKey.bind(this);
    this.submit = this.submit.bind(this);
    let timer = null;
    this.timer = timer;
  }
  submit(){
    alert(this.state.password);
  }
  updatePassword(e) {
    if(this.timer){
      clearTimeout(this.timer);
      this.timer = null;
    } 
    const newState = this.computeNewState(e);
    this.setState(newState);
    if (newState.laskey !== "") this.timer = setTimeout(this.queueKey, 750);
  }
  computeNewState(e){
    let counter = this.state.counter;
    let password = this.state.password;
    let lastkey = this.state.lastkey;
    let keys = e.target.value.split("");
    
    if (e.target.name === "password"){
      password += e.target.value.slice(-1);
      return { password: password, lastkey:"", counter: 0 }
    }
    else if (e.target.name === "X") {
      password = password.slice(0, -1);
      return { password: password, lastkey:"", counter: 0 }
    } 
    else if(keys.length > 1 && keys.indexOf(lastkey) > -1) {
      if(keys.length <= counter) counter = 0;
      lastkey = keys[counter];
      password = password.slice(0, -1);
      password += keys[counter];
      counter++;
      return { password: password, lastkey: keys[counter], counter: counter++ }
    }
    else {
      password += e.target.name;
      return { password: password, lastkey: e.target.name, counter: 0 }
    }
  }
  queueKey() {
    this.setState({
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
          <button 
            name="Submit"
            onClick={this.submit}
            >Submit</button>
        </form>
        <div className="keypad">
          {this.props.keypad.map((key, i) => (
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
