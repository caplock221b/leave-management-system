import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import image from '../../../assets/signin.svg'
import CustomAlert from '../../../components/CustomAlert/CustomAlert'
import styles from './SignIn.module.css'
import firebase from '../../../firebase'
import { useHistory } from 'react-router'

const SignIn = () => {
    const history = useHistory()
    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'error',
        message: ''
    })

    const [values, setValues] = useState({
        username: '',
        password: '',
        type: 'student'
    })

    useEffect(() => {
        if(alert.isOpen){
          setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])


    const handleSubmit = e => {
        e.preventDefault()
        const userRef = firebase.database().ref('users')
        userRef.on('value', (snapshot) => {
            let users = snapshot.val()
            for(let user in users){
                if(users[user].username === values.username && users[user].password === values.password && users[user].type === values.type){
                    sessionStorage.setItem("id", user)
                    sessionStorage.setItem("type", users[user].type)
                    return history.push(`/${users[user].type}`)
                }
            }
            setAlert({
                isOpen: true,
                message: 'User with the given username and password does not exist!',
                type: 'error'
            })
        })
    }

    return (
        <div className={styles.signInContainer}>
            <form onSubmit={handleSubmit} className={styles.signInWrapper} autoComplete="off" >
                <div className={styles.title}>Sign In</div>
                <TextField 
                    type="text" 
                    label="Username"
                    variant="outlined"
                    value={values.username}
                    onChange={e => setValues({ ...values, username: e.target.value })}
                    required
                />
                <TextField 
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={values.password}
                    onChange={e => setValues({ ...values, password: e.target.value })}
                    required
                />
                <FormControl variant="outlined">
                    <InputLabel id="type">I am a</InputLabel>
                    <Select
                        labelId="type"
                        id="type"
                        value={values.type}
                        onChange={e => setValues({ ...values, type: e.target.value })}
                        label="I am a"
                    >
                        <MenuItem value="">
                            <em>I am a</em>
                        </MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <button className="btn" type="submit">Sign In</button>
            </form>
            <div className="image">
                <img src={image} alt="Sign in" />
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

export default SignIn
