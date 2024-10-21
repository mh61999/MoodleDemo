import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Layout = ({setState}) => {
    const [rank,setRank] = useState(0)
    async function checkValid() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(window.env.API_URL, {
                    method: 'GET',
                    credentials: 'include'
                })
                const content = await response.json()
                if (content.status === 1) {
                    setRank(content.rank)
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
            await checkValid().then(e => {
                if (e === 0) {
                    setState(0)
                }
            })
                .catch(er => {
                    if (er === 0) {
                        setState(0)
                    }
                })
        }
        caviat()
            .catch(er => {
                setState(0)
            })
    },)


    return <div style={{
        direction: 'rtl',
        position:'relative',
    }}>
        <Sidebar setState={setState}/>
        <Outlet context={{rank}}/>
    </div>
}

export default Layout