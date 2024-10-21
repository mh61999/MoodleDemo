import ElemntsLi from "./elementlist"
import MessagesL from "./messages"


const Page2 = ({setPage}) => {

    const page = ()=>{
        setPage(0)
    }

    return (
        <>
            <div onClick={()=>{page()}}>back</div>
            <ElemntsLi/>
            <MessagesL/>
        </>
    )
}

export default Page2