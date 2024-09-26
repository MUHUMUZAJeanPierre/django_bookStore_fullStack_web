// import React from "react";
import { useEffect, useState } from "react";
import "./EditNotePage.css"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditNotePage = ({updateNote}) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [body, setBody] = useState("")
  const navigate = useNavigate()

  const {slug} = useParams()
  const handleFetchNote = async()=>{
    await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/notes/${slug}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response)=>{
      setTitle(response.data.data.title);
      setCategory(response.data.data.category);
      setBody(response.data.data.body);
      // console.log("data once",response.data.data);
      

    }).catch((err)=>{
      console.log(err.message)
    });
  }

  useEffect(()=>{
    handleFetchNote()
  }, [slug]);

  const updateNoteObject = {
      title: title,
      body: body,
      category: category
  }
  const handleUpdateNote = async (e)=>{
    e.preventDefault()
    if(!title && !body && !category) return; 
    await updateNote(updateNoteObject, slug);
    navigate(`/note/${slug}`)
   
  }
  return (
    <form>
      <h5>Edit New Note</h5>
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

        


      <button onClick={handleUpdateNote} className="btn btn-primary d-flex justify-content-center" style={{width:"100%"}}>Edit Note</button>
    </form>
  );
};

export default EditNotePage;
 