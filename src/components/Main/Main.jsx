import './Main.css';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Main = ({ activeNote, updateNote }) => {
    const onEditNote = (key, value) => {
        updateNote({
            ...activeNote,
            id: activeNote.id,
            [key]: value,
            modDate: Date.now()
        });
    };

    if (!activeNote) {
        return <div className='no-active-note'>ノートが選択されていません。</div>
    }

    return (
        <div className="main">
            <div className="main-editor">
                <input
                    id="title"
                    type="text"
                    value={activeNote.title}
                    placeholder="ノートタイトル"
                    onChange={(e) => onEditNote('title', e.target.value)}
                />
                <textarea
                    id="content"
                    placeholder="ノート内容をこちらに記入ください。"
                    value={activeNote.content}
                    onChange={(e) => onEditNote('content', e.target.value)}
                />
            </div>

            <div className="main-preview">
                <h1 className="preview-title">
                    {activeNote.title}
                </h1>
                <ReactMarkdown
                    className="markdown-preview reactMarkdown"
                >
                    {activeNote.content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

Main.propTypes = {
    activeNote: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        modDate: PropTypes.number.isRequired
    }),
    updateNote: PropTypes.func.isRequired
};

export default Main