// import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// import Filter from './components/Filter'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import AddNotePage from './pages/AddNotePage'
import NoteDetailPage from './pages/NoteDetailPage'
import EditNotePage from './pages/EditNotePage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Modal } from 'bootstrap'

const App = () => {

  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  // filtering new depending on the category
  const [filterText, setFilterText] = useState("")
  const handleFilterText = (val)=>{
    setFilterText(val)
  }
  // searching
  const handleSearchText = (val)=>{
    setSearchText(val)
  }

  useEffect(() => {
    if (searchText.length < 3) return; // Uncomment if needed
    axios.get(`http://127.0.0.1:8000/api/notes-search/?search=${searchText}`)
      .then((response) => {
        console.log("new response",response.data);
        setNotes(response.data.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchText]);
  

  const filteredNotes = 
  filterText === "BUSINESS" 
    ? notes.filter(note => note.category === "BUSINESS") 
    : filterText === "PERSONAL" 
    ? notes.filter(note => note.category === "PERSONAL") 
    : filterText === "IMPORTANT" 
    ? notes.filter(note => note.category === "IMPORTANT") 
    : notes;


  const handleFetch = async() =>{
    setIsLoading(true)
    await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/notes/',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      setNotes(res.data.data)
      setIsLoading(false)
    }).catch((error)=>{
      console.log(error);
      setIsLoading(false)
      
    })
  }
useEffect(()=>{
  handleFetch()
}, [])

const addNote = async(data)=>{
  axios.post('http://127.0.0.1:8000/api/notes/',data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response)=>{
    toast.success("a new note has been added")
    setNotes([...notes, data])
}
  )
  .catch((error)=>{
    console.log(error)
    toast.error("failed to add new note")
  }
  )
}


const updateNote = async (data, slug)=>{
  await  axios.put(`http://127.0.0.1:8000/api/notes/${slug}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response)=>{
    toast.success("note updated successfully")
    // console.log("Note updated successfully",response.data);
  }).catch((err)=>{
    toast.error("Failed to update note")
    console.log(err.message)
  });
}


const deleteNote = async(slug)=>{
  await  axios({
    method: 'DELETE',
    url: `http://127.0.0.1:8000/api/notes/${slug}`,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response)=>{
    toast.success("Note deleted successfully")
    // shows the remaining notes in database
    setNotes(notes.filter(note => note.slug !== slug))
  }).catch((error)=>{
    console.log(error.message);
    
    toast.error("Note failed to be deleted")
  })
}

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout searchText={searchText} handleSearchText={handleSearchText} />}  >
      <Route index element={<HomePage notes={filteredNotes} loading={isLoading} handleFilterText={handleFilterText} />} />
      <Route path='/add-notes' element={<AddNotePage addNote={addNote} />} />
      <Route path='/edit-note/:slug' element={<EditNotePage updateNote={updateNote} />} />
      <Route path='/note/:slug' element={<NoteDetailPage deleteNote={deleteNote} />} />
      {/* <Route path='MODEL' element={<Modal />} /> */}
    </Route>

  ))
  return <RouterProvider router={router} />
}

export default App
