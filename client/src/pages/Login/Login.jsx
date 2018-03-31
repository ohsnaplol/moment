import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 

const styles = ({
  button: {
    backgroundColor: "#056ecf",
    height: 128,
    width: 128
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
          <button className='btn btn-danger'>Create Account</button>
        </Link>
      </div>
    )
  }
}

export default Login;
