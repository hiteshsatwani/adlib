const MusicCard = ({ artist, img, title, albumname }) => {

    return (
        <div className="w-96 pt-5 pl-5">
            <div className="grid grid-cols-3">
                <div>
                    <img src={img} className="h-30 w-30" />
                </div>
                <div className="text-white col-span-2 md:pl-5 pr-5 pt-8 md:text-left text-right">
                    <div className="text-base">
                        {title}
                    </div>
                    <div className="text-xs">
                        {artist}
                    </div>
                    <div className="text-xs">
                        {albumname}
                    </div>
                </div>
            </div>
        </div>

    )

}

export default MusicCard