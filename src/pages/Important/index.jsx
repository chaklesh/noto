import { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { NotesGrid } from '../../components/NotesGrid';
import { NoteEditor } from '../../components/NoteEditor';
import { useNotes } from '../../contexts/NotesContext';

export const Important = () => {
    const { state } = useNotes();
    const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const importantNotes = state.notes.filter(note => 
        note.isImportant && 
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
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8">
                            <div className="flex items-center gap-3">
                                <span className="material-icons text-yellow-500 text-2xl md:text-3xl">star</span>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Important Notes</h1>
                                    <p className="text-gray-600 text-sm md:text-base mt-1">
                                        {importantNotes.length} important {importantNotes.length === 1 ? 'note' : 'notes'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <NotesGrid 
                            notes={importantNotes}
                            emptyMessage="No important notes yet"
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