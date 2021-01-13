import React from 'react'

export default class FolderLoadError extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hasError: false, 
            errorString: ''
        }
    }
    static getDerivedStateFromError(error){
        return {hasError:true, errorString: error}
    }

    render(){
        if (this.state.hasError){
            return <h2 class="folder-section">{this.state.errorString.toString()}</h2>
        }
        return this.props.children
    }
}