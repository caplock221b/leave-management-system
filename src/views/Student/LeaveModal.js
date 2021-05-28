import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomAlert from '../../components/CustomAlert/CustomAlert'

const LeaveModal = props => {
    const [values, setValues] = useState({
        title: props.data ? props.data.title : '',
        type: props.data ? props.data.type : '',
        from: props.data ? props.data.from : '',
        to: props.data ? props.data.to : '',
        description: props.data ? props.data.description : '',
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
        props.handleSubmit(values)
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
                            label="Title"
                            variant="outlined"
                            value={values.title}
                            onChange={e => setValues({ ...values, title: e.target.value })}
                            disabled={props.data ? true : false}
                            required
                        />
                        <FormControl variant="outlined">
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                required
                                labelId="type-label"
                                value={values.type}
                                disabled={props.data ? true : false}
                                onChange={e => setValues({ ...values, type: e.target.value })}
                                required
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
                            value={values.from}
                            onChange={e => setValues({ ...values, from: e.target.value })}
                            disabled={props.data ? true : false}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField 
                            type="date" 
                            label="To Date"
                            variant="outlined"
                            value={values.to}
                            onChange={e => setValues({ ...values, to: e.target.value })}
                            disabled={props.data ? true : false}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </div>
                    <div className="content">
                        <TextField 
                            multiline
                            rows={2}
                            rowsMax={8}
                            type="text" 
                            label="Description"
                            variant="outlined"
                            disabled={props.data ? true : false}
                            value={values.description}
                            onChange={e => setValues({ ...values, description: e.target.value })}
                            required
                        />
                    </div>
                    {
                        props.data && (props.data.status === "Accepted" || props.data.status === "Rejected") ?
                        <div className="content">
                            <TextField 
                                multiline
                                rows={2}
                                rowsMax={5}
                                type="text" 
                                label="Teacher's Comments"
                                variant="outlined"
                                disabled
                                value={props.data.comment}
                            />
                        </div> : null
                    }
                    {
                        props.data ? 
                        null : 
                        <div className="content">
                            <button className="btn add" type="submit">Apply</button>
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

export default LeaveModal
