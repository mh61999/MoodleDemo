import { useEffect, useState } from "react"
import ElemntsLi from "./elementlist"
import MainMessages from "./mainmessages"


const Page3 = ({ setPage }) => {
    const [index, setIndext] = useState(0)
    const [content, setContent] = useState([])
    async function getContent() {
        return new Promise(async (resolve, reject) => {
            await fetch(window.env.API_URL + '/Feed', {
                method: 'GET',
                credentials: 'include'
            }).then(async result => {
                if (result.status === 200) {
                    await result.json().then(content => {
                        if(content.state === 1){
                            resolve(content.data)
                        }
                    })
                        .catch(er => {

                        })
                }
            })
                .catch(er => {

                })
        })
    }
    const page = () => {
        setPage(0)
    }
    useEffect(() => {
        async function caviat() {
            await getContent().then(e => {
                setContent(e)
            }).catch(er => {

            })
        }
        caviat()
            .catch(er => {
            })
    }, [content])
    return (
        <div className="FeedContainerpage3">
        {content.length > 0 ? <>
            <div style={{position:'absolute'}} onClick={() => { page() }}>back</div>
            <ElemntsLi setIndext={setIndext} content={content} />
            <MainMessages content={content[index]} /></>
            :
            <></>
        }

        </div>
    )
}

export default Page3