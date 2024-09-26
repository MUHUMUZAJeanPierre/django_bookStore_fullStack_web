import { FaNoteSticky } from "react-icons/fa6";
import { MdMarkunread } from "react-icons/md";
import { Link } from "react-router-dom";
// import './FormatDate'
import { FormatDate } from "./FormatDate";
const NoteCard = ({ note, title, date, category }) => {
  
    // getting first 15 characters of the body
    const body = `${note.body.split(" ").slice(0, 20).join(" ")} ...`
    // determining the color based on the category of the note (BUSINESS, PERSONAL, OTHER)
    const color = note.category == "BUSINESS" ? "BLUE" : note.category == "PERSONAL" ? "GREEN" : "PURPLE";
    
  
    return (
    <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <span className="side-stick" style={{ backgroundColor: color }}></span>
        <FaNoteSticky style={{ marginLeft: "auto", color: color }} />
        <Link to={`/note/${note.slug}`}  style={{ textDecoration: "none", color: "black" }}>
          <h5 className="note-title text-truncate w-75 mb-0" data-noteheading={title}>
            {note.title}
          </h5>
        </Link>
        <p className="note-date font-12 text-muted">{FormatDate(note.updated)}</p>
        <div className="note-content">
          <p className="note-inner-content text-muted" data-notecontent={body}>
            {/* {note.body} */}
            {body}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/notes-detail">
            <span className="mr-1">
              <MdMarkunread style={{ fontSize: "25px", cursor: "pointer", color: color }} />
            </span>
          </Link>
          <span className="mr-1">
            <i className="fa fa-trash remove-note">{note.category}</i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
