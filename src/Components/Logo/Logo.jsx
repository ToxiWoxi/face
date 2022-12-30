import Tilt from 'react-parallax-tilt';
import img from './Logo.svg'


const Logo = () => {
    return (
        <Tilt className='ma4 mt0 Tilt unselectable' tiltMaxAngleX={15} tiltMaxAngleY={15} style={{height:150,width:150}}>
            <div className='Tilt-inner'>
                <img
                    src={img}
                    alt='logo'
                    style={{ padding: '11px' }} 
                /> 
            </div>
        </Tilt>
    )
}

export default Logo