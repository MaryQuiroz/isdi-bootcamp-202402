import { Alert } from 'flowbite-react'
import React from 'react'

export const AlertComponent = ({title, color}) => {
    const alertColor = {
        "blue":"info",
        "yellow":"warning",
        "red":"failure",
        "green": "succes"
    }
  return (
    <Alert color={alertColor[color]} >
    <span className="font-medium">{title}</span> 
  </Alert>
)
}