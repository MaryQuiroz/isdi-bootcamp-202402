import { Toast } from 'flowbite-react'
import React from 'react'

export const ToastComponent = ({ title }) => {
  return (
    <div
      className="fixed top-4 right-4 animate-slide-in-right"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
      }}
    >
      <Toast>
        <div className="ml-3 text-sm font-normal">{title}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  )
}