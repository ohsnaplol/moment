import React, { Component } from 'react'
import API from "../../utils/API"
import { withRouter } from 'react-router';
import NetworkTag from '../../components/NetworkTag'
import "./style.css";


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      realName: '',
      nicknames: [],
    }
  }
  
  componentWillMount() {
    API.getUser(this.props.history.location.pathname.replace('/profile', '')) // normally use this.props.id
      .then(response => {
        this.setState(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentWillReceiveProps() {
    if (this.state._id) {
      API.getUser(this.props.history.location.pathname.replace('/profile', '')) // normally use this.props.id
      .then(response => {
        this.setState(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  render() {
    return (
      <div>
        {this.state._id ? (
          <div>
            <div className="h1-profile">{this.state.realName}</div>
            <div>
              <div className="also-known-as">Also known as:
              {this.state.nicknames.map((nickname, idx) => (
                <span key={idx}> {nickname.name}</span>
              ))}
              </div>
              {this.state.socialNetworks.map((network, idx) => 
              (
                <NetworkTag key={idx} network={network.networkName} username={network.userName} url={network.url}/>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    )
  }
}

export default withRouter(Profile);
