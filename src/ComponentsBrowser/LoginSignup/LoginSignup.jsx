import React, { useEffect, useState } from "react";
import './LoginSignup.css'
import LoadingElement from '../Assets/LoadingElement'
const Login = ({ setState, setRank }) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [iswrong, setWrong] = useState(0)
    const [isempty, setEmpty] = useState(0)
    const [wait, setWait] = useState(0)
    async function firstload() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(window.env.API_URL, {
                    method: 'GET',
                    credentials: 'include'
                })
                const content = await response.json()
                if (content.status === 1) {
                    setRank(content.rank)
                    setState(1)
                    resolve(1)
                }
                else {
                    resolve(0)
                }
                
            }
            catch {
                reject(0)
            }
        })
    }
    useEffect(() => {
        async function caviat() {
            await firstload().then(e => {
                if (e === 0) {
                    setWait(1)
                }
            })
        }
        caviat()
            .catch(er => {
            })
    }, [])
    async function Login() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(window.env.API_URL+'/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user: user, password: password })
                });
                const content = await response.json();
                if (content.status === 1) {
                    console.log(content)
                    setRank(content.rank)
                    setState(1)
                    resolve(1)
                }
                else {
                    resolve(0)
                    setWrong(1)
                    setEmpty(0)
                }
            }
            catch {
                reject(403)
            }
        })
    }

    const apore = async () => {
        if (user.length > 0 && password.length > 0) {
            await Login().then(e => {

            })
                .catch(er => {
                    console.log(er)
                })
        }
        else {
            setWrong(0)
            setEmpty(1)
        }
    }

    return (
        <div className="Container">
            {wait === 0 ? <LoadingElement /> :
                <>
                    <div className="header">
                        <div className="text">Log in</div>
                        <div className="underline"></div>
                    </div>
                    {iswrong === 0 ? <></> : <div style={{ textAlign: 'center', color: 'red' }}>user or password is incorrect</div>}
                    {isempty === 0 ? <></> : <div style={{ textAlign: 'center', color: 'red' }}>empty field</div>}
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder="User" onChange={e => { setUser(e.target.value) }} />
                        </div>
                        <div className="input" >
                            <input type="password" placeholder="Pass" onChange={e => { setPassword(e.target.value) }} />
                        </div>
                    </div>
                    <div className="submit-container">
                        <div className="submit" onClick={() => { apore() }}>LogIn</div>
                    </div>

                </>}

        </div>
    )
}

export default Login