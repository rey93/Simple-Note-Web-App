import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Formulario from "./components/Formulario";
import NuevasNotas from "./components/NuevasNotas";
import { Image } from "react-bootstrap";
import './App.scss'
import { v4 as uuidv4 } from 'uuid';
import logo from './assets/logo1.png'
const URL = "http://localhost:3002/notes"


function App() {

  const [notes, setNotes] = useState([])  

  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const [showModal, setShowModal] = useState(false);

  const[subjet, setSubjet] = useState('')
  const[text, setText] = useState('')
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [isFound, setIsFound] = useState(false);

  const[error, setError] = useState(null)
  const[error2, setError2] = useState(null)

  const [editing, setEditing] = useState(null);
  const [view, setView] = useState(null);

  const [editedtext, setEditedText] = useState('');
  const [editedsubjet, setEditedSubjet] = useState('');

  const [viewtext, setViewText] = useState('');
  const [viewsubjet, setViewSubjet] = useState('');


  const handleChangeText =(e) =>{
      e.preventDefault()
      setText(e.target.value)
  }
  const handleChangeSubjet =(e) =>{
    const value = e.target.value;
    if (value.length <= 30) { // Limitar a 50 caracteres
        setSubjet(value);
    }
  }

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (text == '' && subjet == ''){
        setError('No se pueden agregar asuntos y notas vacias')
    } else if (subjet == ''){
        setError('No se pueden agregar asuntos vacios')
    }else if (text == '') {
        setError('No se pueden agregar notas vacias')
    }else{
        

        const noteObject = {
        subjet: subjet.trim(), // Eliminar espacios en blanco al inicio y al final
        text: text,
        id: uuidv4() // Generar un ID único
        };

        axios
        .post(URL, noteObject)
        .then(response => {
            console.log(response)
            setNotes(notes.concat(noteObject));
            setSubjet('');
            setText('');
            setError('');
        })
        .catch(error => {
            console.error("Error al agregar la nota:", error);
            setError("Error al agregar la nota")
          });
        }
  };

  
  const handleDelete = (id) =>{
    console.log(id);
    
    // Preguntar al usuario si realmente quiere eliminar el contacto
    if (window.confirm("¿Do you want delet this note?")) {
        try {
            // Realizar la solicitud DELETE
            axios.delete(`${URL}/${id}`)
                .then(() => {
                    // Actualizar el estado local para eliminar la persona
                    setNotes(notes.filter(nota => nota.id !== id));
                    console.log('Dato eliminado con éxito');
                })
                .catch(error => {
                    console.error("Error al eliminar la persona:", error);
                });
        } catch (error) {
            console.error("Error al intentar eliminar la persona:", error);
        }
    } else {
        return; // Salir de la función si el usuario cancela
    }
  }

  const handleEdit = (id) => {
    // Buscar la nota correspondiente al ID
    const noteToEdit = notes.find(note => note.id === id);
    
    if (noteToEdit) {
        // Establecer el índice de edición
        setEditing(id); // O simplemente puedes usar el ID si lo prefieres
        // Establecer el texto y asunto editados desde la nota encontrada
        setEditedText(noteToEdit.text);
        setEditedSubjet(noteToEdit.subjet);
        // Mostrar el modal para editar
        setShowModal(true);
    } else {
        console.error("Nota no encontrada");
    }
};

