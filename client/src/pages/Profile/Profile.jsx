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
      viewerIsFollowing: false,
      viewerIsFriend: false,
      viewerFollowingList: [],
      viewerFriendList: []
    }
  }

  followButton() {
    var updateObject = {
      _id: this.props.viewer,
      following: this.state.viewerFollowingList
    }
    let isFollowing = this.state.viewerIsFollowing
    // Commented out portions are attempts at using non-mutating arrays
    // var newArray = []
    if(this.state.viewerIsFollowing === true) {
      // newArray = updateObject.following.filter(e => e !== this.state_id)
      updateObject.following.splice(updateObject.following.indexOf(this.state._id), 1)
      isFollowing = false
    } else if (this.state.viewerIsFollowing === false){
      // newArray = updateObject.following.concat(this.state._id)
      updateObject.following.push(this.state._id)
      isFollowing = true
    }
    console.log('your are now following: '+JSON.stringify(updateObject.following))
    // updateObject.following = newArray
    API.update(updateObject)
      .then(response => {
        this.setState({
          viewerIsFollowing: isFollowing,
          viewerFollowingList: updateObject.following
        })
      })
  }
  
  // Check here if they are friends/are following or not
  // set states on follow/unfollow buttons
  // If friends, get extra info
  componentWillMount() {
    API.getUser(this.props.history.location.pathname.replace('/profile', '')) // normally use this.props.id
      .then(response => {
        this.setState(response.data, function() {
          this.getViewerInfo()
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getViewerInfo() {
    // get viewer info
    if (this.props.viewer) {
      API.getUser(this.props.viewer)
      .then(response => {
        console.log('You follow: ' + response.data.following)
        // If viewer is following this person,
        this.setState({
          viewerIsFollowing: response.data.following.includes(this.state._id),
          viewerIsFriend: response.data.friends.includes(this.state._id),
          viewerFollowingList: response.data.following,
          viewerFriendList: response.data.friends
        })
      })
    }
  }

  componentWillReceiveProps() {
    if (this.state._id) {
      API.getUser(this.props.history.location.pathname.replace('/profile', '')) // normally use this.props.id
      .then(response => {
        this.setState(response.data, function() {
          this.getViewerInfo()
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  setupSocialButtons() {
    // If I'm not looking at my own profile
    if (this.state._id !== this.props.viewer) {
      // Show Follow, Add Friend buttons
      return (
        <div>
          <button onClick={() => this.followButton()}>
            {this.state.viewerIsFollowing ? ('Unfollow') : ('Follow')}
          </button>
          {/* <button onClick={this.friendButton()}>{this.state.addFriendText}</button> */}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.state._id ? (
          <div>
            <div className="h1-profile">{this.state.realName}</div>
            {this.setupSocialButtons()}
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
