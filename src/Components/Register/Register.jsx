import React, { useState } from 'react'
const backendUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_BACKEND_URL : process.env.REACT_APP_DEVELOPMENT_BACKEND_URL

const Register = ({ logonSessionPassthrough, onRouteChange }) => {

    const [formName, updateFormName] = useState('')
    const [formEmail, updateFormEmail] = useState('')
    const [formPassword, updateFormPassword] = useState('')
    const [formStatus, updateFormStatus] = useState('')

    const onNameChange = e => updateFormName(e.target.value)
    const onEmailChange = e => updateFormEmail(e.target.value)
    const onPasswordChange = e => updateFormPassword(e.target.value)

    const onSubmit = () => {
        if (!formName) return updateFormStatus('badName')
        if (!formPassword) return updateFormStatus('badPassword')
        fetch(`${backendUrl}/register`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formName,
                email: formEmail,
                password: formPassword,
            })
        }).then(res => res.json()).then(res => {
            const { status, reason, logonSession } = res
            if (status === 'failure') return updateFormStatus(reason)
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
                <form className="measure" onSubmit={e => e.preventDefault()} >
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center unselectable">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 unselectable" htmlFor="name">Name</label>
                            <input
                                onChange={onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="off"
                            />
                        </div>
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
                            value="Create account"
                        />
                    </div>
                    {formStatus ?
                        <div className='ma0 lh-copy center'>
                            <p
                                className="f6 ph3 pv2 mt1 mb0 dib ba b--black bw1 black bg-red tc"
                            >{
                                    formStatus === 'badName' 
                                    ? 'Invalid name.' 
                                    : (formStatus === 'badEmail' 
                                        ? 'Invalid email' 
                                        : (formStatus === 'notNew' 
                                            ? <>An account with this<br />email already exists</> 
                                            : (formStatus === 'internalConflict' 
                                                ? <>Our servers encountered<br />an error.<br />Try again later.</> 
                                                : (formStatus === 'notNew'
                                                        ? <>An account with this<br />email already exists</>
                                                        : 'Invalid password'
                                                )
                                            )
                                        )
                                    )
                            }</p>
                        </div>
                        :
                        <></>
                    }
                    <div className="lh-copy m0 pointer center unselectable">
                        <p
                            onClick={() => onRouteChange('signin')}
                            className="f6 link dim black db m0 tc"
                        >Already have an account?<br />Sign in here.</p>
                    </div>
                </form>
            </main>
        </article>
    )

}

export default Register