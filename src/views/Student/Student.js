import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Sidebar from '../../components/Sidebar/Sidebar'
import ManageLeaves from './ManageLeaves'

const Student = () => {
    const history = useHistory()
    const [step, setStep] = useState(1)

    useEffect(() => {
        if(sessionStorage.getItem("type") !== "student"){
            history.push('/')
        }
    }, [])

    const getComponent = () => {
        switch(step){
            case 1:
                return <ManageLeaves />
        }
    }

    return (
        <div className="layoutContainer">
            <Sidebar>
                <ul>
                    <li className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>Manage Leaves</li>
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

export default Student
