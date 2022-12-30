import './URLInput.css'

const URLInput = ({ onInputChange, onButtonSubmit, logonSessionPassthrough }) => {
    return (
        <>
            <p className='f3 white tc mt5 mb3'>
                {`Detect faces in pictures!`}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
            {/* <div className='center mt4'>
                <div className='warn white bg-red center pa1 br3 shadow-5'>
                    <p>
                        Invalid image. Make sure the URL is for a thing that does stuff.
                    </p>
                </div>
            </div> */}
        </>
    )
}

export default URLInput