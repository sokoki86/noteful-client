import React from 'react'
import './FolderSectionNV.css'
import NotefulContext from '../NotefulContext'

export default class FolderSectionNV extends React.Component{
    static contextType = NotefulContext
    getFolderName(){
        console.log(this.context)
      let folderId =  this.context.notes.find(current => {
          console.log(typeof this.props.match.params.noteId)
            return current.id === Number(this.props.match.params.noteId)
        }).folderId
        let folder =  this.context.folders.find(current => {
            return current.id === folderId
        })
        return folder.name
    }
    render(){
        if (this.context.notes.length !== 0){
        let folderName = this.getFolderName()
        return <section className="folder-sectionnv">
            <button onClick={() => this.props.history.goBack()} className="back-button">
                Go back
            </button>
            <h2>
                {folderName}   
            </h2>
        </section>
        }else
        return <div></div>
    }
}