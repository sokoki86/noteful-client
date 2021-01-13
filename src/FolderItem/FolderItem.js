import React from 'react'
import './FolderItem.css'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class FolderItem extends React.Component{
    render(){
        FolderItem.propTypes = {
            noteId: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
            name: PropTypes.string.isRequired,
        }
        let URL = `/folder/${this.props.folderId}`
        return <NavLink to={URL}  className="folder">
        {this.props.name}
        </NavLink>
    }
}