import React from 'react'
import styles from './LandingPage.module.css'
import image from '../../../assets/leave.svg'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            <div className={styles.content}>
                <div className={styles.heading}>Want to let your superiors know about your leaves in advance?</div>
                <div className={styles.subHeading}>Leave Management System helps organizations manage leaves in an efficient way.</div>
                <div className={styles.btnContainer}>
                    <Link to="/signin"><button className="btn">Get Started</button></Link>
                </div>
            </div>
            <div className={styles.image}>
                <img src={image} alt="Illustration" />
            </div>
        </div>
    )
}

export default LandingPage
