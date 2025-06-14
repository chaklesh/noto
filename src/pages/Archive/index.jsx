import { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { NotesGrid } from '../../components/NotesGrid';
import { NoteEditor } from '../../components/NoteEditor';
import { useNotes } from '../../contexts/NotesContext';

export const Archive = () => {
    const { state } = useNotes();
    const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const archivedNotes = state.notes.filter(note => 
        note.isArchived && 
        !note.isDeleted &&
        (state.searchQuery === '' || 
         note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
         note.content.toLowerCase().includes(state.searchQuery.toLowerCase()))
    );

    const handleNewNote = () => {
        setIsNewNoteOpen(true);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onMobileMenuToggle={handleMobileMenuToggle} />
            <div className="flex">
                <Sidebar 
                    onNewNote={handleNewNote} 
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8">
                            <div className="flex items-center gap-3">
                                <span className="material-icons text-blue-500 text-2xl md:text-3xl">archive</span>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Archive</h1>
                                    <p className="text-gray-600 text-sm md:text-base mt-1">
                                        {archivedNotes.length} archived {archivedNotes.length === 1 ? 'note' : 'notes'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <NotesGrid 
                            notes={archivedNotes}
                            emptyMessage="No archived notes"
                        />
                    </div>
                </main>
            </div>
            <button
                onClick={handleNewNote}
                className="fixed bottom-6 right-6 
                flex items-center justify-center gap-2 
                bg-indigo-600 hover:bg-indigo-700 
                text-white 
                px-4 py-3 
                rounded-full 
                transition-all duration-200 
                shadow-lg hover:shadow-xl 
                z-50
                hover:scale-105 active:scale-95"
            >
        <span className="material-icons">add</span>
      </button>
            <NoteEditor
                isOpen={isNewNoteOpen}
                onClose={() => setIsNewNoteOpen(false)}
            />
        </div>
    );
};