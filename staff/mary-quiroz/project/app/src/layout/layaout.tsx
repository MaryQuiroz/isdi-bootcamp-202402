import React from 'react'
import { NavbarComponent } from '../components/Navbar'
import { FooterComponent } from '../components/Footer'

export const Layaout=({children}) =>{
  return (
    <>
    <NavbarComponent></NavbarComponent>
    {children}
    <FooterComponent></FooterComponent>
    </>
  )
}
