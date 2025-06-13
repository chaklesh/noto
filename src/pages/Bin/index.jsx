import { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { NotesGrid } from '../../components/NotesGrid';
import { NoteEditor } from '../../components/NoteEditor';
import { useNotes } from '../../contexts/NotesContext';

export const Bin = () => {
    const { state, permanentDelete } = useNotes();
    const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const deletedNotes = state.notes.filter(note => 
        note.isDeleted &&
        (state.searchQuery === '' || 
         note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
         note.content.toLowerCase().includes(state.searchQuery.toLowerCase()))
    );

    const handleEmptyBin = () => {
        if (window.confirm('Are you sure you want to permanently delete all notes in the bin? This action cannot be undone.')) {
            deletedNotes.forEach(note => permanentDelete(note.id));
        }
    };

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
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                            <div className="flex items-center gap-3">
                                <span className="material-icons text-red-500 text-2xl md:text-3xl">delete</span>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bin</h1>
                                    <p className="text-gray-600 text-sm md:text-base mt-1">
                                        {deletedNotes.length} deleted {deletedNotes.length === 1 ? 'note' : 'notes'}
                                    </p>
                                </div>
                            </div>
                            
                            {deletedNotes.length > 0 && (
                                <button
                                    onClick={handleEmptyBin}
                                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto justify-center"
                                >
                                    <span className="material-icons text-sm">delete_forever</span>
                                    Empty Bin
                                </button>
                            )}
                        </div>

                        <NotesGrid 
                            notes={deletedNotes}
                            emptyMessage="Bin is empty"
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