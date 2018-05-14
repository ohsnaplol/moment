import React, { Component } from 'react'
import API from "../../utils/API"
import { withRouter } from 'react-router';
import NetworkTag from '../../components/NetworkTag'
// import "./style.css";


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewerIsFollowing: undefined,
      nicknames: undefined
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
    if (this.state.viewerIsFollowing === true) {
      // newArray = updateObject.following.filter(e => e !== this.state_id)
      updateObject.following.splice(updateObject.following.indexOf(this.state._id), 1)
      isFollowing = false
    } else if (this.state.viewerIsFollowing === false) {
      // newArray = updateObject.following.concat(this.state._id)
      updateObject.following.push(this.state._id)
      isFollowing = true
    }
    console.log('your are now following: ' + JSON.stringify(updateObject.following))
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
        this.setState(response.data, function () {
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
          this.setState(response.data, function () {
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
          {this.state.viewerIsFollowing !== undefined ? (
            <div>
              {this.state.viewerIsFollowing ? (
                <button className="btn btn-primary" onClick={() => this.followButton()}>
                  Following
                </button>
              ) : (
                  <button className="btn btn-outline-primary" onClick={() => this.followButton()}>
                    Follow
                </button>
                )}
            </div>
          ) : (
              <div style={{ marginBottom: '46px' }} />
            )}
          {/* <button onClick={this.friendButton()}>{this.state.addFriendText}</button> */}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        {this.state._id && (
          <div className="mt-4">
            <h1>{this.state.realName}</h1>
            {this.setupSocialButtons()}
            {/* Only show nicknames section if they have any */}
            {this.state.nicknames.length !== 0 && (
              <h2>Also known as:
                {this.state.nicknames.map((nickname, idx) => (
                  <span key={idx}>{idx === 0 && <span> </span>}{idx > 0 && <span>, </span>}{nickname.name}</span>
                ))}
              </h2>
            )}
            <div className="mt-3">
              {this.state.socialNetworks.filter((network) => {
                // TODO: (Important) this will only display public profiles
                // even though the client still technically receives the data.
                // This is a temporary solution for demonstration purposes.
                // This MUST be fixed or else private/secret data isn't really private.

                // If I'm looking at my own profile, show all networks, including private/secret
                if (this.state._id === this.props.viewer) {
                  return true
                } else {
                  // otherwise, only show public data until we get friends working
                  return network.privacy === 'public'
                }
              }).map((network, idx) =>
                (
                  <NetworkTag key={idx} network={network.networkName} username={network.userName} url={network.url} />
                ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Profile);
