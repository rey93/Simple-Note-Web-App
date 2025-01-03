import React from 'react';
import { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Formulario.scss'


function Formulario({ subject, text, onSearch, handleChangeSubjet, handleChangeText, handleAddTask, error }) {
    
    const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal
    const [searchValue, setSearchValue] = useState('');

    const handleShow = () => setShowModal(true);  // Mostrar modal
    const handleClose = () => setShowModal(false);  // Cerrar modal

    const handleChangeSearch = (event) => {
    
      const value = event.target.value;
      setSearchValue(value); // Actualiza el valor del input de búsqueda
      onSearch(value); // Llama a onSearch inmediatamente con el valor actual
      
    }

    return (

            <div className="options-container">  
                
                <div className=''> 
                
                <button  className='button-options' onClick={handleShow}>
                +
                </button>

                </div>
                <form className='search-form' role="search">
                  <label className='label-search' htmlFor="search">Search for stuff</label>
                  <input 
                    id="search" 
                    type="search"
                    value={searchValue}
                    onChange={handleChangeSearch} 
                    placeholder="Search..." 
                    autoFocus required />
                  <button className='button-search'>Go</button>    
                </form>
                 

                    <Modal show={showModal} onHide={handleClose} animation={true}>
                      <Modal.Header closeButton>
                        <Modal.Title>New Note</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                          <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">Subjet:</label>
                            <input type="text"  
                                className="form-control" 
                                id="recipient-name"
                                value={subject}  
                                placeholder="Write something"
                                onInput={handleChangeSubjet}  />
                          </div>
                          <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label">Text:</label>
                            <textarea 
                                className="form-control" 
                                id="message-text"
                                value={text}
                                onChange={handleChangeText}
                                placeholder="Write something more"
                                >
                            </textarea>
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleAddTask}>
                          Add Note
                        </Button>
                        
                      </Modal.Footer>
                      {error && <p>{error}</p>}
                    </Modal>
        </div>
    );
}

export default Formulario;