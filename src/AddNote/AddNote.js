import React from 'react'
import NotefulContext from '../NotefulContext'
import './AddNote.css'
import FormError from '../FolderError/FolderError'
import config from '../config'

export default class AddNote extends React.Component{
    state = {
        name: {value:'', touched: false}, 
        folderId: {value: this.context.folders[0] !== undefined ? this.context.folders[0].id : '', touched: false}, 
        content: {value:'', touched: false}, 
        errorString:''
    }

    static contextType = NotefulContext



    handleSubmit(e){
        let dateObject = new Date()
        let dateString = dateObject.toISOString()
        let newInput = JSON.stringify({name: this.state.name.value, folderId: this.state.folderId.value, content: this.state.content.value, modified: dateString})
        e.preventDefault()
        fetch(`http://localhost:8000/api/notes`, {method :'POST', headers : {"content-type" : "application/json", "Authorization": `Bearer ${config.API_TOKEN}`}, body: newInput}).then(
            res => {
                if (!res.ok){
                    throw new Error('Something went wrong, please try again later.')
            }
                return res.json()
            }
        ).then(data =>{
            this.context.addNote(data)
            this.props.history.push("/")
        }).catch(error => {
            this.setState({...this.state, errorString: error.message})
        })
    }

    handleTitleChange(title){
        let newName =  {value: title, touched: true}
        this.setState({
            ...this.state, name: newName
        })
    }
    handleFolderChange(folder){
        let newFolder =  {value: folder, touched: true}
        this.setState({
            ...this.state, folderId: newFolder
        })
    }
    handleContentChange(content){
        let newContent =  {value: content, touched: true}
        this.setState({
            ...this.state, content: newContent
        })
    }
    makeDropDown(){
       return this.context.folders.map(current => {
       return <option key={current.id} value={current.id}>{current.name}</option>}
        )
        
    }

    validateName(){
        if (this.state.name.value.length < 3) return <p className="error">Please enter a a name of at least 3 characters</p>
    }

    validateContent(){
        if (this.state.content.value.length < 10) return <p className="error">Please enter a note of at least 10 characters</p>
    }

    render(){
        if (this.state.errorString) throw new Error("Unable to submit form. Please try again later.")
        return(
            <FormError>
            <form className="add-note-button" onSubmit={(e) => this.handleSubmit(e)}>
            <h2>Create new note</h2>
            <label htmlFor="folder">Folder</label>
            <select onChange = {(e) => {this.handleFolderChange(e.target.value)}} id="folder">
                {this.makeDropDown()}
            </select>
            <label htmlFor="title">Note title</label>
            <input onChange = {(e) => this.handleTitleChange(e.target.value)} placeholder="Please write title here..." type="text" className="name" id="title"/>
            {this.state.name.touched && this.validateName()}
            <label htmlFor="content">Content</label>
            <textarea onChange = {(e) => this.handleContentChange(e.target.value)} placeholder="Please write note here..." className="content" id="content"></textarea>
            {this.state.content.touched && this.validateContent()}
            <button className="submit" disabled={this.validateContent()||this.validateName()} type="submit">Submit</button>
            <p className="error">{this.state.errorString}</p>
            </form>
            </FormError>
        )
    }
}