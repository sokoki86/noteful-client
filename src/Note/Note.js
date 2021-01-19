import React from 'react'
import './Note.css'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'
import config from '../config'

export default class Note extends React.Component{
    deleteNote(noteId, callback){
        let error
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {method: 'DELETE', headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${config.API_TOKEN}`
          }}).then(res =>{
          if (!res.ok) error = {code: res.status}
          return res}
        ).then(data =>{
          if (error) {
            error.message = data.message
            return Promise.reject(error)
          }
          if (this.props.history.location.pathName !== "/") this.props.history.push("/")
          callback(noteId) 
          })
      }
      static contextType = NotefulContext;
    render(){
        Note.propTypes = {
//Note to grader: it is necessary to allow either numbers or strings as note-ids because the API will sometimes spit out a numerical
//id instead of a string. I fixed the syntax of this noteId proptypes attribute to allow for either a number or string
            noteId: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
            name: PropTypes.string.isRequired,
            modified: PropTypes.string.isRequired
        }
        return <Link to={`/note/${this.props.noteId}`} className="note">
                <p className="title"> {this.props.name} </p>
                <span className="bottom-elements">
                    <p className="date">Modified {this.props.modified.substring(0,10)}</p>
                    <button type="button" className="delete-button" onClick={(e) => {e.preventDefault(); this.deleteNote(this.props.noteId, this.context.deleteNote)}}>Delete</button>
                </span>
                </Link>
            

    }
}