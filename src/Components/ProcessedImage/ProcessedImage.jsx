import Box from './Box'

const ProcessedImage = ({ imageURL, boxes }) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id='ProccessedImage' src={imageURL} alt={``} width='500px' height='auto' />
                {boxes.map((box, i) => <Box box={box} key={`box${i}`} />)}
            </div>
        </div>
    )
}

export default ProcessedImage
