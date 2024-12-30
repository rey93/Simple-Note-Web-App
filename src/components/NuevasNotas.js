import React from 'react';
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NuevasNotas.scss'

function NuevasNotas({editedsubjet,editedtext, showModal, handleSaveEdit, handleCancelEdit,
    handleDelete, handleEdit, editing, notes, setEditedSubjet, setEditedText, error2}) {
    
    
    const handleClose = () => showModal = false;  // Cerrar modal
        return (
            <div className='notes-box'>
                         {
                             notes.map(nota => (
                             <div className='note-size' key={nota.id}>
                                
                                 {editing === nota.id ? (
                                    
                                    <Modal show={showModal} onHide={handleClose} animation={true}>
                                        <Modal.Header>
                                            <Modal.Title>New Note</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form>
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Asunto:</label>
                                                <input type="text"  
                                                    className="form-control" 
                                                    id="recipient-name"
                                                    value={editedsubjet}  
                                                    placeholder="Write something"
                                                    onChange={(e) => setEditedSubjet(e.target.value)}  
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="message-text" className="col-form-label">Texto:</label>
                                                <textarea 
                                                    className="form-control" 
                                                    id="message-text"
                                                    value={editedtext}
                                                    onChange={(e) => setEditedText(e.target.value)}
                                                    placeholder="Escriba su nota aqui"
                                                    >
                                                </textarea>
                                            </div>
                                            </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCancelEdit}>
                                            Close
                                            </Button>
                                            <Button variant="primary" onClick={handleSaveEdit}>
                                            Save Note
                                            </Button>
                                            
                                        </Modal.Footer>
                                        {error2 && <p>{error2}</p>}
                                    </Modal>
                                 ) :(
                                     <div>
                                         <h4>{nota.subjet || "Sin Asunto"}</h4>

                                         <span>{(nota.text && nota.text.substring(0, 150)) || "Sin Texto"}</span>
                                         <div className='button-notas'>
                                            <button onClick={() => handleDelete(nota.id)} className='action-button action-button--archive'>
                                            <svg width="24" height="24" fill="white">
                                                <title>Delete</title>
                                                <path className="action-button__path action-button__path--lid" d="M10 5h4a2 2 0 1 0-4 0ZM8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-9.57H19 5h1.07-3.32a.75.75 0 0 1 0-1.5H8.5Z" />
                                                <path className="action-button__path action-button__path--can" d="M8.5 6.5h11.43L18.76 18.611A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H8.5Zm2 3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576l1.158 11.967Z"/>
                                            </svg>
                                            </button>
                                            <button onClick={() => handleEdit(nota.id)} className='action-button action-button--archive'>
                                            <svg className="icon icon-edit" height="24" fill="white" width="24" > 
                                            <path className="action-button__path action-button__path--pencil" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>                                    
                                            <path className="action-button__path action-button__path--eraser" d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                            </svg>
                                            </button>
                                         </div>
                                     </div>
                                 )}
                             </div>
                             ))
                         }
            </div>
        );
    }
    
    export default NuevasNotas;