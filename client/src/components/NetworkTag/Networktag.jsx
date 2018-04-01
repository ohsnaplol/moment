import React, { Component } from 'react'
import brands from '@fortawesome/fontawesome-free-brands'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class NetworkTag extends Component {
  render() {
    const { network, username, url } = this.props
    switch (network) {
      case 'facebook':
        return (
          <div style={{backgroundColor: 'rgb(59, 89, 152)'}}>
            <FontAwesomeIcon color='white' icon={["fab", "facebook-f"]} size='2x'/>
            <span style={{color: 'white'}}>Facebook</span>
          </div>
        );
      case 'snapchat': 
        return (
          <div style={{backgroundColor: 'rgb(255, 251, 83)'}}>
            <FontAwesomeIcon color="white" icon={["fab", "snapchat-ghost"]} size='2x'/>
            <span>Snapchat: {username}</span>
          </div>
        );
      case 'twitch': 
        return (
          <div style={{backgroundColor: 'rgb(72, 56, 120)'}}>
            <FontAwesomeIcon color="white" icon={["fab", "twitch"]} size='2x'/>
            <span>Twitch</span>
          </div>
        );
      case 'twitter': 
        return (
          <div style={{backgroundColor: 'rgb(29, 161, 242)'}}>
            <FontAwesomeIcon color='white' icon={["fab", "twitter"]} size='2x'/>
            <span style={{color: 'white'}}>Twitter</span>
          </div>
        );
      default: 
      return (
        <div style={{backgroundColor: 'gray'}}>
          <span>?</span>
        </div>
      );
    }
  }
}

export default NetworkTag