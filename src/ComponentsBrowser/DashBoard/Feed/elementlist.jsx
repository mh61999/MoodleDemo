import { useState } from "react"
import { IoMailOutline,IoMailOpenOutline   } from "react-icons/io5";
const ElemntsLi = ({ setIndext, content }) => {
    const [active, setactive] = useState(false)
    const Element = ({ title, index }) => {
        return (
            <div onClick={e => { setIndext(index) }} className='ListElem'>
                <div >{title}</div>
            </div>
        )
    }

    return (<>
        <div className="FeedListIconContorl" onClick={e => { setactive(!active) }}>{active? <IoMailOpenOutline  />:<IoMailOutline />}</div>
        <div className={active ? 'FeedClassMeList active' : 'FeedClassMeList'}>

            {
                content.map((e, i) => {
                    return <Element title={e.title} index={i} />
                })
            }
        </div>
    </>
    )
}

export default ElemntsLi