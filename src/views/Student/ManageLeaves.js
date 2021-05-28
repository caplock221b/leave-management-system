import { Add, Visibility } from '@material-ui/icons'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import LeaveModal from './LeaveModal'
import firebase from '../../firebase'
import { fullDate } from '../../util/functions'

const ManageLeaves = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [leaves, setLeaves] = useState(null)

    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'error',
        message: ''
    })

    const getLeaves = () => {
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
            setLeaves(values)
        })
    }

    useEffect(() => {
        if(alert.isOpen){
          setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])

    useEffect(() => {
        getLeaves()
    }, [])

    const handleSubmit = payload => {
        console.log(payload);
        const leaveRef = firebase.database().ref('leaves')
        leaveRef.push({
            ...payload,
            status: 'Pending',
            addedBy: sessionStorage.getItem('id')
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
                    message: 'New Leave Application added successfully!'
                })
            }
            setModalData(null)
            setModalOpen(false)
        })
        getLeaves()
    }

    const handleAddLeaveClick = () => {
        setModalData(null)
        setModalOpen(true)
    }

    const handleViewClick = data => {
        setModalData(data)
        setModalOpen(true)
    }

    return (
        <div className="container">
            <button className="btn add" type="button" onClick={() => handleAddLeaveClick()}><Add /> <span>New Leave</span></button>
            {
                leaves?.length ?
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>From Date</TableCell>
                                <TableCell>To Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                leaves.map(i => {
                                    return (
                                        <TableRow key={i.id}>
                                            <TableCell>{i.title}</TableCell>
                                            <TableCell>{i.type}</TableCell>
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
                <div className="center">You haven't applied for any leaves yet!</div>
            }
            {
                modalOpen &&
                <LeaveModal data={modalData} close={() => setModalOpen(false)} handleSubmit={handleSubmit} />
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

export default ManageLeaves
