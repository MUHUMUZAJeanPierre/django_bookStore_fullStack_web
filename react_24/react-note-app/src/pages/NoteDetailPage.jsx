import "./NoteDetailPage.css";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Modal from "../components/Modal";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormatDate } from "../components/FormatDate";
const NoteDetailPage = ({deleteNote}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleIsOpen = ()=>{
    setIsOpen(!isOpen);
    console.log('clicked');
    
  }
  const { slug } = useParams();
  console.log("slug", slug);
  const [note, setNote] = useState({});
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/notes/${slug}`)
    .then(res =>{
        setNote(res.data.data)
        
    })
    .catch(err => {
        console.log(err.message)
    })
  })

  return (
    <>
      <div className="note-container">
        <h3 className="title">{note.title || "Note Title"}</h3>
        <span className="d-flex justify-content-center">
          <p className="note-date font-12 text-muted me-5">created: {FormatDate(note.created) || "Unknown"}</p>
          <p className="note-date font-12 text-muted me-5">last updated: {FormatDate(note.updated) || "Unknown"}</p>
        </span>
        <span className="button-group">
          <Link to={`/edit-note/${slug}`}>
            <button className="btn btn-primary">
              <FiEdit />
              <span>Edit</span>
            </button>
          </Link>
          <button onClick={handleIsOpen} className="btn btn-danger">
            <BiSolidTrashAlt />
            <span  >Delete</span>
          </button>
        </span>
        <p className="description">
          {note.body || "No description available."}
        </p>
      </div>
      {isOpen && <Modal handleIsOpen={handleIsOpen} deleteNote={()=>deleteNote(slug)} />}
    </>
  );
};

export default NoteDetailPage;
