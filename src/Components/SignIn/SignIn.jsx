import React, { useState } from 'react'
const backendUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_BACKEND_URL : process.env.REACT_APP_DEVELOPMENT_BACKEND_URL

const SignIn = ({ logonSessionPassthrough, onRouteChange }) => {
    const [formEmail, updateFormEmail] = useState('')
    const [formPassword, updateFormPassword] = useState('')
    const [formStatus, updateFormStatus] = useState('')
    
    const onEmailChange = e => updateFormEmail(e.target.value)
    const onPasswordChange = e => updateFormPassword(e.target.value)
    
    const onSubmit = () => {
        if (!formPassword) return updateFormStatus('bad')
        fetch(`${backendUrl}/logon`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: formEmail,
                password: formPassword,
            })
        }).then(res => res.json()).then(res => {
            // console.log(res)
            const {status, logonSession} = res
            if (status === 'failure') return updateFormStatus('bad')
            if (status === 'success') {
                logonSessionPassthrough('POST', logonSession)
                onRouteChange('home')
                return
            }
        })
    }
    

    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80">
                <form className="measure" onSubmit={e => e.preventDefault()}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center unselectable">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 unselectable" htmlFor="email-address">Email</label>
                            <input
                                onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                autoComplete="on"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 unselectable" htmlFor="password">Password</label>
                            <input
                                onChange={onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="on"
                            />
                        </div>
                    </fieldset>
                    <div className="mb3">
                        <input
                            onClick={onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                    {formStatus ?
                        <div className='ma0 lh-copy center'>
                            <p
                                className="f6 ph3 pv2 mt1 mb0 dib ba b--black bw1 black bg-red tc"
                            >Invalid email<br />and or password</p>
                        </div>
                    :
                        <></>
                    }
                    <div className="lh-copy m0 pointer center unselectable">
                        <p
                            onClick={() => onRouteChange('register')}
                            className="f6 link dim black db m0 tc"
                        >&nbsp;Register here.</p>
                    </div>
                </form>
            </main>
        </article>
    )


}

export default SignIn