const handleView = (id) => {
    // Buscar la nota correspondiente al ID
    const noteView = notes.find(note => note.id === id);
    
    if (noteView) {
        // Establecer el índice de edición
        setView(id); // O simplemente puedes usar el ID si lo prefieres
        // Establecer el texto y asunto editados desde la nota encontrada
        setViewText(noteView.text);
        setViewSubjet(noteView.subjet);
        // Mostrar el modal para editar
        setShowModal(true);
    } else {
        console.error("Nota no encontrada");
    }
};


  const handleSaveEdit = () => {
    // Validaciones
    if (editedsubjet === '') {
        setError2('No se pueden agregar asuntos vacíos');
        return;
    } 
    if (editedtext === '') {
        setError2('No se pueden agregar notas vacías');
        return;
    }
    // Crear un nuevo objeto de nota
    const updatedNote = {
        id: editing,
        subjet: editedsubjet.trim(),
        text: editedtext
    };
    // Actualizar la nota en el servidor
    axios
        .put(`${URL}/${updatedNote.id}`, updatedNote) // Usar PUT para editar
        .then(response => {
            console.log(response);
            // Actualizar la lista de notas en el estado local
            const updatedNotes = notes.map(note => 
                note.id === updatedNote.id ? updatedNote : note
            ); // Reemplazar la nota editada por ID
            setNotes(updatedNotes);
            
            // Limpiar los campos y el estado de edición
            setSubjet('');
            setText('');
            setEditing(null);
            setError2(''); // Limpiar errores
        })
        .catch(error => {
            console.error("Error al editar la nota:", error);
            setError2("Error al editar la nota"); // Ajustar el mensaje de error
        });
};


  const handleCancelEdit = () =>{
      setEditing(null);
      setEditedText('');
      setEditedSubjet('');
  }

  const handleSearch = (term) => {
    setSearchTerm(term); // Actualiza el término de búsqueda
    

    // Filtrar las notas basadas en el término de búsqueda
    const results = notes.filter(nota =>
      nota.subjet.toLowerCase().includes(term.trim().toLowerCase()) || 
      nota.text.toLowerCase().includes(term.trim().toLowerCase())
    );

    // Actualizar el estado con los resultados filtrados
    setFilteredNotes(results);
    setIsFound(true)
    
  };

        return (
              <div className="main-section">

                  <div className="app-name">
                  <Image src={logo} className="logo-img" fluid alt="Logo" />
                    <h1>Simple Note</h1>
                  </div>

                  <div className="container-sections">

                    <div className="section-1">
                        <Formulario 
                        subjet={subjet}
                        text={text}
                        onSearch={handleSearch}
                        handleChangeSubjet={handleChangeSubjet}
                        handleChangeText={handleChangeText}
                        handleAddTask={handleAddTask}
                        error={error}
                        />
                    </div>

                    <div className="notes-container">

                    {!isFound ? 
                        <NuevasNotas 
                        editedsubjet={editedsubjet}
                        editedtext={editedtext}
                        showModal={showModal}
                        handleSaveEdit={handleSaveEdit}
                        handleCancelEdit={handleCancelEdit}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleView = {handleView}
                        editing={editing}
                        view={view}
                        notes={notes}
                        setEditedSubjet={setEditedSubjet}
                        setEditedText={setEditedText}
                        error2={error2}
                        />
                    :
                        <div className="notes-box">
                            {
                                filteredNotes.map(notas => (
                                    <div key={notas.id} className='note-size'>
                                    <h4>{notas.subjet}</h4>
                                    <span>{notas.text && notas.text.substring(0, 130)}</span>
                                    <div className='button-notas'>
                                            <button onClick={() => handleDelete(notas.id)} className='action-button action-button--archive'>
                                            <svg width="24" height="24" fill="white">
                                                <title>Delete</title>
                                                <path class="action-button__path action-button__path--lid" d="M10 5h4a2 2 0 1 0-4 0ZM8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-9.57H19 5h1.07-3.32a.75.75 0 0 1 0-1.5H8.5Z" />
                                                <path class="action-button__path action-button__path--can" d="M8.5 6.5h11.43L18.76 18.611A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H8.5Zm2 3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576l1.158 11.967Z"/>
                                            </svg>
                                            </button>
                                            <button onClick={() => handleEdit(notas.id)} className='action-button action-button--archive'>
                                            <svg class="icon icon-edit" height="24" fill="white" width="24" > 
                                            <path class="action-button__path action-button__path--pencil" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>                                    
                                            <path class="action-button__path action-button__path--eraser" d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                            </svg>
                                            </button>
                                         </div>
                                    </div>
                                ))
                                }
                        </div>
                     }
                    </div>
                  </div>
            </div>
        )
}
export default App; 