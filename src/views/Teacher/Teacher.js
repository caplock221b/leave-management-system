import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Sidebar from '../../components/Sidebar/Sidebar'
import ManageStudents from './ManageStudents/ManageStudents'

const Teacher = () => {
    const history = useHistory()
    const [step, setStep] = useState(1)

    useEffect(() => {
        if(sessionStorage.getItem("type") !== "teacher"){
            history.push('/')
        }
    }, [])

    const getComponent = () => {
        switch(step){
            case 1:
                return null
            case 2:
                return <ManageStudents />
        }
    }

    return (
        <div className="layoutContainer">
            <Sidebar>
                <ul>
                    <li className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>Manage Leaves</li>
                    <li className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>Manage Students</li>
                </ul>
            </Sidebar>
            <div className="layoutPanel">
                {
                    getComponent()
                }
            </div>
        </div>
    )
}

export default Teacher
