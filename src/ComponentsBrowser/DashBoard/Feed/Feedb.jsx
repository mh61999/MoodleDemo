import { useState } from 'react'
import './Feedb.css'
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'
const Feedb = () => {
    const [pages,setPage] = useState(0)
    
    return (
        <>
            {pages === 0? <Page1 setPage={setPage}/> : <>{pages === 1? <Page2 setPage={setPage}/> : <>{<Page3 setPage={setPage}/>}</>}</>}
        </>
    )
}

export default Feedb