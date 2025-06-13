import { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { NotesGrid } from '../../components/NotesGrid';
import { NoteEditor } from '../../components/NoteEditor';
import { useNotes } from '../../contexts/NotesContext';

export const Home = () => {
    const { state } = useNotes();
    const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Filter notes for home page (not deleted, not archived)
    const filteredNotes = state.notes.filter(note => 
        !note.isDeleted && 
        !note.isArchived &&
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
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">All Notes</h1>
                                <p className="text-gray-600 text-sm md:text-base">
                                    {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
                                    {state.searchQuery && ` matching "${state.searchQuery}"`}
                                </p>
                            </div>
                            
                            <button
                                onClick={handleNewNote}
                                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 md:px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
                            >
                                <span className="material-icons">add</span>
                                New Note
                            </button>
                        </div>

                        {/* Notes Grid */}
                        <NotesGrid 
                            notes={filteredNotes}
                            emptyMessage={state.searchQuery ? `No notes found matching "${state.searchQuery}"` : "No notes yet"}
                        />
                    </div>
                </main>
            </div>

            <NoteEditor
                isOpen={isNewNoteOpen}
                onClose={() => setIsNewNoteOpen(false)}
            />
        </div>
    );
};