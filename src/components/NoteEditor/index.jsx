import { useState, useEffect } from 'react';
import { useNotes } from '../../contexts/NotesContext';

const colorOptions = [
  '#ffffff', '#f8f9fa', '#fff3cd', '#d4edda', '#cce5ff', '#e2e3e5', '#f8d7da'
];

export const NoteEditor = ({ note, isOpen, onClose }) => {
  const { addNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setColor(note.color || '#ffffff');
    } else {
      setTitle('');
      setContent('');
      setColor('#ffffff');
    }
  }, [note, isOpen]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      onClose();
      return;
    }

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      color
    };

    if (note) {
      updateNote(note.id, noteData);
    } else {
      addNote(noteData);
    }

    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        style={{ backgroundColor: color }}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="material-icons text-gray-500">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-4">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg md:text-xl font-semibold bg-transparent border-none outline-none placeholder-gray-400"
            autoFocus
          />
          
          <textarea
            placeholder="Start writing your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-48 md:h-64 bg-transparent border-none outline-none resize-none placeholder-gray-400 leading-relaxed text-sm md:text-base"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-6 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 mr-2">Color:</span>
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption}
                onClick={() => setColor(colorOption)}
                className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  color === colorOption ? 'border-indigo-500 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: colorOption }}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              {note ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};