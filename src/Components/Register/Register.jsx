import React, { Component } from 'react';
const backendUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_BACKEND_URL : process.env.REACT_APP_DEVELOPMENT_BACKEND_URL

class Register extends Component {
    constructor() {
        super();
        this.state = {
            formName: '',
            formEmail: '',
            formPassword: '',
            formStatus: ''
        }
    }

    onNameChange = async (e) => {
        await this.setState({ formName: e.target.value })
    }

    onEmailChange = async (e) => {
        await this.setState({ formEmail: e.target.value })
    }

    onPasswordChange = async (e) => {
        await this.setState({ formPassword: e.target.value })
    }

    onSubmit = () => {
        if (this.state.formName.length === 0) { this.setState({ formStatus: 'badName' }); return }
        if (this.state.formPassword.length === 0) { this.setState({ formStatus: 'badPassword' }); return }
        const { props } = this
        fetch(`${backendUrl}/register`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.formName,
                email: this.state.formEmail,
                password: this.state.formPassword,
            })
        }).then(res => res.json()).then(res => {
            // console.log(res)
            const { status, reason, logonSession } = res
            if (status === 'failure') {
                this.setState({ formStatus: reason })
                return
            }
            if (status === 'success') {
                props.logonSession(logonSession)
                props.onRouteChange('home')
                return
            }
        })
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80">
                    <form className="measure" onSubmit={e => e.preventDefault()} >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 center unselectable">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 unselectable" htmlFor="name">Name</label>
                                <input
                                    onChange={this.onNameChange}
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
                                    onChange={this.onEmailChange}
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
                                    onChange={this.onPasswordChange}
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
                                onClick={this.onSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center"
                                type="submit"
                                value="Create account"
                            />
                        </div>
                        {this.state.formStatus ?
                            <div className='ma0 lh-copy center'>
                                <p
                                    className="f6 ph3 pv2 mt1 mb0 dib ba b--black bw1 black bg-red tc"
                                >{
                                        this.state.formStatus === 'badName' 
                                        ? 'Invalid name.' 
                                        : (this.state.formStatus === 'badEmail' 
                                            ? 'Invalid email' 
                                            : (this.state.formStatus === 'notNew' 
                                                ? <>An account with this<br />email already exists</> 
                                                : (this.state.formStatus === 'internalConflict' 
                                                    ? <>Our servers encountered<br />an error.<br />Try again later.</> 
                                                    : (this.state.formStatus === 'notNew'
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

}




export default Register