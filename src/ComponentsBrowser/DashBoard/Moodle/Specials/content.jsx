
import { useEffect, useRef, useState } from "react";
import { FiTrash, FiTrash2, FiChevronLeft, FiX, FiPlusCircle, FiFile, FiMoreHorizontal, FiMinusCircle, FiPackage } from "react-icons/fi";
import { BsFiletypePdf, BsFiletypeTxt, BsFiletypeDoc, BsFiletypeDocx, BsFiletypePpt, BsFiletypePptx, BsFiletypeXls, BsFiletypeXlsx } from 'react-icons/bs'


const MoodleContent = ({ content, remove, add ,classid}) => {
    const [edit, isEdit] = useState(false)
    const saveref = useRef(false)
    const [save, isSave] = useState(false)
    const [contentedit, updateEditC] = useState({ ...content, filestoremove: [] })
    const [newFiles, updateNewFiles] = useState([])
    function handleChange(event) {
        const { name, value } = event.target;
        updateEditC(p => ({
            ...p,
            [name]: value
        }))
    }
    function handleChangeNotes(event) {
        const { name, value } = event.target;
        const updatedobject = { ...contentedit }
        const updatedNotes = [...updatedobject.notes]
        updatedNotes[name] = value
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
    function addNote(event) {
        const { name, value } = event.target;
        const updatedobject = { ...contentedit }
        const updatedNotes = [...updatedobject.notes, '']
        updatedobject.notes = updatedNotes
        updateEditC(updatedobject)
    }
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
    function handleFileChange(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            updateNewFiles(p => [...p, event.target.files[i]])
        }
    }
    useEffect(() => {
        if (saveref.current) {
            isSave(true)
        }
    }, [contentedit, newFiles])
    function exit() {
        isEdit(!edit);
        saveref.current = false;
        isSave(false);
        updateEditC({ ...content, filestoremove: [] })
        updateNewFiles([])
    }
    function removeNewFile(e, message) {
        console.log(message)
        updateNewFiles(newFiles.filter(item => item.lastModified !== message));
    }
    function removeFileF(e, id) {
        const updatedobject = { ...contentedit }
        const updatedfilestoremove = [...updatedobject.filestoremove, id]
        const updatedexistedfiles = updatedobject.files.filter(item => item.id !== id)
        updatedobject.filestoremove = updatedfilestoremove
        updatedobject.files = updatedexistedfiles
        updateEditC(updatedobject)
    }
    async function download(fileinfo) {
        const { id, title } = fileinfo
        await fetch(window.env.API_URL + '/fileDownload', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: id, name: title })
        })
            .then(async e => {
                if (e.status == 200) {
                    await e.blob().then(blob => {
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = title;
                        link.click();
                    })
                }
                else {
                    alert('something went wrong')
                }
            })
            .catch(er => {
                console.log(er)
            })
    }
    async function saveit(e) {
        console.log(contentedit)
        console.log(newFiles)
        const formData = new FormData();
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
        await fetch(window.env.API_URL + '/UpdateDumb', {
            body: formData,
            method: 'POST',
            credentials: 'include',
        }).then(async e => {
            if (e.status === 200) {
                const content = await e.json()
                console.log(content.data)
                add(content.data)
                isEdit(false)
            }
        })
            .catch(er => {
                console.log(er)
            })
    }
    return (
        <>
            {edit && classid ?
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
                    <div style={{ width: 'fit-content', cursor: 'pointer', marginRight: '50%', color: 'green' }} onClick={e => { addNote(e) }}><FiPlusCircle /></div>
                    <div style={{ marginRight: '20px', marginTop: '20px', fontSize: '12px', color: 'gray' }}>קבצים:-</div>
                    {contentedit.files.map((n, i) => {
                        let fileLogo = generateFileLogo(n.title)
                        return (
                            <div style={{ width: 'fit-content', marginRight: '20px', marginTop: '5px', marginBottom: '3px', marginLeft: '3px', fontSize: '17px', display: 'flex' }}>{fileLogo}{n.title}<div style={{ color: 'red' }}><FiTrash2 style={{ marginRight: '3px', cursor: 'pointer' }} onClick={e => { removeFileF(e, n.id) }} /></div></div>
                        )
                    })}
                    {newFiles.map((n, i) => {
                        let fileLogo = generateFileLogo(n.name)
                        return (
                            <div style={{ marginRight: '20px', marginTop: '5px', marginBottom: '3px', color: 'blue', marginLeft: '3px', fontSize: '17px', display: 'flex' }}>{fileLogo}{n.name}<div style={{ color: 'red' }}><FiX onClick={e => { removeNewFile(e, n.lastModified) }} style={{ marginRight: '3px', cursor: 'pointer' }} /></div></div>
                        )
                    })}
                    <label style={{ width: 'fit-content', marginRight: '50%', color: 'green' }} for='files'><FiPlusCircle style={{ cursor: 'pointer' }} /></label>
                    <input id='files' type="file" style={{ visibility: 'hidden' }} onChange={handleFileChange} />
                    <div style={{ position: 'absolute', left: '2px', top: '2px', cursor: 'pointer' }} onClick={e => { exit(e) }}><FiMinusCircle /></div>
                    {save ? <div style={{ position: 'absolute', left: 0, bottom: 0, fontSize: '25px', color: 'green' }}><FiPackage onClick={saveit} style={{ cursor: 'pointer' }} /></div> : <></>}
                    <FiTrash onClick={e => { remove(content.id) }} style={{ color: 'red', position: 'absolute', right: 0, bottom: 0, cursor: 'pointer' }} />
                </div>
                :
                <div className="MoodleContentElement">
                    <div className="MoodleContentElementTitle" >{content.title}</div>
                    {content.notes ? <> {content.notes.length> 0?<div style={{ marginRight: '20px', marginTop: '20px', fontSize: '12px', color: 'gray' }}>הערות:-</div> : <></>}
                        {content.notes.map(n => {
                            return (
                                <div style={{ marginRight: '20px', marginTop: '3px', marginBottom: '3px', fontSize: '15px' }}><FiChevronLeft />{n}</div>
                            )
                        })}</>
                        : <></>}
                    {true ? <div style={{ marginRight: '20px', marginTop: '20px', fontSize: '12px', color: 'gray' }}>קבצים:-</div> : <></>}
                    {content.files.map(n => {
                        let fileLogo = generateFileLogo(n.title)
                        return (
                            <div onClick={e => download(n)} style={{ width: 'fit-content', marginRight: '20px', marginTop: '5px', marginBottom: '3px', marginLeft: '3px', fontSize: '17px', cursor: 'pointer', display: 'flex' }}>{fileLogo}{n.title}</div>
                        )
                    })}
                    {classid? <div style={{ position: 'absolute', left: '2px', top: '2px', cursor: 'pointer' }} onClick={e => { isEdit(!edit); saveref.current = true; updateEditC(content); updateNewFiles([]) }}><FiMoreHorizontal /></div>:<></>}
                </div>
            }
        </>
    )
}

export default MoodleContent