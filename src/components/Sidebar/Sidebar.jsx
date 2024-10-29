import './Sidebar.css';
import PropTypes from 'prop-types';

const Sidebar = ({ addNote, notes, deleteNote, activeNote, setActiveNote }) => {
    const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>ノート</h1>
                <button onClick={addNote}>追加</button>
            </div>
            <div className="sidebar-notes">
                {sortedNotes.map((note) => (
                    <div
                        className={`sidebar-note ${note.id === activeNote && 'active'}`}
                        key={note.id}
                        onClick={() => setActiveNote(note.id)}
                    >
                        <div className="sidebar-note-title">
                            <strong>{note.title}</strong>
                            <button onClick={() => deleteNote(note.id)}>削除</button>
                        </div>

                        <p>{note.content}</p>

                        <small>
                            {new Date(note.modDate).toLocaleDateString('ja-JP', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    )
}

Sidebar.propTypes = {
    addNote: PropTypes.func.isRequired,
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string,
            modDate: PropTypes.number.isRequired
        })
    ).isRequired,
    deleteNote: PropTypes.func.isRequired,
    activeNote: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    setActiveNote: PropTypes.func.isRequired
};

export default Sidebar