import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
    const location = useLocation()

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>{`<LMS />`}</Link>
            <ul className={styles.navUl}>
                <Link to="/" className={`${styles.navLi} ${location.pathname === "/" ? styles.active : ''}`}>Home</Link>
                <Link to="/signin" className={`${styles.navLi} ${location.pathname === "/signin" ? styles.active : ''}`}>Sign In</Link>
            </ul>
        </nav>
    )
}

export default Navbar
