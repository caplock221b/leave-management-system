import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomAlert from '../../components/CustomAlert/CustomAlert'

const PersonModal = props => {
    const [values, setValues] = useState({
        username: props.data ? props.data.username : '',
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
        if(values.password === values.confirmPassword){
            props.handleSubmit({...props.data, ...values})
        }
        else{
            setAlert({
                isOpen: true,
                message: 'Passwords do not match!',
                type: 'error'
            })
        }
    }
    
    return (
        <div className="modalContainer">
            <div className="modal">
                <span className="close" onClick={props.close}>x</span>
                <h2>{props.data ? `Edit ${props.name}` : `Add ${props.name}`}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <TextField 
                            type="text" 
                            label="Username"
                            variant="outlined"
                            value={values.username}
                            onChange={e => setValues({ ...values, username: e.target.value })}
                            disabled={props.data ? true : false}
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
                    </div>
                    <div className="content">
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
                        <button className="btn" type="submit">Save</button>
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

export default PersonModal
