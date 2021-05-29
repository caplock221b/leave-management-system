import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Sidebar from '../../components/Sidebar/Sidebar'
import ManageStudents from './ManageStudents'
import firebase from '../../firebase'
import ManageStudentLeaves from './ManageStudentLeaves'
import MyLeaves from './MyLeaves'

const Teacher = () => {
    const history = useHistory()
    const [step, setStep] = useState(1)
    const [students, setStudents] = useState(null)
    const [studentLeaves, setStudentLeaves] = useState(null)
    const [myLeaves, setMyLeaves] = useState(null)

    useEffect(() => {
        if(sessionStorage.getItem("type") !== "teacher"){
            history.push('/')
        }
        else{
            getStudents()
            getMyLeaves()
        }
    }, [])
    
    useEffect(() => {
        if(students){
            getStudentLeaves()
        }
    }, [students])

    useEffect(() => {
        if(studentLeaves){
            console.log(studentLeaves);
        }
    }, [studentLeaves])

    const getComponent = () => {
        switch(step){
            case 1:
                return <ManageStudents data={students} reload={getStudents} />
            case 2:
                return <ManageStudentLeaves data={studentLeaves} reload={getStudentLeaves} />
            case 3:
                return <MyLeaves data={myLeaves} reload={getMyLeaves} />
        }
    }

    const getStudents = () => {
        const userRef = firebase.database().ref('users')
        let values = []
        userRef.on('value', (snapshot) => {
            let users = snapshot.val()
            for(let t in users){
                if(users[t].type === "student" && users[t].addedBy === sessionStorage.getItem("id")){
                    values.push({id: t, ...users[t]})
                }
            }
            values = values.sort((a, b) => a.roll > b.roll ? 1 : -1)
            setStudents(values)
        })
    }


    const getStudentLeaves = () => {
        const leaveRef = firebase.database().ref('leaves')
        const validIds = students.map(s => s.id)
        let values = []
        leaveRef.on('value', (snapshot) => {
            let leaveItems = snapshot.val()
            for(let t in leaveItems){
                if(validIds.includes(leaveItems[t].addedBy)){
                    const indStudent = students.filter(s => s.id === leaveItems[t].addedBy)
                    values.push({...leaveItems[t], id: t, roll: indStudent[0].roll, email: indStudent[0].email})
                }
            }
            values = values.sort((a, b) => a.from > b.from ? 1 : -1)
            setStudentLeaves(values)
        })
    }

    const getMyLeaves = () => {
        const leaveRef = firebase.database().ref('leaves')
        let values = []
        leaveRef.on('value', (snapshot) => {
            let leaveItems = snapshot.val()
            for(let t in leaveItems){
                if(leaveItems[t].addedBy === sessionStorage.getItem("id")){
                    values.push({id: t, ...leaveItems[t]})
                }
            }
            values = values.sort((a, b) => a.from < b.from ? 1 : -1)
            setMyLeaves(values)
        })
    }

    return (
        <div className="layoutContainer">
            <Sidebar>
                <ul>
                    <li className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>Manage Students</li>
                    <li className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>Student Leaves</li>
                    <li className={step === 3 ? 'active' : ''} onClick={() => setStep(3)}>My Leaves</li>
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
