import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { withAlert } from 'react-alert'
import API from '../../utils/API'
import "./style.css";



class Settings extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit = event => {
    event.preventDefault()
    API.update(this.state)
      .then(response => {
        console.log('upload success')
        this.props.alert.show(<div className="error-alert">Saved!</div>)
      })
      .catch(err => {
        console.log('Error in handleFormSubmit in Settings.jsx: ' + err)
      })
  }

  handleFormDeleteSubmit() {
    // check if password matches with one in db (future development)
    // if it does, delete their account
    console.log(this.props.uid)
    API.deleteUser(this.props.uid)
      .then(response => {
        API.logout().then(response => {
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
            this.setState({
              redirectTo: '/'
            })
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  // NICKNAMES
  handleNickNameChange = (idx) => (event) => {
    const newNicknames = this.state.nicknames.map((nickname, sidx) => {
      if (idx !== sidx) return nickname
      return { ...nickname, name: event.target.value }
    })

    this.setState({ nicknames: newNicknames })
  }

  handleAddnickname = () => {
    this.setState({
      nicknames: this.state.nicknames.concat([{ name: '' }])
    })
  }

  handleRemoveNickname = (idx) => () => {
    if (this.state.nicknames.length === 1) {
      this.setState({nicknames: []}) // not working
    } else {
      this.setState({
        nicknames: this.state.nicknames.filter((s, sidx) => idx !== sidx)
      })
    }
  }

  // NETWORKS
  handleAddNetwork = () => {
    this.setState({
      socialNetworks: this.state.socialNetworks.concat([{ networkName: 'facebook', url: '', privacy: 'public', userName: '' }])
    })
  }

  handleNetworkChange = (idx) => (event, type) => {
    const newNetworks = this.state.socialNetworks.map((network, sidx) => {
      if (idx !== sidx) return network
      return { ...network, networkName: event.target.value }
      // return { ...network, [type]: event.target.value }
    })
    this.setState({ socialNetworks: newNetworks })
  }

  handleNetworkUrlChange = (idx) => (event) => {
    const newNetworks = this.state.socialNetworks.map((network, sidx) => {
      if (idx !== sidx) return network
      return { ...network, url: event.target.value }
    })
    this.setState({ socialNetworks: newNetworks })
  }

  handleNetworkUsernameChange = (idx) => (event) => {
    const newNetworks = this.state.socialNetworks.map((network, sidx) => {
      if (idx !== sidx) return network
      return { ...network, userName: event.target.value }
    })
    this.setState({ socialNetworks: newNetworks })
  }

  handleNetworkPrivacyChange = (idx) => (event) => {
    const newNetworks = this.state.socialNetworks.map((network, sidx) => {
      if (idx !== sidx) return network
      return { ...network, privacy: event.target.value }
    })
    this.setState({ socialNetworks: newNetworks })
  }

  handleRemoveNetwork = (idx) => () => {
    this.setState({
      socialNetworks: this.state.socialNetworks.filter((s, sidx) => idx !== sidx)
    })
  }

  getUserData(id) {
    API.getUser(id)
      .then(response => {
        this.setState(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getInputType(network, idx) {
    switch (network.networkName) {
      case 'snapchat':
      case 'xbox':
      case 'playstation':
      case 'twitch':
        return <input type='text' placeholder='Username' value={network.userName} onChange={this.handleNetworkUsernameChange(idx)}/>
      case 'twitter':
        return (
            <span>
            @
            <input type='text' placeholder='Username' value={network.userName} onChange={this.handleNetworkUsernameChange(idx)}/>
            </span>
        )
        default:
        return <input type='text' placeholder='URL' value={network.url} onChange={this.handleNetworkUrlChange(idx)}/>
    }
  }

  componentDidMount() {
    if(this.props.uid) {
      this.getUserData(this.props.uid)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getUserData(nextProps.uid)
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          {this.state._id ? (
            <div className="settings-screen">
              <form className="form-settings" onSubmit={this.handleFormSubmit}>
                <label className="name-change">
                  Change name:
                  <input className="name-change-input" type='text' name="realName" value={this.state.realName} onChange={this.handleInputChange}/>
                </label>
                <br />
                <div className="nick-name-div">
                <label>
                  Edit Nicknames:<br />
                  {this.state.nicknames.map((nickname, idx) => (
                    <div  key={idx}>
                      <input
                        className="nick-name"
                        type="text"
                        placeholder={`Nickname #${idx + 1}`}
                        value={nickname.name}
                        onChange={this.handleNickNameChange(idx)}
                      />
                      <button className="nick-name-button small" type="button" onClick={this.handleRemoveNickname(idx)}>-</button>
                    </div>
                  ))}
                  <button type="button" onClick={this.handleAddnickname} className="small" id="nick-name-button">Add Nickname</button>
                </label>
                  </div>
                <br />
                <label className="add-network-label">
                  Add Network:<br />
                  {this.state.socialNetworks.map((network, idx) => (
                    <div key={idx}>
                      <select value={network.networkName} onChange={this.handleNetworkChange(idx)}>
                        <option default value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                        <option value="snapchat">Snapchat</option>
                        <option value="youtube">YouTube</option>
                        <option value="twitch">Twitch</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="reddit">Reddit</option>
                        <option value="instagram">Instagram</option>
                        <option value="tumblr">Tumblr</option>
                        <option value="flickr">Flickr</option>
                        <option value="pinterest">Pinterest</option>
                        <option value="google">Google</option>
                        <option value="deviantart">DeviantArt</option>
                        <option value="medium">Medium</option>
                        <option value="bandcamp">Bandcamp</option>
                        <option value="soundcloud">Soundcloud</option>
                        <option value="github">GitHub</option>
                        <option value="gitlab">GitLab</option>
                        <option value="steam">Steam</option>
                        <option value="xbox">Xbox</option>
                        <option value="playstation">Playstation</option>
                      </select>
                      <select value={network.privacy} onChange={this.handleNetworkPrivacyChange(idx)}>
                        <option value='public'>Public</option>
                        <option default value='private'>Private</option>
                        <option value='secret'>Secret</option>
                      </select>
                      {this.getInputType(network, idx)}
                      <button type="button" id="remove-network-button" onClick={this.handleRemoveNetwork(idx)} className='small'>-</button>
                    </div>
                  ))}
                  <button className="add-network" type="button" onClick={this.handleAddNetwork}>Add Network</button>
                </label>
                <br />
                <input className="submit-button-network" type="submit" value="Save"/>
                <br/>
              <input className="delete-button" onClick={this.handleFormDeleteSubmit.bind(this)} type="submit" value="Delete My Account"/>
              </form>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      )
    }
  }
}

export default withAlert(withRouter(Settings))
