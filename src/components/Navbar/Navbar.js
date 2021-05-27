import { ExitToApp } from '@material-ui/icons'
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
    const location = useLocation()
    const history = useHistory()

    const handleLogout = e => {
        e.preventDefault()
        sessionStorage.setItem("id", null)
        sessionStorage.setItem("type", null)
        history.push('/signin')
    }

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>{`<LMS />`}</Link>
            <ul className={styles.navUl}>
                {
                    location.pathname.includes("teacher") || location.pathname.includes("student") || location.pathname.includes("admin") ?
                    <button type="button" className={"btn " + styles.logout} onClick={handleLogout}>
                        <ExitToApp />
                        <span>Log Out</span>
                    </button> :
                    <>
                        <Link to="/" className={`${styles.navLi} ${location.pathname === "/" ? styles.active : ''}`}>Home</Link>
                        <Link to="/signin" className={`${styles.navLi} ${location.pathname === "/signin" ? styles.active : ''}`}>Sign In</Link>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navbar
