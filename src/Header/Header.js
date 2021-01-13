import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default class Header extends React.Component{
    render(){
        return <header>
                    <Link to="/" style={{ textDecoration: 'none' }}><h1>Noteful</h1></Link>
               </header>
    }
}