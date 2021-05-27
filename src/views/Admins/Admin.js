import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Sidebar from '../../components/Sidebar/Sidebar'
import ManagePerson from './ManagePerson/ManagePerson'
import styles from './Admin.module.css'

const Admin = () => {
    const history = useHistory()

    const [step, setStep] = useState(1)

    useEffect(() => {
        if(sessionStorage.getItem("type") !== "admin"){
            history.push('/')
        }
    }, [])

    const getComponent = () => {
        switch(step){
            case 1:
                return <ManagePerson name="Teacher" />
            case 2:
                return <ManagePerson name="Admin" />
        }
    }

    return (
        <div className={styles.adminContainer}>
            <Sidebar>
                <ul>
                    <li className={step === 1 ? styles.active : ''} onClick={() => setStep(1)}>Manage Teachers</li>
                    <li className={step === 2 ? styles.active : ''} onClick={() => setStep(2)}>Manage Admins</li>
                </ul>
            </Sidebar>
            <div className={styles.adminPanel}>
                {
                    getComponent()
                }
            </div>
        </div>
    )
}

export default Admin
