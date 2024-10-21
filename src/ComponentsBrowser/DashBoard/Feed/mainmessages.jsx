

const MainMessages= ({content}) => {

    return (
        <>
             <div className='FeedClassMeContent'>
                <div className="FeedTitle">
                    {content.title}
                </div>
                <div className="FeedContent">
                    {content.content}
                </div>
                <div className="FeedSender">
                   {content.sender}
                   {content.date}
                </div>
             </div>
        </>
    )
}

export default MainMessages