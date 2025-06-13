import { useState } from 'react';
import { NoteCard } from '../NoteCard';
import { NoteEditor } from '../NoteEditor';
import { useNotes } from '../../contexts/NotesContext';

export const NotesGrid = ({ notes, emptyMessage = "No notes found" }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { reorderNotes } = useNotes();

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setSelectedNote(null);
    setIsEditorOpen(false);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex !== dropIndex) {
      const newNotes = [...notes];
      const draggedNote = newNotes[dragIndex];
      newNotes.splice(dragIndex, 1);
      newNotes.splice(dropIndex, 0, draggedNote);
      reorderNotes(newNotes);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 px-4">
        <span className="material-icons text-4xl md:text-6xl mb-4 text-gray-300">note_add</span>
        <p className="text-base md:text-lg font-medium text-center">{emptyMessage}</p>
        <p className="text-sm md:text-base mt-2 text-center">Create your first note to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        {notes.map((note, index) => (
          <div
            key={note.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="transition-transform"
          >
            <NoteCard
              note={note}
              onEdit={handleEditNote}
            />
          </div>
        ))}
      </div>

      <NoteEditor
        note={selectedNote}
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
      />
    </>
  );
};