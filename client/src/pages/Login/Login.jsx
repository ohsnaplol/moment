import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 

const styles = ({
  button: {
    backgroundColor: "#056ecf",
    height: 128,
    width: 128
  }, 
    button2: {
    backgroundColor: "#056ecf",
    height: 20,
    width: 10
  }
});


class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            Email:
            <input type="email"/>
          </label>
          <label>
            Password:
            <input type="password" />
          </label>
          <input type="submit" value="Login"/>
        </form>
        <Link to="/signup">
          <button style={styles.button}>Create Account</button>
        </Link>
      </div>
    )
  }
}

export default Login;
