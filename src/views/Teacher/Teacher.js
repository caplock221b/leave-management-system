import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

const Teacher = () => {
    const history = useHistory()

    useEffect(() => {
        if(sessionStorage.getItem("type") !== "teacher"){
            history.push('/')
        }
    }, [])

    return (
        <div>
            In Teacher View
        </div>
    )
}

export default Teacher
