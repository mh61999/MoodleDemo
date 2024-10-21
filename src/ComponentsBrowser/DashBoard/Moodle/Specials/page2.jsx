import { useEffect, useState } from "react";
import MoodleContent from './content'
import MoodleContentE from "./contentE";
import { FiChevronLeft, FiX, FiPlusCircle } from "react-icons/fi";

const MoodlePage2 = ({ classcontent, extracontent, classid, Clicked, setContent, setExtra }) => {
    const date = new Date()
    const emptyobject = {
        title: '',
        notes: [],
        files: [],
        date: String(date)
    }
    async function add(extra) {
        setContent([...classcontent, extra])
        setExtra(false)
    }
    async function update(info){
        let index = 0
        classcontent.map((e,i)=>{
            if(e.id === info.id){
                index = i
            }
        })
        let newcontent = classcontent
        newcontent[index] = info
        setContent([...newcontent])
    }
    async function remove(id) {
        const response = await fetch(window.env.API_URL+'/DumbRemove', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Dumbid: id })
        })
        if (response.status == 200) {
            const content = await response.json()
            const neclasscontent = classcontent.filter(item => item.id !== id)
            setContent(neclasscontent)
        }
    }
    return (
        <>
            {
                classcontent.map(content => {
                    return <>
                        <MoodleContent add={update} classid={classid} remove={remove} content={content} />
                    </>
                })}
            {extracontent ?
                <>
                    <MoodleContentE add={add} classid={classid} emptycontent={emptyobject} />
                </> : null}
        </>
    )
}



export default MoodlePage2