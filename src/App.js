import "./App.css";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import FolderSection from "./FolderSection/FolderSection";
import NoteView from "./NoteView/NoteView";
import NoteSection from "./NoteSection/NoteSection";
import FolderNavSection from "./FolderNavSection/FolderNav";
import NotefulContext from "./NotefulContext";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import FormError from './FormError/FormError'
import FolderLoadError from './FolderLoadError/FolderLoadError'
import NoteLoadError from './NoteLoadError/NoteLoadError'
import config from './config'
// import items from './dummy_store'

class App extends Component {
  state = {
    folders: [],
    notes: [],
    loadError: false,
  };

  deleteNote = (noteId) => {
    this.setState({
      ...this.state,
      notes: this.state.notes.filter((current) => current.id !== noteId),
    });
  };

  addFolder = (folder) => {
    let folders = [...this.state.folders, folder];
    this.setState({ ...this.state, folders });
  };

  addNote = (note) => {
    let notes = [...this.state.notes, note];
    this.setState({ ...this.state, notes });
  };
  getNotesAndFolders() {
    let error;
    console.log(config.API_TOKEN)
    fetch(`http://localhost:8000/api/folders`, {headers: {Authorization: `Bearer ${config.API_TOKEN}`}})
      .then((res) => {
        if (!res.ok) error = { code: res.status };
        return res.json();
      })
      .then((data) => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        this.setState({ ...this.state, folders: data });
      }).catch(error=>{
        this.setState({...this.state, folderLoadError: true})
      });
    fetch(`http://localhost:8000/api/notes`, {headers: {Authorization: `Bearer ${config.API_TOKEN}`}})
      .then((res) => {
        if (!res.ok) error = { code: res.status };
        return res.json();
      })
      .then((data) => {
        if (error) return Promise.reject(error);
        let newState = { ...this.state, notes: data };
        this.setState(newState);
      }).catch(error=>{
        this.setState({...this.state, noteLoadError: true})
      })
  }

  // componentDidUpdate(){
  // this.getNotesAndFolders()
  // }

  componentDidMount() {
    console.log(config)
    console.log(this.state)
    this.getNotesAndFolders();
  }

  component;
  render() {
    return (
      <NotefulContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          noteLoadError: this.state.noteLoadError,
          folderLoadError: this.state.folderLoadError,
          deleteNote: this.deleteNote,
          addFolder: this.addFolder,
          addNote: this.addNote,
        }}
      >
        <>
          <Header />
          <main>
            <Route exact path="/" render={(props) => <FolderLoadError><FolderSection {...props} /></FolderLoadError>} />
            <Route exact path="/" render={(props) => <NoteLoadError><NoteSection {...props} /></NoteLoadError>} />
            <Route exact path="/folder/:folderId" component={FolderSection} />
            <Route exact path="/folder/:folderId" component={NoteSection} />
            <Route exact path="/note/:noteId" component={FolderNavSection} />
            <Route exact path="/note/:noteId" component={NoteView} />
            <Route exact path="/add-folder" component={FolderSection} />
            <Route exact path="/add-folder" render={(props) => <FormError><AddFolder {...props} /></FormError>} />
            <Route exact path="/add-note" component={FolderSection} />
            <Route exact path="/add-note" render={(props) => <FormError><AddNote {...props} /></FormError>} />
          </main>
        </>
      </NotefulContext.Provider>
    );
  }
}
export default App;
