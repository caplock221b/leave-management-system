import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomAlert from '../../components/CustomAlert/CustomAlert'

const StudentModal = props => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        phone: '',
        roll: '',
        password: '',
        confirmPassword: ''
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
        if(values.password !== values.confirmPassword){
            setAlert({
                isOpen: true,
                message: 'Passwords do not match!',
                type: 'error'
            })
        }
        else{
            props.handleSubmit(values)
        }
    }

    return (
        <div className="modalContainer">
            <div className="modal add-student">
                <span className="close" onClick={props.close}>x</span>
                <h2>Add Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <TextField 
                            type="tel" 
                            label="Roll Number"
                            variant="outlined"
                            value={values.roll}
                            inputProps={{ maxLength: 5 }}
                            onChange={e => setValues({ ...values, roll: e.target.value })}
                            required
                        />
                        <TextField 
                            type="text" 
                            label="Username"
                            variant="outlined"
                            value={values.username}
                            onChange={e => setValues({ ...values, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="content">
                        <TextField 
                            type="email" 
                            label="Email"
                            variant="outlined"
                            value={values.email}
                            onChange={e => setValues({ ...values, email: e.target.value })}
                            required
                        />
                        <TextField 
                            type="tel" 
                            label="Phone Number"
                            variant="outlined"
                            inputProps={{ maxLength: 10 }}
                            value={values.phone}
                            onChange={e => setValues({ ...values, phone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="content">
                        <TextField 
                            type="password" 
                            label="Password"
                            variant="outlined"
                            value={values.password}
                            onChange={e => setValues({ ...values, password: e.target.value })}
                            required
                        />
                        <TextField 
                            type="password" 
                            label="Confirm Password"
                            variant="outlined"
                            value={values.confirmPassword}
                            onChange={e => setValues({ ...values, confirmPassword: e.target.value })}
                            required
                        />
                    </div>
                    <div className="content">
                        <button className="btn add" type="submit">Add</button>
                    </div>
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

export default StudentModal
