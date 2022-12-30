
import React, { useState } from 'react'
import './App.css';
import ParticlesBg from 'particles-bg'
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

const App = () => {
    const [input, updateInput] = useState('')
    const [imageURL, updateImageURL] = useState('')
    const [boxes, updateBoxes] = useState([])
    const [route, updateRoute] = useState('signin')
    const [logonStatus, updateLogonStatus] = useState(false)
    const [logonSession, updateLogonSession] = useState({})
    // const [sessionStatus, updateSessionStatus] = useState(false)

    const logonSessionPassthrough = async (req, obj) => {
        if (!req || req.toLowerCase() === 'get') return logonSession
        if (req.toLowerCase()==='post') {
            obj ? 
            updateLogonSession(obj)
            :
            updateLogonSession({})
            return logonSession
        }
        
    }

    const onInputChange = event => {
        updateInput(event.target.value)
    }

    const onButtonSubmit = async () => {
        // Fail if url is invalid
        if (!isValidUrl(input)) return
        updateImageURL(input)
        updateBoxes([])
        
        // Fail if no session
        if (!logonSession) return
        let { session } = logonSession
        fetch(`${backendUrl}/image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: session.id,
                sessionid: session.sessionid,
                url: input
            })
        }).then(res => res.json()).then(res => {
            const { status, reason, logonSession, regions } = res
            if (logonSession) updateLogonSession(logonSession)
            if (status === 'success') processImage(regions)
            if (status === 'failure') {
                if (reason === 'invalidSession') {
                    // TODO: Make a pop-up that informs the user that their session expired, log them out. 
                    onRouteChange('signin')
                }
            }
        }).catch(console.err)
    }

    const processImage = regions => {
        const img = document.getElementById('ProccessedImage')
        const w = Number(img.width)
        const h = Number(img.height)
        let newBoxes = []
        for (let i = 0; i < regions.length; i++) {
            let box = regions[i]
            box = {
                leftCol: box.left_col * w,
                topRow: box.top_row * h,
                rightCol: w - box.right_col * w,
                bottomRow: h - box.bottom_row * h
            }
            newBoxes.push(box)
        }
        updateBoxes(newBoxes)
    }

    const onRouteChange = (newRoute) => {
        updateRoute(newRoute)
        if (newRoute === 'home') {
            updateLogonStatus(true)
        } else { 
            updateLogonStatus(false)
            updateLogonSession({})
            updateImageURL('')
            updateBoxes([])
        }
    }


    return (
        <>
            <ParticlesBg
                type="cobweb"
                bg={true}
            />
            <Navigation onRouteChange={onRouteChange} logonStatus={logonStatus}/>
            <Logo />
            {route === 'home' ?
                <>
                    <Rank user={logonSession.user} />
                    <URLInput onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} logonSessionPassthrough={logonSessionPassthrough} />
                    <ProcessedImage imageURL={imageURL} boxes={boxes} />
                </>
                : (
                    route === 'signin' ?
                        <SignIn onRouteChange={onRouteChange} logonSessionPassthrough={logonSessionPassthrough} />
                        :
                        <Register onRouteChange={onRouteChange} logonSessionPassthrough={logonSessionPassthrough} />
                )
            }
        </>
    );
}

export default App;
