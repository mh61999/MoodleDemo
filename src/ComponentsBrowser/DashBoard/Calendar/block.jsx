import { useEffect, useState } from "react"




const Block = ({ month, year, content,day, loaded, setDay}) => {
    const [blocks, setblocks] = useState([])
    const generateblocks = (number) => {
        const array = []
        for (let i = 0; i < number; i++) {
            let classname = 'calBlock'
            content.map(item=>{
                if(i+1 === item.day){
                    classname = 'calBlock cont'
                }
            })
            if(i+1 == day){
                classname='calBlock active'
            }
            array.push(
                <div key={'day'+i} className={classname} onClick={e=>{setDay(i+1)}}>
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
        }
    }, [loaded,month,year,day])
    return blocks

}


export default Block