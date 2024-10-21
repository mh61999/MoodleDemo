
import { useEffect, useState } from "react";
import { FiChevronLeft, FiX, FiPlusCircle, FiFile, FiMoreHorizontal, FiMinusCircle, FiPackage } from "react-icons/fi";
import { BsFiletypePdf, BsFiletypeTxt, BsFiletypeDoc, BsFiletypeDocx, BsFiletypePpt, BsFiletypePptx, BsFiletypeXls, BsFiletypeXlsx } from 'react-icons/bs'

const MoodleContentE = ({ emptycontent, classid, add }) => {
    const [contentedit, updateEditC] = useState(emptycontent)
    const [newFiles, updateNewFiles] = useState([])
    function generateFileLogo(title) {
        let fileLogo = <FiFile className="FileLogoMoodle" />
        const types = String(title).substring(String(title).indexOf('.'))
        if (types === '.pdf') {
            fileLogo = <BsFiletypePdf className="FileLogoMoodle" style={{ color: 'red' }} />
        }
        else if (types === '.txt') {
            fileLogo = <BsFiletypeTxt className="FileLogoMoodle" style={{ color: 'black' }} />
        }
        else if (types === '.doc') {
            fileLogo = <BsFiletypeDoc className="FileLogoMoodle" style={{ color: 'blue' }} />
        }
        else if (types === '.docx') {
            fileLogo = <BsFiletypeDocx className="FileLogoMoodle" style={{ color: 'blue' }} />
        }
        else if (types === '.ppt') {
            fileLogo = <BsFiletypePpt className="FileLogoMoodle" style={{ color: 'orange' }} />
        }
        else if (types === '.ppts') {
            fileLogo = <BsFiletypePptx className="FileLogoMoodle" style={{ color: 'orange' }} />
        }
        else if (types === '.xls') {
            fileLogo = <BsFiletypeXls className="FileLogoMoodle" style={{ color: 'green' }} />
        }
        else if (types === '.xlsx') {
            fileLogo = <BsFiletypeXlsx className="FileLogoMoodle" style={{ color: 'green' }} />
        }
        return fileLogo
    }
    function handleChangeNotes(event) {
        const { name, value } = event.target;
        const updatedobject = { ...contentedit }
        const updatedNotes = [...updatedobject.notes]
        updatedNotes[name] = value
        updatedobject.notes = updatedNotes
        updateEditC(updatedobject)
    }

    function handleChange(event) {
        const { name, value } = event.target;
        updateEditC(p => ({
            ...p,
            [name]: value
        }))
    }

    function addNote(event) {
        const { name, value } = event.target;
        const updatedobject = { ...contentedit }
        const updatedNotes = [...updatedobject.notes, '']
        updatedobject.notes = updatedNotes
        updateEditC(updatedobject)
    }

    function removeNote(index) {
        const updatedobject = { ...contentedit }
        const updatedNotes = [...updatedobject.notes]
        updatedNotes.pop(index)
        updatedobject.notes = updatedNotes
        updateEditC(updatedobject)
    }

    function removeNewFile(e, message) {
        console.log(message)
        updateNewFiles(newFiles.filter(item => item.lastModified !== message));
    }

    function handleFileChange(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            updateNewFiles(p => [...p, event.target.files[i]])
        }
    }

    async function saveit(e) {
        const formData = new FormData();
        formData.append('classid', classid)
        for (let i in newFiles) {
            formData.append('Nfiles', newFiles[i]);
            formData.append('fileName', newFiles[i].name)
        }
        Object.entries(contentedit).forEach(([key, value]) => {

            if (typeof (value) === "object") {
                value.forEach(e => {
                    formData.append(key, e)
                })
            }
            else {
                formData.append(key, value)
            }
        })
        await fetch(window.env.API_URL + '/MoodleSubmit', {
            body: formData,
            method: 'POST',
            credentials: 'include',
        }).then(async e => {
            if (e.status === 200) {
                const content = await e.json()
                add(content.data)
            }
        })
            .catch(er => {
                console.log(er)
            })
    }
    return (
        <div className="MoodleContentElement">
            <input className="MoodleContentElementTitleinput" type="text" name="title" defaultValue={contentedit.title} onChange={handleChange} />
            <div style={{ marginRight: '20px', marginTop: '20px', fontSize: '12px', color: 'gray' }}>הערות:-</div>
            {contentedit.notes.map((n, i) => {
                return (
                    <div>
                        <textarea className="MoodleContentElementNoteInput" name={i} defaultValue={n} onChange={handleChangeNotes} />
                        <FiX name={i} style={{ cursor: 'pointer', position: 'absolute', color: 'red', fontSize: '20px' }} onClick={e => { removeNote(i) }} />
                    </div>
                )
            })}
            <div style={{ cursor: 'pointer', marginRight: '50%', color: 'green' }} onClick={e => { addNote(e) }}><FiPlusCircle /></div>
            <div style={{ marginRight: '20px', marginTop: '20px', fontSize: '12px', color: 'gray' }}>קבצים:-</div>
            {newFiles.map((n, i) => {
                let fileLogo = generateFileLogo(n.name)
                return (
                    <div style={{ marginRight: '20px', marginTop: '5px', marginBottom: '3px',color:'blue', marginLeft: '3px', fontSize: '17px', display: 'flex' }}>{fileLogo}{n.name}<div style={{ color: 'red' }}><FiX onClick={e => { removeNewFile(e, n.lastModified) }} style={{ marginRight: '3px', cursor: 'pointer' }} /></div></div>
                )
            })}
            <label style={{ cursor: 'pointer', marginRight: '50%', color: 'green' }} for='files'><FiPlusCircle /></label>
            <input id='files' type="file" style={{ visibility: 'hidden' }} onChange={handleFileChange} />
            <div style={{ position: 'absolute', left: 0, bottom: 0, fontSize: '25px', cursor: 'pointer', color: 'green' }} onClick={saveit}><FiPackage /></div>
        </div>
    )
}


export default MoodleContentE