import { ExitToApp, LockOpen } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import firebase from '../../firebase'
import CustomAlert from '../CustomAlert/CustomAlert'
import ChangePasswordModal from './ChangePasswordModal'
import styles from './Navbar.module.css'

const Navbar = () => {
    const location = useLocation()
    const history = useHistory()

    const [modalOpen, setModalOpen] = useState(false)

    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'error',
        message: ''
    })

    useEffect(() => {
        if(alert.isOpen){
          setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])

    const handleLogout = e => {
        e.preventDefault()
        sessionStorage.setItem("id", null)
        sessionStorage.setItem("type", null)
        history.push('/signin')
    }

    const handlePasswordChange = value => {
        setModalOpen(false)
        const userRef = firebase.database().ref(`/users/${sessionStorage.getItem('id')}`)
        userRef.update({
            password: value
        }, err => {
            if(err){
                setAlert({
                    isOpen: true,
                    type: 'error',
                    message: 'Something went wrong!'
                })
            }
            else{
                setAlert({
                    isOpen: true,
                    type: 'success',
                    message: 'Password updated successfully!'
                })
            }
        })
    }

    const getDashboardName = () => {
        switch(location.pathname){
            case '/student':
                return `Student Dashboard`
            case '/teacher':
                return `Teacher Dashboard`
            case '/admin':
                return `Admin Dashboard`
            default:
                return null
        }
    }

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>{`<LMS />`}</Link>
            {
                location.pathname.includes("teacher") || location.pathname.includes("student") || location.pathname.includes("admin") ?
                <span className={styles.dashname}>{getDashboardName()}</span> : null
            }
            <ul className={styles.navUl}>
                {
                    location.pathname.includes("teacher") || location.pathname.includes("student") || location.pathname.includes("admin") ?
                    <>
                        <button type="button" className={"btn " + styles.logout} onClick={() => setModalOpen(true)}>
                            <LockOpen />
                            <span>Change Password</span>
                        </button>
                        <button type="button" className={"btn " + styles.logout} onClick={handleLogout}>
                            <ExitToApp />
                            <span>Log Out</span>
                        </button>
                    </> :
                    <>
                        <Link to="/" className={`${styles.navLi} ${location.pathname === "/" ? styles.active : ''}`}>Home</Link>
                        <Link to="/signin" className={`${styles.navLi} ${location.pathname === "/signin" ? styles.active : ''}`}>Sign In</Link>
                    </>
                }
            </ul>
            {
                modalOpen &&
                <ChangePasswordModal handleSubmit={handlePasswordChange} close={() => setModalOpen(false)} />
            }
            {
                alert.isOpen &&
                <CustomAlert
                    isOpen={alert.isOpen}
                    message={alert.message}
                    type={alert.type}
                />
            }
        </nav>
    )
}

export default Navbar
