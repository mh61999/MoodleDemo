import { useState } from "react"
import { animated, useSpring } from '@react-spring/web'



const LoadingElement = () => {
    const [firstly,setFirst] = useState(false)
    const [secondly,setSecond] = useState(false)
    const [thirdly,setThird] = useState(false)
    const [forthly,setForth] = useState(false)

    const first = useSpring({
        from: mid,
        to: max,
        config: { duration: "1000" },
        reverse: firstly,
        onRest: () => setFirst(!firstly)
    })
    const second = useSpring({
        from: small,
        to: max,
        config: { duration: "1000" },
        reverse: secondly,
        onRest: () => setSecond(!secondly)
    })

    const third = useSpring({
        from: tiny,
        to: max,
        config: { duration: "1000" },
        reverse: thirdly,
        onRest: () => setThird(!thirdly)
    })
    const forth = useSpring({
        from: micro,
        to: max,
        config: { duration: "1000" },
        reverse: forthly,
        onRest: () => setForth(!forthly)

    })
    return (
        <animated.div style={style1}>
            <animated.div style={first}>
            </animated.div>
            <animated.div style={second}>
            </animated.div>
            <animated.div style={third}>
            </animated.div>
            <animated.div style={forth}>
            </animated.div>
        </animated.div>
    )
}

const style1 = {
    position: 'relative',
    width: '150px',
    height: '150px',
    borderRadius: '75px',
    top: '50%',
    left: '50%',
    marginLeft: '-75px',
    marginTop: '-75px',
}

const micro = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    border: 'solid 5px aqua',
    marginLeft: '-7.5px',
    marginTop: '-7.5px',
    background: 'rgba(255, 255, 255, 0)'
}


const tiny = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '25px',
    height: '25px',
    borderRadius: '12.5px',
    border: 'solid 5px aqua',
    marginLeft: '-15px',
    marginTop: '-15px',
    background: 'rgba(255, 255, 255, 0)'
}

const small = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    border: 'solid 5px aqua',
    marginLeft: '-27.5px',
    marginTop: '-27.5px',
    background: 'rgba(255, 255, 255, 0)'
}


const mid = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100px',
    height: '100px',
    borderRadius: '50px',
    border: 'solid 5px aqua',
    marginLeft: '-52.5px',
    marginTop: '-52.5px',
    background: 'rgba(255, 255, 255, 0)'
}



const max = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '125px',
    height: '125px',
    borderRadius: '62.5px',
    border: 'solid 5px rgba(0, 162, 255,0.6)',
    marginLeft: '-65px',
    marginTop: '-65px',
    background: 'aqua'
}



export default LoadingElement