import React from 'react'

export default class FormError extends React.Component{
    state = {
        hasError: false, 
        errorString:''
    }
    static getDerivedStateFromError(error){
        return {hasError : true, errorString: error}
    }
    render(){
        if (this.state.hasError) return <h2 class="add-note-button">{this.state.errorString.toString()}</h2>
    
    return this.props.children
}
}