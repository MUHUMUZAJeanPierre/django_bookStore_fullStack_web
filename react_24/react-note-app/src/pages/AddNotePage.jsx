// import React from "react";
import axios from "axios";
import "./AddNotePage.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNotes = ({addNote}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [category, setCategory] = useState("")
    const navigate = useNavigate()
    const newNote = {
        title: title,
        body: body,
        category: category
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!title && !category && !body){
            return;
        }
        console.log(newNote);
        navigate("/")
        addNote(newNote)
        // await axios({
        //     method: "post",
        //     url:"http://127.0.0.1:8004/api/notes/",
        //     data: newNote,
        //     headers:{
        //         'Content-Type': 'application/json'
        //     }
        // }).then((response)=>{
        //     console.log(response);
        //     setTimeout(()=>{
        //         setTitle("")
        //         setBody("")
        //         setCategory("")
        //         navigate('/')
        //     },2000)
        //     alert("Note created successfully")
        // }).catch((error)=>{
        //     console.log(error);
        //     alert("Failed to create note")
        // })
    }
  return (
    <form onSubmit={handleSubmit}>
      <h5>Add New Note</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter note's title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Body
        </label>
        <textarea
          value={body}
          onChange={(e)=>setBody(e.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
        ></textarea>
      </div>

      <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Notes category
        </label>
      <select value={category} onChange={(e)=>setCategory(e.target.value)} className="form-select" aria-label="Default select example" style={{height: "40px"}}>
          <option value="" selected>Pick a category</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>

        


      <button className="btn btn-primary d-flex justify-content-center" style={{width:"100%"}}>Add Note</button>
    </form>
  );
};

export default AddNotes;
 