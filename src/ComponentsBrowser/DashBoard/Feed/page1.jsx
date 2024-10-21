import { useState } from 'react'
import { AiOutlineMessage, AiOutlineMail } from 'react-icons/ai'

const Page1 = ({ setPage }) => {
    const pageF = () => {
        setPage(2)
    }
    const pageM = () => {
        setPage(1)
    }
    return (
        <div className='FeedContainerpage1'>
            <div onClick={() => { pageF() }} className='FeedMain'>
                <AiOutlineMail style={{ marginTop: '50px' }} />
                <h4 style={{ fontSize: '20px', marginTop: '15px' }}>Feeds</h4>
            </div>
            <div onClick={() => { pageM() }} className='FeedClassMe'>
                <AiOutlineMessage style={{ marginTop: '50px' }} />
                <h4 style={{ fontSize: '20px', marginTop: '15px' }}>messages</h4>
            </div>
        </div>
    )
}

export default Page1