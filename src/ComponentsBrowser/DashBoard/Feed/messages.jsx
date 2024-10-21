

import { CgProfile } from "react-icons/cg";


const MessagesL = () => {
    return (
        <>
            <div className='FeedClassMeContent'>
                <div className='FeedMessagesCont'>
                    <div className='MessageProfile '>
                        <div className='MessageSender'>
                            <CgProfile style={{fontSize: '20px'}} /> sender name
                        </div>
                        <div className='MessageBubble'>
                            hello this message is for test enjoy
                        </div>
                    </div>
                </div>
                <input className='MesInput' type="text" name="" id="" />
            </div>
        </>
    )
}

export default MessagesL