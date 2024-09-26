import React from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

const Modal = ({ handleIsOpen, deleteNote }) => {
  const navigate = useNavigate()
  const handleDeleteNote = async()=>{
    await deleteNote()
    navigate("/")

    
  }
  
  return (
    <div className="c-modal-overlay">
      <div className="c-modal">
        {/* Close button should trigger the onClose function */}
        <button className="close-button" onClick={handleIsOpen}>×</button>
        <div className="c-modal-content">
          <h2>Delete Note</h2>
          <p>Are you sure you want to delete this note?</p>
          <div className="d-flex justify-content-center">
            {/* Delete button triggers onDelete */}
            <button className="btn btn-danger me-3" onClick={handleDeleteNote} >
              Delete
            </button>
            {/* Cancel button triggers onClose */}
            <button className="btn btn-primary" onClick={handleIsOpen}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
