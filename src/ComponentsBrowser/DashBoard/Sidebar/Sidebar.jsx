import { IoFileTrayStackedOutline, IoCalendarOutline, IoCardOutline, IoBriefcaseOutline } from 'react-icons/io5';
import './Sidebar.css'
import { FiAlertCircle, FiMenu } from "react-icons/fi";
import { CiBullhorn } from "react-icons/ci";

import { NavLink } from "react-router-dom";
import { useState } from 'react';
const Sidebar = ({ setState }) => {
    const [active, setActive] = useState(false)

    const logout = async () => {

        async function logout() {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch(window.env.API_URL + '/logout', {
                        method: 'GET',
                        credentials: 'include'
                    })
                    resolve(1)
                }
                catch {
                    reject(0)
                }
            })
        }
        await logout().then(e => {
            setState(0)
        })
    }


    return <div className='parentContainer'>
        <div className='topselect'>
            <FiMenu onClick={e => { setActive(!active) }} className='slidebutton' />
        </div>
        <div className={active? 'container': 'container looks'}>
            <NavLink style={{ textDecoration: 'none' }} to="/">
                {({ isActive, isPending }) => (
                    <div className={isActive ?"barpending active":"barpending"}>
                        <IoFileTrayStackedOutline className={isActive ? 'icon' : 'iconin'} />
                        <div className={active ? "catName" : "catNamein"}>
                            Dash
                        </div>
                    </div>
                )}
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/calendar">
                {({ isActive, isPending }) => (
                    <div className={isActive ?"barpending active":"barpending"}>
                        <IoCalendarOutline className={isActive ? 'icon' : 'iconin'} />
                        <div className={active ? "catName" : "catNamein"}>
                            Calendar
                        </div>
                    </div>
                )}
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/moodle">
                {({ isActive, isPending }) => (
                    <div className={isActive ?"barpending active":"barpending"}>
                        <FiAlertCircle className={isActive ? 'icon' : 'iconin'} />
                        <div className={active ? "catName" : "catNamein"}>
                            Moodle
                        </div>
                    </div>
                )}
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/Feed">
                {({ isActive, isPending }) => (
                    <div className={isActive ?"barpending active":"barpending"}>
                        <CiBullhorn className={isActive ? 'icon' : 'iconin'} />
                        <div className={active ? "catName" : "catNamein"}>
                            Feed
                        </div>
                    </div>
                )}
            </NavLink>
            <div className={active? "logout": "logout hide"} onClick={e => { logout() }}>
                logout
            </div>
        </div>
    </div>
}

export default Sidebar