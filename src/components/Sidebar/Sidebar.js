import React from 'react'
import styles from './Sidebar.module.css'

const Sidebar = ({ children }) => {
    return (
        <div className={styles.sidebar}>
            {children}
        </div>
    )
}

export default Sidebar
