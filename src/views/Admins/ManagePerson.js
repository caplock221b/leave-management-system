import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Add, Delete, Edit, PortraitSharp } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import firebase from '../../firebase'
import PersonModal from './PersonModal'

const AddPerson = props => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

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
                email: payload.email,
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
            props.reload()
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
            props.reload()
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
        props.reload()
    }

    return (
        <div className="container">
            <button className={"btn " + " add"} type="button" onClick={handleAddPersonClick}><Add /> <span>Add {props.name}</span></button>
            {
                props.data?.length ?
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.data.map(i => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell>{i.id}</TableCell>
                                            <TableCell>{i.username}</TableCell>
                                            <TableCell>{i.email}</TableCell>
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
                <div className="center">You haven't added any {props.name}s yet!</div>
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
