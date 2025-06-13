import { useState } from 'react';
import { useNotes } from '../../contexts/NotesContext';

export const NoteCard = ({ note, onEdit }) => {
  const { toggleImportant, toggleArchive, deleteNote, restoreNote, permanentDelete } = useNotes();
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleImportant = (e) => {
    e.stopPropagation();
    toggleImportant(note.id);
  };

  const handleToggleArchive = (e) => {
    e.stopPropagation();
    toggleArchive(note.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNote(note.id);
  };

  const handleRestore = (e) => {
    e.stopPropagation();
    restoreNote(note.id);
  };

  const handlePermanentDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to permanently delete this note?')) {
      permanentDelete(note.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div
      className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 overflow-hidden hover:scale-[1.02]`}
      style={{ borderLeftColor: note.color || '#6366f1' }}
      onClick={() => onEdit && onEdit(note)}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className="p-4 md:p-6">
        {/* Note Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-800 text-base md:text-lg leading-tight line-clamp-2 flex-1 pr-2">
            {note.title || 'Untitled'}
          </h3>
          {/* Always show star if important, with proper visibility */}
          <div className="flex-shrink-0">
            {note.isImportant && (
              <span className="material-icons text-yellow-500 text-xl md:text-2xl">
                star
              </span>
            )}
          </div>
        </div>

        {/* Note Content */}
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-4 leading-relaxed">
          {note.content}
        </p>

        {/* Note Footer */}
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-400">
          <span>{formatDate(note.updatedAt)}</span>
          {note.isArchived && (
            <span className="flex items-center gap-1">
              <span className="material-icons text-sm">archive</span>
              Archived
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`absolute top-3 right-3 flex items-center gap-1 transition-all duration-200 ${
        showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 md:opacity-0 md:-translate-y-1'
      } md:group-hover:opacity-100 md:group-hover:translate-y-0`}>
        {!note.isDeleted ? (
          <>
            <button
              onClick={handleToggleImportant}
              className={`p-2 md:p-2.5 rounded-lg hover:bg-gray-100 transition-colors shadow-sm ${
                note.isImportant ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 bg-white'
              }`}
              title={note.isImportant ? 'Remove from important' : 'Mark as important'}
            >
              <span className="material-icons text-base md:text-lg">
                {note.isImportant ? 'star' : 'star_border'}
              </span>
            </button>
            <button
              onClick={handleToggleArchive}
              className="p-2 md:p-2.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 bg-white transition-colors shadow-sm"
              title={note.isArchived ? 'Unarchive' : 'Archive'}
            >
              <span className="material-icons text-base md:text-lg">
                {note.isArchived ? 'unarchive' : 'archive'}
              </span>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 md:p-2.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 bg-white transition-colors shadow-sm"
              title="Delete"
            >
              <span className="material-icons text-base md:text-lg">delete</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleRestore}
              className="p-2 md:p-2.5 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 bg-white transition-colors shadow-sm"
              title="Restore"
            >
              <span className="material-icons text-base md:text-lg">restore</span>
            </button>
            <button
              onClick={handlePermanentDelete}
              className="p-2 md:p-2.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 bg-white transition-colors shadow-sm"
              title="Delete permanently"
            >
              <span className="material-icons text-base md:text-lg">delete_forever</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};