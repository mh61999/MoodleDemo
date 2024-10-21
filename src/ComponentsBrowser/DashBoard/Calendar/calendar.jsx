
import './calendar.css'

import Block from './block'
import { useEffect, useState } from 'react'
import BlockBar from './bar'


const Wcalendar = ({ setState }) => {
    const date = new Date()
    const [dayselected, setDay] = useState(date.getDate())
    const [loaded, setLoaded] = useState(false)
    const [content, setContent] = useState([])
    const [datenow, setNowDate] = useState(date.getFullYear().toString() + '-' + (date.getMonth() + 1))
    const [month, setMonth] = useState(date.getMonth() + 1)
    const [year, setYear] = useState(date.getFullYear())
    const [listContent, setLcontent] = useState([])
    async function getContent() {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(window.env.API_URL + '/Calendar', {
                method: 'GET',
                credentials: 'include'
            })
            if (response.status == 200) {
                const content = await response.json()
                if (content.status == 1) {
                    resolve(content.array)
                }
                else {
                    reject(0)
                }
            }
            else {
                reject(0)
            }
        })
    }
    function handlechange(e) {
        const selected = e.target.value
        const Syear = Number(String(selected).substring(0, 4))
        const Smonth = Number(String(selected).substring(5))
        setMonth(Smonth)
        setYear(Syear)

    }
    useEffect(() => {
        async function caviat() {
            await getContent().then(e => {
                setContent(e)
                setLoaded(true)
            })
                .catch(er => {

                })
        }
        caviat().catch(er => {

        })
    }, [])
    useEffect(() => {
        if (loaded) {
            setLcontent(content.filter(item=> item.day===dayselected && item.month === month-1 && item.year === year))
        }
    }, [dayselected, loaded,month,year])
    return (
        <div className='biggerCalContainer'>
            <div className='calendarContainer'>
                <div className='CalInfoContainer'>
                    <input type='month' defaultValue={datenow} onChange={handlechange}></input>
                </div>
                <div className='BlockContainer'>
                    <Block content={content.filter(item => item.month === month - 1 && item.year === year)} month={month} setDay={setDay} year={year} day={dayselected} loaded={loaded} />
                </div>
            </div>
            <div className='ClassListContainer'>
                <BlockBar content={listContent}/>
            </div>
        </div>
    )
}

export default Wcalendar;