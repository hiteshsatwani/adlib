const UnSyncedCard = ({ lyrics }) => {

    return (
        <div className="flex pt-10 md:w-100">
            <div className="m-auto pl-5 pr-5 md:pl-0 md:pr-0">
                <div className="text-lyrics text-center text-md h-auto h-screen-35 overflow-auto " style={{whiteSpace: "pre-wrap"}}>
                    {lyrics}
                </div>
            </div>
        </div>
    )

}

export default UnSyncedCard