import './Box.css'

const Box = ({ box }) => {
    return (
        <div 
            className="boundingBox" 
            style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
            }}
        />
    )
}

export default Box
