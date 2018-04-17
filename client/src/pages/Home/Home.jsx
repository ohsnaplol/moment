import React, { Component } from 'react'
import "./style.css"
import API from '../../utils/API'
import NetworkTag from '../../components/NetworkTag'
import { Link } from 'react-router-dom'
import Logo from "./scoopload.svg"

class Home extends Component {
  constructor() {
    super()
    this.state= {
      _id: '',
      followerData: []
    }
  }

  getUserData(id) {
    API.getUser(id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }

  // This should be changed to a single call as opposed to
  // one call for every element
  getFollowerData() {
    let promiseQueue = []
    let followerObject
    this.state.following.forEach(element => {
      promiseQueue.push(API.getUser(element))
    })
    Promise.all(promiseQueue).then((response) => {
      followerObject = response.map(element => {
        return element.data
      })
      this.setState({
        followerData: followerObject
      })
    })
  }

  componentDidMount() {
    if (this.props.uid) {
      API.getUser(this.props.uid)
      .then(response => {
        this.setState(response.data)
        this.getFollowerData()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uid) {
      API.getUser(nextProps.uid)
      .then(response => {
        this.setState(response.data)
        this.getFollowerData()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  render() {
    return (
      <div>
        <img src={Logo} className="scoopload" />
        {this.props.loggedIn && this.state.followerData ? (
          <div>
            {this.state.followerData.map((user, idx) => (
              <div key={idx}>
                <Link to={'/profile/'+user._id}><h2>{user.realName}</h2></Link>
                {user.socialNetworks.map((network, id) => (
                  <NetworkTag key={id} network={network.networkName} username={network.userName} url={network.url}/>
                ))}
                {/* got the svg to hover, but we have this whole div mess to deal with */}
                {/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="792px" height="612px" viewBox="0 0 792 612" enable-background="new 0 0 792 612" xml:space="preserve"> */}
                {/* <svg>
        <g> */}
                {/* <!-- top left  --> */}
                {/* <svg>
		      <ellipse className="top-left" transform="matrix(0.9118 0.4106 -0.4106 0.9118 79.0285 -79.6945)" cx="225.032" cy="144.12" rx="53.158" ry="46.842"/>
	
          <ellipse className="top-left" transform="matrix(0.9118 0.4106 -0.4106 0.9118 92.7471 -65.1427)" fill="#FDFCF0" cx="198.013" cy="183.326" rx="22.31" ry="11.761"/>
	
          <ellipse className="top-left" transform="matrix(0.9118 0.4106 -0.4106 0.9118 98.0911 -77.6247)" fill="#FDFCF0" cx="229.751" cy="189.538" rx="22.31" ry="11.76"/>
	
          <ellipse className="top-left" transform="matrix(0.9118 0.4106 -0.4106 0.9118 99.6763 -88.1025)" fill="#FDFCF0" cx="254.924" cy="187.976" rx="22.31" ry="11.761"/>
	
          <ellipse className="top-left" transform="matrix(0.9118 0.4106 -0.4106 0.9118 81.1914 -57.785)" fill="#FDFCF0" cx="175.115" cy="160.114" rx="22.31" ry="11.762"/>
          </svg> */}
                {/* </g>
        <g> */}
                {/* <!-- bottom right --> */}
                {/* <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 132.2756 -96.8796)" fill="#FDEFF4" cx="396.562" cy="402.708" rx="53.158" ry="46.842"/>
	
		      <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 143.5438 -88.889)" fill="#FDEFF4" cx="374.939" cy="445.129" rx="22.31" ry="11.761"/>
	
		      <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 145.4573 -98.0648)" fill="#FDEFF4" cx="407.219" cy="447.109" rx="22.31" ry="11.76"/>
	
		      <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 145.116 -105.379)" fill="#FDEFF4" cx="431.966" cy="442.247" rx="22.31" ry="11.761"/>
	
		      <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 136.7103 -82.3334)" fill="#FDEFF4" cx="349.184" cy="425.135" rx="22.31" ry="11.761"/>
        </g>
        <g> */}
                {/* <!-- middle left --> */}
                {/* <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 82.2823 -31.4029)" fill="#F1F7EE" cx="148.248" cy="264.94" rx="53.158" ry="46.841"/>
	
		      <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 93.5546 -23.4123)" fill="#F1F7EE" cx="126.625" cy="307.362" rx="22.31" ry="11.76"/>
	
		      <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 95.4657 -32.5919)" fill="#F1F7EE" cx="158.905" cy="309.341" rx="22.31" ry="11.761"/>
	
		      <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 95.1269 -39.9029)" fill="#F1F7EE" cx="183.652" cy="304.479" rx="22.31" ry="11.76"/>
	
		      <ellipse transform="matrix(0.9579 0.287 -0.287 0.9579 86.7218 -16.8606)" fill="#F1F7EE" cx="100.87" cy="287.367" rx="22.31" ry="11.761"/>
        </g>
        <g> */}
                {/* <!-- center --> */}
                {/* <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 41.7821 -41.3008)" fill="#ccff66" cx="311.03" cy="272.869" rx="43.351" ry="38.201"/>
	
		      <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 46.8694 -39.1835)" fill="#ccff66" cx="298.727" cy="309.7" rx="18.195" ry="9.59"/>
	
		      <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 46.8062 -42.9269)" fill="#ccff66" cx="325" cy="307.388" rx="18.195" ry="9.591"/>
	
		      <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 46.0315 -45.7482)" fill="#ccff66" cx="344.37" cy="300.47" rx="18.195" ry="9.591"/>
	
		      <ellipse transform="matrix(0.9899 0.1416 -0.1416 0.9899 44.798 -36.0333)" fill="#ccff66" cx="275.535" cy="296.692" rx="18.195" ry="9.592"/>
        </g>
          <path fill="#F5DEB3" d="M325.506,225.491c0,0,3.6-17.221,11.462-22.524c0,0,3.872,1.068,2.843,2.459c0,0,0.128,1.768-1.176,2.238
	          l-1.398-1.989c0,0-5.793-0.13-9.715,19.514L325.506,225.491z"/>
          <circle fill="#C41617" cx="324.439" cy="231.761" r="10.673"/>
          <ellipse transform="matrix(0.9889 -0.1484 0.1484 0.9889 -36.7555 47.08)" fill="#010202" cx="297.207" cy="269.918" rx="1.359" ry="1.79"/>
          <ellipse transform="matrix(0.9889 -0.1484 0.1484 0.9889 -36.789 51.542)" fill="#010202" cx="326.976" cy="272.285" rx="1.359" ry="1.789"/>
          <path fill="#010202" d="M298.666,282.725l27.78,1.127C326.446,283.853,313.281,297.251,298.666,282.725z"/>
        <g> */}
                {/* <!-- middle right --> */}
                {/* <ellipse transform="matrix(0.9588 -0.2842 0.2842 0.9588 -58.3447 149.2735)" fill="#F9EFF7" cx="485.167" cy="275.67" rx="53.157" ry="46.842"/>
	
		      <ellipse transform="matrix(0.9588 -0.2842 0.2842 0.9588 -71.5833 152.6687)" fill="#F9EFF7" cx="490.297" cy="323.007" rx="22.31" ry="11.762"/>
	
		      <ellipse transform="matrix(0.9587 -0.2843 0.2843 0.9587 -65.8792 160.0182)" fill="#F9EFF7" cx="518.394" cy="306.992" rx="22.31" ry="11.761"/>
	
		      <ellipse transform="matrix(0.9588 -0.2842 0.2842 0.9588 -60.1229 164.4026)" fill="#F9EFF7" cx="536.441" cy="289.374" rx="22.31" ry="11.761"/>
	
		      <ellipse transform="matrix(0.9587 -0.2843 0.2843 0.9587 -72.1829 143.3458)" fill="#F9EFF7" cx="457.798" cy="320.375" rx="22.31" ry="11.761"/>
        </g>
        <g> */}
                {/* <!-- top right --> */}
                {/* <ellipse transform="matrix(0.7024 -0.7117 0.7117 0.7024 16.0011 325.7595)" fill="#FFFAF1" cx="397.604" cy="143.743" rx="53.157" ry="46.841"/>
	
		      <ellipse transform="matrix(0.7025 -0.7117 0.7117 0.7025 -3.6078 356.8165)" fill="#FFFAF1" cx="424.946" cy="182.723" rx="22.31" ry="11.76"/>
	
		      <ellipse transform="matrix(0.7024 -0.7117 0.7117 0.7024 21.0513 360.6219)" fill="#FFFAF1" cx="441.822" cy="155.134" rx="22.31" ry="11.76"/>
	
		      <ellipse transform="matrix(0.7025 -0.7117 0.7117 0.7025 40.3998 358.6252)" fill="#FFFAF1" cx="449.123" cy="130.994" rx="22.311" ry="11.761"/>
	
		      <ellipse transform="matrix(0.7024 -0.7117 0.7117 0.7024 -21.9758 339.6462)" fill="#FFFAF1" cx="395.213" cy="196.105" rx="22.31" ry="11.762"/>
        </g>
        <g> */}
                {/* <!-- bottom left --> */}
                {/* <ellipse transform="matrix(0.9976 -0.0692 0.0692 0.9976 -26.9456 15.0285)" fill="#F0F4FC" cx="203.516" cy="396.569" rx="53.158" ry="46.841"/>
	
		      <ellipse transform="matrix(0.9976 -0.0692 0.0692 0.9976 -30.2246 14.773)" fill="#F0F4FC" cx="198.24" cy="443.89" rx="22.31" ry="11.761"/>
	
		      <ellipse transform="matrix(0.9976 -0.0692 0.0692 0.9976 -29.5094 16.8987)" fill="#F0F4FC" cx="229.145" cy="434.36" rx="22.311" ry="11.761"/>
	
		      <ellipse transform="matrix(0.9976 -0.0692 0.0692 0.9976 -28.5308 18.3449)" fill="#F0F4FC" cx="250.588" cy="421.083" rx="22.31" ry="11.761"/>
	
		      <ellipse transform="matrix(0.9976 -0.0692 0.0692 0.9976 -29.6424 12.5999)" fill="#F0F4FC" cx="167.089" cy="434.26" rx="22.31" ry="11.761"/>
        </g>
      </svg> */}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>loading</h1>
          </div>
        )}
      </div>
    )
  }
}

export default Home;
