import Loader from "./Loader";
import NoteCard from "./NoteCard";

const NoteCardContainer = ({ notes, loading }) => {
    console.log("notes", notes)
  return (
    <div className="container">
      <div className="note-has-grid row">
        
        {loading && <Loader loading={loading}/>}
       
       
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            title={note.title}
            body={note.body}
            date={note.created}
            category={note.category}
            // color={"blue", "yellow"}  // Assuming you want to pass color for styling
          />
        ))}


      </div>
    </div>
  );
};

export default NoteCardContainer;
