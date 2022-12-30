import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg'
// import BlurBG from '../Components/BlurBG/BlurBG'
import Logo from '../Components/Logo/Logo'
import Navigation from '../Components/Navigation/Navigation'
import Rank from '../Components/Rank/Rank'
import URLInput from '../Components/URLInput/URLInput'
import ProcessedImage from '../Components/ProcessedImage/ProcessedImage'
import SignIn from '../Components/SignIn/SignIn'
import Register from '../Components/Register/Register'
const backendUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_BACKEND_URL : process.env.REACT_APP_DEVELOPMENT_BACKEND_URL

const isValidUrl = urlString => {
    try {
        return Boolean(new URL(urlString));
    }
    catch (e) {
        return false;
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageURL: '',
            boxes: [],
            route: 'signin',
            logonStatus: false,
            logonSession: {},
            sessionStatus: 0
        }
    }

    logonSession = async (obj) => {
        if (obj) {
            await this.setState({logonSession: obj})
            return this.state.logonSession
        }
        return this.state.logonSession
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = async () => {
        // Fail if url is invalid
        if (!isValidUrl(this.state.input)) {return}
        await this.setState({ imageURL: this.state.input, boxes: [] });

        // Fail if no session
        if (Object.keys(this.state.logonSession).length === 0) {return}
        let {session} = this.state.logonSession
        fetch(`${backendUrl}/image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: session.id,
                sessionid: session.sessionid,
                url: this.state.imageURL
            })
        }).then(res => res.json()).then(res => {
            const { status, reason, logonSession, regions } = res
            if (logonSession) this.logonSession(logonSession)
            if (status === 'success') this.processImage(regions)
            if (status === 'failure') {
                if (!reason) {}
            }
        }).catch(console.err)
    }

    processImage = regions => {
        const img = document.getElementById('ProccessedImage')
        const w = Number(img.width)
        const h = Number(img.height)
        let boxes = []
        for (let i = 0; i < regions.length; i++) {
            let box = regions[i]
            box = {
                leftCol: box.left_col * w,
                topRow: box.top_row * h,
                rightCol: w - box.right_col * w,
                bottomRow: h - box.bottom_row * h
            }
            boxes.push(box)
        }
        this.setState({ boxes: boxes })
    }

    onRouteChange = (newRoute) => {
        this.setState({ route: newRoute })
        if (newRoute === 'home' ) {
            this.setState({ logonStatus: true })
        } else { this.setState({ logonStatus: false, logonSession: {}, imageURL: '', boxes: [] }) }
    }

    render() {
        let { logonStatus, route, imageURL, boxes } = this.state
        return (
            <>
                <ParticlesBg
                    type="cobweb"
                    bg={true}
                />
                <Navigation onRouteChange={this.onRouteChange} logonStatus={logonStatus} logonSession={this.logonSession} />
                <Logo />
                {route === 'home' ?
                    <>
                    <Rank user={this.state.logonSession.user}/>
                    <URLInput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} logonSession={this.logonSession} />
                    <ProcessedImage imageURL={imageURL} boxes={boxes} />
                    </>
                    :(
                        route === 'signin' ?
                        <SignIn onRouteChange={this.onRouteChange} logonSession={this.logonSession} />
                        :
                        <Register onRouteChange={this.onRouteChange} logonSession={this.logonSession} /> 
                    )
                }
            </>
        );
    }
}

export default App;
