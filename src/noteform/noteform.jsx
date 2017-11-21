import React, {Component} from 'react';
import './noteform.css';

class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            newNoteContent:'',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }
    handleUserInput(e){
        this.setState({
            newNoteContent:e.target.value,
        })
    }
    
    writeNote(){
        //write method to handle the placing of new notes
        
        this.props.addNote(this.state.newNoteContent);
        
        //empty the textbox when done
        this.setState({
            newNoteContent:'',
        })
    }
    
    render(){
        return(
            <div className="formWrapper">
            <input className="noteInput" placeholder="Write a Note" value={this.state.newNoteContent}
            onChange={this.handleUserInput}
            />
            <button className="noteButton" onClick={this.writeNote}>Add Note</button>
            </div>
            )
    }
}
export default NoteForm;