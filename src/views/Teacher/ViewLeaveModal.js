import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomAlert from '../../components/CustomAlert/CustomAlert'

const ViewLeaveModal = props => {
    const [values, setValues] = useState({
        comment: '',
        accept: false
    })

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

    const handleSubmit = e => {
        e.preventDefault()
        props.handleSubmit(values.accept, values.comment)
    }

    return (
        <div className="modalContainer">
            <div className="modal add-leave">
                <span className="close" onClick={props.close}>x</span>
                <h2>{props.data ? `View Leave Application` : `New Leave Application`}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <TextField 
                            type="text" 
                            label={`${props.data.roll ? "Roll Number" : "Username"}`}
                            variant="outlined"
                            value={props.data.roll ? props.data.roll : props.data.username}
                            disabled
                        />
                        <TextField 
                            type="text" 
                            label="Email"
                            variant="outlined"
                            value={props.data.email}
                            disabled
                        />
                    </div>
                    <div className="content">
                        <TextField 
                            type="text" 
                            label="Title"
                            variant="outlined"
                            value={props.data.title}
                            disabled
                        />
                        <FormControl variant="outlined">
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                required
                                labelId="type-label"
                                value={props.data.type}
                                disabled
                            >
                                <MenuItem value="">
                                    <em>Type</em>
                                </MenuItem>
                                <MenuItem value="Medical">Health</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Half-Day">Half-Day</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="content">
                        <TextField 
                            type="date" 
                            label="From Date"
                            variant="outlined"
                            value={props.data.from}
                            disabled
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField 
                            type="date" 
                            label="To Date"
                            variant="outlined"
                            value={props.data.to}
                            disabled
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                    <div className="content">
                        <TextField 
                            multiline
                            rowsMax={8}
                            type="text" 
                            label="Description"
                            variant="outlined"
                            disabled
                            value={props.data.description}
                        />
                    </div>
                    <div className="content">
                        <TextField 
                            multiline
                            rows={2}
                            rowsMax={5}
                            type="text" 
                            label="Comments By Teacher"
                            variant="outlined"
                            disabled={props.data.status === "Pending" ? false : true}
                            value={props.data.status === "Pending" ? values.comment : props.data.comment}
                            onChange={e => setValues({...values, comment: e.target.value})}
                            required
                        />
                    </div>
                    {
                        props.data.status === "Pending" &&
                        <div className="content">
                            <button className="btn add error" type="submit" onClick={() => setValues({...values, accept: false})}>Reject</button>
                            <button className="btn add success" type="submit"  onClick={() => setValues({...values, accept: true})}>Accept</button>
                        </div>
                    }
                </form>
            </div>
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

export default ViewLeaveModal
