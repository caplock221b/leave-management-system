import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Sidebar from '../../components/Sidebar/Sidebar'
import ManagePerson from './ManagePerson'
import ManageTeacherLeaves from './ManageTeacherLeaves'
import firebase from '../../firebase'

const Admin = () => {
    const history = useHistory()
    const [teacherItems, setTeacherItems] = useState(null)
    const [adminItems, setAdminItems] = useState(null)
    const [teacherLeaves, setTeacherLeaves] = useState(null)

    const [step, setStep] = useState(1)

    useEffect(() => {
        if(sessionStorage.getItem("type") !== "admin"){
            history.push('/')
        }
        else{
            getTeachers()
            getAdmins()
        }
    }, [])

    useEffect(() => {
        if(teacherItems){
            getLeaves()
        }
    }, [teacherItems])

    const getTeachers = () => {
        const teacherRef = firebase.database().ref('users')
        let values = []
        teacherRef.on('value', (snapshot) => {
            let teachers = snapshot.val()
            for(let t in teachers){
                if(teachers[t].type === "teacher" && teachers[t].addedBy === sessionStorage.getItem("id")){
                    values.push({id: t, ...teachers[t]})
                }
            }
            setTeacherItems(values)
        })
    }

    const getLeaves = () => {
        const leaveRef = firebase.database().ref('leaves')
        const validIds = teacherItems.map(s => s.id)
        let values = []
        leaveRef.on('value', (snapshot) => {
            let leaveItems = snapshot.val()
            for(let t in leaveItems){
                if(validIds.includes(leaveItems[t].addedBy)){
                    const indTeacher = teacherItems.filter(s => s.id === leaveItems[t].addedBy)
                    values.push({...leaveItems[t], id: t, username: indTeacher[0].username, email: indTeacher[0].email})
                }
            }
            values = values.sort((a, b) => a.from > b.from ? 1 : -1)
            setTeacherLeaves(values)
        })
    }

    const getAdmins = () => {
        const adminRef = firebase.database().ref('users')
        let values = []
        adminRef.on('value', (snapshot) => {
            let admins = snapshot.val()
            for(let t in admins){
                if(admins[t].type === "admin" && admins[t].addedBy === sessionStorage.getItem("id")){
                    values.push({id: t, ...admins[t]})
                }
            }
            setAdminItems(values)
        })
    }

    const getComponent = () => {
        switch(step){
            case 1:
                return <ManagePerson name="Teacher" data={teacherItems} reload={getTeachers} />
            case 2:
                return <ManageTeacherLeaves data={teacherLeaves} reload={getLeaves} />
            case 3:
                return <ManagePerson name="Admin" data={adminItems} reload={getAdmins} />
        }
    }

    return (
        <div className="layoutContainer">
            <Sidebar>
                <ul>
                    <li className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>Manage Teachers</li>
                    <li className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>Teacher Leaves</li>
                    <li className={step === 3 ? 'active' : ''} onClick={() => setStep(3)}>Manage Admins</li>
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

export default Admin
