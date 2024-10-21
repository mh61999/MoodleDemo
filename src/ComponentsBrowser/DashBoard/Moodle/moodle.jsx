import './moodle.css'
import { VscDiffRemoved } from 'react-icons/vsc'
import { BsBackspaceReverse } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import { MdPostAdd } from 'react-icons/md'
import MoodlePage1 from './Specials/page1';
import MoodlePage2 from './Specials/page2';
import MoodleCalendar from './Specials/moodlecal';
const Moodle = ({ setState }) => {
    const date = new Date()
    const montharray = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר' , 'נובמבר', 'צדמבר']
    const [isLoaded, setLoad] = useState(false)
    const [extra, setExtra] = useState(false)
    const [isBack, setBack] = useState(false)
    const [classinfo, setInfo] = useState([])
    const [classcontent, setContent] = useState([])
    const [page, setPage] = useState(0)
    const [classid, setClassId] = useState()
    const [title, setTitle] = useState('מודול')
    const [calindar,setCalindar] = useState([])
    async function getInfo() {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(window.env.API_URL + '/MoodleLoad', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month: date.getMonth() })
            })
            if (response.status == 200) {
                const content = await response.json()
                if (content.status == 1) {
                    resolve(content.data)  
                }
                else {
                    reject(0)
                }
            }
        })
    }

    async function getContent(id) {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(window.env.API_URL + '/MoodleContentLoad', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classid: id })
            })
            if (response.status == 200) {
                const content = await response.json()
                if (content.status == 1) {
                    resolve(content.data)
                }
                else {
                    setState(0)
                }
            }
        })
    }


    useEffect(() => {

        async function caviat() {
            await getInfo().then(e => {
                setInfo(e.Moodle)
                setCalindar(e.calindar)
                setLoad(true)
            })
                .catch(er => {
                    if (er == 0) {
                    }
                })
        }
        caviat()
            .catch(er => {
            })
    }, [])

    const Clicked = async (props, message, title) => {
        await getContent(message).then(e => {
            setContent(e)
            setClassId(message)
            setPage(1)
            setExtra(false)
            setBack(true)
            setTitle(title)
        })
            .catch(er => {
            })
    }

    const back = (props, message) => {
        setPage(0)
        setClassId()
        setExtra(false)
        setBack(false)
        setTitle('מודול')
    }
    return (
        <div className='MoodleContainer'>
            <div className='MoodleContent'>
                <div className='MoodleControlls'>
                    {isBack ? <div onClick={back} className='backButtonMo'><BsBackspaceReverse style={{ color: '#4b3f37' }} /></div> : <></>}
                    <div className='ControlTitleMoodle'>{title}</div>
                </div>
                {page === 0 ?
                    <>
                        <MoodlePage1 classinfo={classinfo} Clicked={Clicked} />
                    </>
                    :
                    <>
                        <MoodlePage2 classcontent={classcontent} back={back}/>
                    </>
                }
            </div>
            <div className='Moodlecalindar'>
                <div className='InfoMoodleCal'>{montharray[date.getMonth()]} {date.getFullYear()}</div>
                <MoodleCalendar loaded={isLoaded} content={calindar} month={date.getMonth()+1} year={date.getFullYear()}/>
            </div>
        </div>
    )
}

export default Moodle