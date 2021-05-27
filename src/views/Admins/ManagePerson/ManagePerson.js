import React, { useEffect, useState } from 'react'
import styles from './ManagePerson.module.css'
import firebase from '../../../firebase'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import PersonModal from '../PersonModal/PersonModal'
import { Delete, Edit } from '@material-ui/icons'
import CustomAlert from '../../../components/CustomAlert/CustomAlert'

const AddPerson = props => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [teacherItems, setTeacherItems] = useState(null)
    const [adminItems, setAdminItems] = useState(null)

    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'error',
        message: ''
    })
    
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

    useEffect(() => {
        if(alert.isOpen){
          setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])


    useEffect(() => {
        if(props.name === 'Teacher'){
          getTeachers()  
        }
        else{
            getAdmins()
        }
    }, [props.name])

    const handleAddPersonClick = () => {
        setModalData(null)
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handleSubmit = payload => {
        if(modalData === null){
            setModalData(null)
            setModalOpen(false)
            const userRef = firebase.database().ref('users')
            const newUser = {
                username: payload.username,
                password: payload.password,
                type: props.name === "Teacher" ? 'teacher' : 'admin',
                addedBy: sessionStorage.getItem("id")
            }
            userRef.push(newUser, err => {
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
                        message: `New ${props.name} added successfully!`
                    })
                }
            })
            if(props.name === "Teacher"){
                getTeachers()
            }
            else{
                getAdmins()
            }
        }
        else{
            setModalData(null)
            setModalOpen(false)
            const userRef = firebase.database().ref(`/users/${payload.id}`)
            userRef.update({
                password: payload.password
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
                        message: `Password updated successfully!`
                    })
                }
            })
            if(props.name === "Teacher"){
                getTeachers()
            }
            else{
                getAdmins()
            }
        }
    }

    const handleEditClick = user => {
        setModalData({ ...user })
        setModalOpen(true)
    }

    const handleDeleteClick = id => {
        const userRef = firebase.database().ref(`/users/${id}`)
        userRef.remove(err => {
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
                    message: `${props.name} deleted successfully!`
                })
            }
        })
        if(props.name === "Teacher"){
            getTeachers()
        }
        else{
            getAdmins()
        }
    }

    return (
        <div className={styles.container}>
            <button className={"btn " + styles.add} type="button" onClick={handleAddPersonClick}>Add {props.name}</button>
            {
                props.name === "Teacher" && teacherItems?.length ?
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                teacherItems.map(i => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell>{i.id}</TableCell>
                                            <TableCell>{i.username}</TableCell>
                                            <TableCell>{i.password}</TableCell>
                                            <TableCell className="actions">
                                                <Edit color="primary" onClick={() => handleEditClick(i)} />
                                                <Delete color="error" onClick={() => handleDeleteClick(i.id)} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer> :
                props.name === "Admin" && adminItems?.length ?
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                adminItems.map(i => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell>{i.id}</TableCell>
                                            <TableCell>{i.username}</TableCell>
                                            <TableCell>{i.password}</TableCell>
                                            <TableCell className="actions">
                                                <Edit color="primary" onClick={() => handleEditClick(i)} />
                                                <Delete color="error" onClick={() => handleDeleteClick(i.id)} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer> :
                <div className={styles.center}>You haven't added any {props.name}s yet!</div>
            }
            {
                modalOpen &&
                <PersonModal name={props.name} data={modalData} handleSubmit={handleSubmit} close={handleModalClose} />
            }
            {
                alert.isOpen &&
                <CustomAlert
                    isOpen={alert.isOpen}
                    message={alert.message}
                    type={alert.type}
                />
            }
        </div>
    )
}

export default AddPerson
