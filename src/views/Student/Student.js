import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

const Student = () => {
    const history = useHistory()

    useEffect(() => {
        if(sessionStorage.getItem("type") !== "student"){
            history.push('/')
        }
    }, [])

    return (
        <div>
            In Student View
        </div>
    )
}

export default Student
