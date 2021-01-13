import React from "react";
import FolderItem from '../FolderItem/FolderItem'
import './FolderSection.css'
import NotefulContext from '../NotefulContext'
import {Link} from 'react-router-dom'

export default class FolderSection extends React.Component {
    static contextType = NotefulContext
  makeFolders() {
    return this.context.folders.map((current, index) => {
      return (
        <FolderItem  key={index} folderId={current.id} name={current.name} />
      );
    });
  }

  render() {
    if (this.context.folderLoadError) throw new Error("Unable to load folders. Please try again later")
    return (
    <section className="folder-section">
        {this.makeFolders()}
        <Link to="/add-folder" className="add-folder">
          Add Folder       
        </Link>
        </section>
    )}
}