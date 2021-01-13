  
import React from 'react'
import Note from '../Note/Note'
import './NoteView.css'
import NotefulContext from '../NotefulContext'

export default class NoteView extends React.Component{
    
    
static contextType = NotefulContext
    getNote(){
       return this.context.notes.find(current => current.id === Number(this.props.match.params.noteId))
    }

    render(){
    if (this.context.notes.length !==0){
    let currentNote = this.getNote()
    console.log(this.context)
   return  <section className="note-section">
            <Note history={this.props.history} name={currentNote.name} modified={currentNote.modified} noteId={currentNote.id} />
            <div className="note-contents">
                <p>{currentNote.content}</p>
            </div>
        </section>
    }else return <div></div>
}
}