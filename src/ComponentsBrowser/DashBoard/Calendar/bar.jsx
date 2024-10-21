import { useEffect, useState } from 'react'
import './calendar.css'
import {MdOutlineCrueltyFree} from 'react-icons/md'

const BlockBar = ({ content }) => {
    const [elements, setElements] = useState([])
    function generateElements() {
        let array = []
        content.map((e, i) => {
            console.log(e)
            array.push(<div key={e + i} className='ClassElementChild'>
                <div style={{ width: 'fit-content', marginRight: '10px' }}>
                    <div style={{ fontSize: '10px', color: 'gray' }}>זמן:</div>
                    {(e.TimeBH) + ':' + String(e.TimeBM).padStart(2, '0') + '-' + (e.TimeEH) + ':' + String(e.TimeEM).padStart(2, '0')}
                </div>
                <div style={{ width: 'fit-content', marginRight: '10px', marginTop: '5px' }}>
                    <div style={{ fontSize: '10px', color: 'gray' }}>שיעור:</div>
                    {e.title}
                </div>
                <div style={{ position: 'absolute', bottom: '5px', left: '5px' }}>
                    <div style={{ fontSize: '10px', color: 'gray' }}>מרצה:</div>
                    {e.teacher}
                </div>
            </div>)
        })
        setElements(array)
    }
    useEffect(() => {
        generateElements()
    }, [content])
    return (
        <>{
            content.length > 0 ?
                <div className='ClassElemnt'>
                    {elements}
                </div >
                :
                <div className='ClassElemnt'>
                    <div style={{width:'fit-content',marginRight:'90px',fontSize:'20px', color:'#D0D3D4'}}>
                        <div> אין שיעורים</div> 
                        <MdOutlineCrueltyFree style={{fontSize:'100px'}}/>
                    </div>
                </div>
        }</>)

}

export default BlockBar