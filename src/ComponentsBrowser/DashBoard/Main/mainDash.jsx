import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './mainDash.css'
import { FiAlertCircle } from "react-icons/fi";
import LoadingElement from "../../Assets/LoadingElement";
const Main = ({setState}) => {

    async function getInfo(){
        const date = new Date()
        return new Promise(async(resolve,reject)=>{
            await fetch(window.env.API_URL + '/Dash', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: date })
            })
            .then( async e=>{
                await e.json().then(j=>{
                    resolve(j)
                })
                .catch(er=>{
                    reject(er)
                })
            })
            .catch(er=>{
                reject(er)
            })
        })
    }

    useEffect(()=>{
        async function caviat(){
            await getInfo().then(e=>{
                console.log(e)
            })
            .catch(er=>{

            })
        }
        caviat().catch(er=>{

        })
    },[])
    return (
        <div className="Dashcontainer">
            <div>
                
            </div>
        </div>
    )
}

export default Main;