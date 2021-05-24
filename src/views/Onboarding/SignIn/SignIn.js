import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import image from '../../../assets/signin.svg'
import styles from './SignIn.module.css'

const SignIn = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        type: 'student'
    })

    const handleSubmit = e => {
        e.preventDefault()
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
                <button type="submit">Sign In</button>
            </form>
            <div className="image">
                <img src={image} alt="Sign in" />
            </div>
        </div>
    )
}

export default SignIn
