const Navigation = ({ onRouteChange, logonStatus }) => {
    return (
        <>
            { logonStatus === true ? 
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p
                        className="f3 link dim black underline pa3 pointer unselectable"
                        onClick={() => onRouteChange('signin')}
                    >Sign Out</p>
                </nav>
            : 
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p
                        className="f3 link dim black underline pa3 pointer unselectable"
                        onClick={() => onRouteChange('signin')}
                    >Sign In</p>
                    <p
                        className="f3 link dim black underline pa3 pointer unselectable"
                        onClick={() => onRouteChange('register')}
                    >Register</p>
                </nav>
            }
        </>
    )
}

export default Navigation