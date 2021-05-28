import { Visibility } from '@material-ui/icons'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import { fullDate } from '../../util/functions'
import ViewLeaveModal from './ViewLeaveModal'
import firebase from '../../firebase'

const ManageStudentLeaves = props => {
    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'error',
        message: ''
    })
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    
    useEffect(() => {
        if(alert.isOpen){
            setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])

    const handleViewClick = data => {
        setModalData(data)
        setModalOpen(true)
    }

    const handleSubmit = (accept, comment) => {
        console.log(accept, comment);
        const id = modalData.id
        const leavesRef = firebase.database().ref(`/leaves/${id}`)
        leavesRef.update({
            status: accept ? "Accepted" : "Rejected",
            comment: comment
        }, err => {
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
                    message: 'Leave application updated successfully!',
                    type: 'success'
                })
            }
        })
        setModalData(null)
        setModalOpen(false)
        props.reload()
    }

    return (
        <div className="container">
            {
                props.data?.length ?
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Roll Number</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>From Date</TableCell>
                                <TableCell>To Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.data.map(i => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell>{i.roll}</TableCell>
                                            <TableCell>{i.email}</TableCell>
                                            <TableCell>{i.title}</TableCell>
                                            <TableCell>{fullDate(i.from)}</TableCell>
                                            <TableCell>{fullDate(i.to)}</TableCell>
                                            <TableCell>{i.status}</TableCell>
                                            <TableCell className="actions">
                                                <Visibility color="primary" onClick={() => handleViewClick(i)} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer> :
                <div className="center">Your students have not applied for any leaves yet!</div>
            }
            {
                modalOpen &&
                <ViewLeaveModal 
                    data={modalData} 
                    close={() => setModalOpen(false)} 
                    handleSubmit={(accept, val) => handleSubmit(accept, val)}
                />
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

export default ManageStudentLeaves
