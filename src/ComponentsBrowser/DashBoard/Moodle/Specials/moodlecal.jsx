

import { useEffect, useState } from "react"

const MoodleCalendar = ({ loaded, month, year, content }) => {
    const [blocks, setblocks] = useState([])
    const [hiddenElement, setElement] = useState()
    const [show, setShow] = useState(false)

    function func(info) {
        let element = []
        info.map(e=>{
            element.push(<div className="MoodleCalPopupChild">

                <div style={{ width: 'fit-content', marginRight: '10px', fontSize:'10px'}}>
                    <div style={{ fontSize: '3px', color: 'gray' }}>זמן:</div>
                    {(e.TimeBH) + ':' + String(e.TimeBM).padStart(2, '0') + '-' + (e.TimeEH) + ':' + String(e.TimeEM).padStart(2, '0')}
                </div>
                <div style={{ width: 'fit-content', marginRight: '10px', marginTop: '5px' , fontSize:'10px'}}>
                    <div style={{ fontSize: '3px', color: 'gray' }}>שיעור:</div>
                    {e.title}
                </div>
                <div style={{ position: 'absolute', bottom: '5px', left: '5px' , fontSize:'10px'}}>
                    <div style={{ fontSize: '3px', color: 'gray' }}>מרצה:</div>
                    {e.teacher}
                </div>
                
                </div>)
        })
        setElement(<div className="MoodleCalPopup">{element}</div>)
        console.log(info)
    }

    function func2() {
        setElement(<></>)
    }

    const generateblocks = (number) => {
        const array = []
        for (let i = 0; i < number; i++) {
            let className = 'blockMoodleCal'
            let info = []
            let element = () => { }
            let element2 = () => { }
            content.map(e => {
                if (e.day === i + 1) {
                    className = 'blockMoodleCal active'
                    info.push(e)
                    element = func
                    element2 = func2
                }
            })
            array.push(
                <div key={'day' + i} onMouseEnter={e => { element(info) }} onMouseLeave={element2} className={className}>
                    {i + 1}
                </div>
            )
        }
        setblocks(array)
    }
    useEffect(() => {
        if (loaded) {
            let nmonth = month + 1
            if (nmonth === 13) {
                nmonth = 1
            }
            const date = new Date()
            date.setDate(1)
            date.setMonth(nmonth - 1)
            date.setDate(date.getDate() - 1)
            date.setFullYear(year)
            generateblocks(date.getDate())
            console.log(content)
        }
    }, [content, loaded])
    return (
        <>
            {blocks}
            {hiddenElement}
        </>
    )
}

export default MoodleCalendar