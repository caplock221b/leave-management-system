import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import StudentModal from '../StudentModal';
import firebase from '../../../firebase'
import CustomAlert from '../../../components/CustomAlert/CustomAlert';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

const ManageStudents = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [students, setStudents] = useState(null)

    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'error',
        message: ''
    })

    useEffect(() => {
        getStudents()
    }, [])
    
    useEffect(() => {
        if(alert.isOpen){
            setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])
    
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

    const handleSubmit = payload => {
        setModalOpen(false)
        delete payload.confirmPassword
        const userRef = firebase.database().ref('users')
        userRef.push({
            ...payload,
            type: 'student',
            addedBy: sessionStorage.getItem('id')
        }, (err) => {
            if(err){
                setAlert({
                    isOpen: true,
                    message: 'Something went wrong!',
                    type: 'error'
                })
            }
            else{
                setAlert({
                    isOpen: true,
                    message: 'New Student added succeefully!',
                    type: 'success'
                })
            }
        })
        getStudents()
    }

    useEffect(() => {
        console.log(students);
    }, [students])

    return (
        <div className="container">
            <button className="btn add" type="button" onClick={() => setModalOpen(true)}><Add /> <span>Add Student</span></button>
            {
                students?.length ?
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Roll Number</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                students.map(i => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell>{i.roll}</TableCell>
                                            <TableCell>{i.username}</TableCell>
                                            <TableCell>{i.email}</TableCell>
                                            <TableCell>{i.phone}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer> :
                <div className="center">You haven't added any Students yet!</div>
            }
            {
                modalOpen &&
                <StudentModal close={() => setModalOpen(false)} handleSubmit={handleSubmit} />
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

export default ManageStudents
