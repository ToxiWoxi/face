
const Rank = ({user}) => {
    return (
        <>
            <div className='tc white f3'>
                <p className='ma0'>
                    {user.name}, your current entry count is
                </p>
            </div>
            <div className='tc white f1'>
                {user.entries}
            </div>

        </>
    )
}

export default Rank