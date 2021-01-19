import React from 'react'
import './AddFolder.css'
import NotefulContext from '../NotefulContext'
import config from '../config'


export default class AddFolder extends React.Component{
    static contextType = NotefulContext

    state = {
        name: {value: '', touched : false}, 
        errorString: '',
    }

    handleSubmit(e){
        e.preventDefault()
        let newFolder = JSON.stringify({name : this.state.name.value})
        fetch(`${config.API_ENDPOINT}/folders/`, {method: 'POST', headers: {"content-type": "application/json", "Authorization": `Bearer ${config.API_TOKEN}`}, body: newFolder })
        .then(res =>{ 
            if(!res.ok) {
                throw new Error('Something went wrong'); // throw an error
              }
               return res.json()
             
         }).then(data =>{
            this.context.addFolder(data)
            this.props.history.push("/")
        }).catch(error => {
            this.setState({...this.state, errorString: error.message})
        })
    }
    handleUpdateName = (name) => {
        let newName = {value: name, touched: true}
        this.setState({...this.state, name:newName})
    }
    validateName = () => {
        if (this.state.name.value === '') return <p className="error">Name is required</p>
        if (this.state.name.value.length < 3) return <p className="error">Folder Name must be at last 3 letters</p>
    }
    render(){
        if (this.state.errorString) throw new Error("Unable to create folder. Please try again later")
        return(
            <form className="folder-form" onSubmit ={e => this.handleSubmit(e)}>
                <h2>Add a folder</h2>
                <label htmlFor="folder-name">Folder Name (required)</label>
                <input id="folder-name" className="folder-name" type="text" onChange={(e) => this.handleUpdateName(e.target.value)}/>
                {this.state.name.touched && this.validateName()}
                <button disabled={this.validateName()} className="submit" type="submit">Submit</button>
            </form>
          
        )

    }
}