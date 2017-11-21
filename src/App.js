import React, { Component } from 'react';
//import logo from './logo.svg';
import Note from './note/note.jsx';
import NoteForm from './noteform/noteform.jsx';
import { DB_CONFIG } from './config/config.js';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this)
    this.removeNote = this.removeNote.bind(this)
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');
    //seting up the react state of our component
    this.state = {
      notes:[],
    }
    
  }
componentWillMount(){
  const previousNotes = this.state.notes;

//DataSnapshot
  this.db.on('child_added',snap => {
    previousNotes.push({
      id: snap.key,
      noteContent: snap.val().noteContent,
    })
    this.setState({
      notes:previousNotes,
    })
  })
 
 this.db.on('child_removed', snap =>{
  for(var i=0; i<previousNotes.length; i++){
    if(previousNotes[i].id === snap.key){
      previousNotes.splice(i,1);
    }
  }
    this.setState({
      notes:previousNotes
    })

})
}

  addNote(note){
    console.log(note)
    this.db.push().set({
      noteContent:note
    })
  }
  removeNote(noteId){
     console.log("from the parent: " + noteId);
    this.db.child(noteId).remove();
  }
  
  
  
  
  
  render() {
    return (
    <div className="noteContainer">
    <div className="noteHeader">
      <div className="heading"> React Todo App</div>
    </div>
    <div className="noteBody">
    
    {
      this.state.notes.map((note) =>{
        return(
         <Note noteContent={note.noteContent}
          noteID={note.id}
           key={note.id}
            removeNote={this.removeNote}/>
        )
      }
      
      )
    }
    
    
    
   
    </div>
    <div className="noteFooter">
    <NoteForm addNote={this.addNote}/>
    </div>
    </div>
    );
  }
}

export default App;
