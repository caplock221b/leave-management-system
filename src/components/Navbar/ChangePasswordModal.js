import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomAlert from '../CustomAlert/CustomAlert'

const ChangePasswordModal = props => {
    const [values, setValues] = useState({
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
                type: 'error',
                message: 'Passwords do not match!'
            })
        }
        else{
            props.handleSubmit(values.password)
        }
    }

    return (
        <div className="modalContainer">
            <div className="modal">
                <span className="close" onClick={props.close}>x</span>
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <TextField 
                            type="password" 
                            label="New Password"
                            variant="outlined"
                            value={values.password}
                            onChange={e => setValues({ ...values, password: e.target.value })}
                            required
                        />
                    </div>
                    <div className="content">
                        <TextField 
                            type="password" 
                            label="Confirm New Password"
                            variant="outlined"
                            value={values.confirmPassword}
                            onChange={e => setValues({ ...values, confirmPassword: e.target.value })}
                            required
                        />
                    </div>
                    <div className="content">
                        <button className="btn add" type="submit">Save</button>
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

export default ChangePasswordModal
