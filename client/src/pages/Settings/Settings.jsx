import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { withAlert } from 'react-alert'
import API from '../../utils/API'
// import "./style.css";



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
        this.props.alert.show(<div>Saved!</div>)
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
      this.setState({ nicknames: [] }) // not working
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

  handleNetworkChange = (idx) => (event) => {
    console.log(JSON.stringify(event.target.name))
    const newNetworks = this.state.socialNetworks.map((network, sidx) => {
      if (idx !== sidx) return network
      return { ...network, [event.target.name]: event.target.value }
    })
    this.setState({ socialNetworks: newNetworks })
  }

  handleRemoveNetwork = (idx) => () => {
    this.setState({
      socialNetworks: this.state.socialNetworks.filter((s, sidx) => idx !== sidx)
    })
  }

  getUserData(id) {
    if (id) {
      API.getUser(id)
        .then(response => {
          this.setState(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  getInputType(network, idx) {
    switch (network.networkName) {
      case 'snapchat':
      case 'xbox':
      case 'playstation':
      case 'twitch':
      case 'instagram':
      case 'reddit':
      case 'tumblr':
      case 'bandcamp':
      case 'soundcloud':
      case 'deviantart':
      case 'pinterest':
      case 'github':
        return <input className="form-control col" type='text' placeholder='Username' value={network.userName} name="userName" onChange={this.handleNetworkChange(idx)} />
      case 'twitter':
      case 'medium' :
        return (
          <input className="form-control col" type='text' placeholder='@' value={network.userName} name="userName" onChange={this.handleNetworkChange(idx)} />
        )
      default:
        return <input className="form-control col" type='text' placeholder='URL' value={network.url} name="url" onChange={this.handleNetworkChange(idx)} />
    }
  }

  componentDidMount() {
    this.getUserData(this.props.uid)
  }

  componentWillReceiveProps(nextProps) {
    this.getUserData(nextProps.uid)
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div className="container">
          {this.state._id && (
            <div className="card mt-4 mb-4 settings-card">
              <form className="card-body mx-auto" onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <h3>Name</h3>
                  <input className="form-control" type='text' name="realName" value={this.state.realName} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <h3>
                    Nicknames
                  </h3>
                  {this.state.nicknames.map((nickname, idx) => (
                    <div className="input-group mb-2" key={idx}>
                      <input
                        className="form-control"
                        type="text"
                        placeholder={`Nickname #${idx + 1}`}
                        value={nickname.name}
                        onChange={this.handleNickNameChange(idx)}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-danger" type="button" onClick={this.handleRemoveNickname(idx)}>X</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={this.handleAddnickname} className="btn btn-primary">Add Nickname</button>
                </div>
                <div className="form-group">
                  <h3>
                    Networks
                  </h3>
                  <p>
                    Warning: Private and secret functionality is currently under development.
                  </p>
                  {this.state.socialNetworks.map((network, idx) => (
                    <div className="form-row mb-3" key={idx}>
                      <select className="form-control col-3 mr-1 " value={network.networkName} name="networkName" onChange={this.handleNetworkChange(idx)}>
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
                      <select className="form-control col-2 mr-1" value={network.privacy} name="privacy" onChange={this.handleNetworkChange(idx)}>
                        <option value='public'>Public</option>
                        <option default value='private'>Private</option>
                        <option value='secret'>Secret</option>
                      </select>
                      {this.getInputType(network, idx)}
                      <button className='btn btn-danger ml-1' type="button" onClick={this.handleRemoveNetwork(idx)}>X</button>
                    </div>
                  ))}
                  <button className="btn btn-primary" type="button" onClick={this.handleAddNetwork}>Add Network</button>
                </div>
                <input className="btn btn-success" type="submit" value="Save" />
                <br/>
                <br/>
                <br/>
                <input className="btn btn-danger" onClick={this.handleFormDeleteSubmit.bind(this)} type="submit" value="Delete My Account" />
              </form>
            </div>
          )}
        </div>
      )
    }
  }
}

export default withAlert(withRouter(Settings))
