import { FiChevronLeft } from "react-icons/fi";


const MoodlePage1 = ({classinfo,Clicked}) => {
    return (
        <>
        <div></div>
            {classinfo.map(item => {
                return (
                    <div className="ClassElemntContainer">
                        <div onClick={e => { Clicked(e, item._id,item.title) }} className="ClassElemntText">
                            <div style={{color:'gray',fontSize:'9px',marginRight:'5px',marginTop:'5px'}}>
                               שיעור:
                            </div>
                            <div style={{fontSize:'25px'}}><FiChevronLeft style={{fontSize:'15px'}}/>{item.title}</div>
                            <div style={{color:'gray',fontSize:'9px',marginRight:'5px',marginTop:'5px'}}>
                               מרצה:
                            </div>
                            <div style={{fontSize:'13px',marginRight:'5px',marginTop:'-5px'}}>{item.teacher}</div>
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default MoodlePage1