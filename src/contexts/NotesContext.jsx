import React, { createContext, useContext, useReducer, useEffect } from 'react';

const NotesContext = createContext();

const initialState = {
  notes: [],
  searchQuery: '',
  isLoading: true
};

function notesReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      const newNote = {
        id: Date.now().toString(),
        title: action.payload.title,
        content: action.payload.content,
        color: action.payload.color || '#ffffff',
        isImportant: false,
        isArchived: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedNotesAdd = [newNote, ...state.notes];
      // Save immediately
      localStorage.setItem('noto-notes', JSON.stringify(updatedNotesAdd));
      return {
        ...state,
        notes: updatedNotesAdd
      };

    case 'UPDATE_NOTE':
      const updatedNotesUpdate = state.notes.map(note =>
        note.id === action.payload.id
          ? { ...note, ...action.payload.updates, updatedAt: new Date().toISOString() }
          : note
      );
      // Save immediately
      localStorage.setItem('noto-notes', JSON.stringify(updatedNotesUpdate));
      return {
        ...state,
        notes: updatedNotesUpdate
      };

    case 'DELETE_NOTE':
      const updatedNotesDelete = state.notes.map(note =>
        note.id === action.payload.id
          ? { ...note, isDeleted: true, updatedAt: new Date().toISOString() }
          : note
      );
      // Save immediately
      localStorage.setItem('noto-notes', JSON.stringify(updatedNotesDelete));
      return {
        ...state,
        notes: updatedNotesDelete
      };

    case 'RESTORE_NOTE':
      const updatedNotesRestore = state.notes.map(note =>
        note.id === action.payload.id
          ? { ...note, isDeleted: false, updatedAt: new Date().toISOString() }
          : note
      );
      // Save immediately
      localStorage.setItem('noto-notes', JSON.stringify(updatedNotesRestore));
      return {
        ...state,
        notes: updatedNotesRestore
      };

    case 'PERMANENT_DELETE':
      const updatedNotesPermanent = state.notes.filter(note => note.id !== action.payload.id);
      // Save immediately
      localStorage.setItem('noto-notes', JSON.stringify(updatedNotesPermanent));
      return {
        ...state,
        notes: updatedNotesPermanent
      };

    case 'TOGGLE_IMPORTANT':
      const updatedNotesImportant = state.notes.map(note =>
        note.id === action.payload.id
          ? { ...note, isImportant: !note.isImportant, updatedAt: new Date().toISOString() }
          : note
      );
      // Save immediately
      localStorage.setItem('noto-notes', JSON.stringify(updatedNotesImportant));
      return {
        ...state,
        notes: updatedNotesImportant
      };

    case 'TOGGLE_ARCHIVE':
      const updatedNotesArchive = state.notes.map(note =>
        note.id === action.payload.id
          ? { ...note, isArchived: !note.isArchived, updatedAt: new Date().toISOString() }
          : note
      );
      // Save immediately
      localStorage.setItem('noto-notes', JSON.stringify(updatedNotesArchive));
      return {
        ...state,
        notes: updatedNotesArchive
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'REORDER_NOTES':
      // Save immediately
      localStorage.setItem('noto-notes', JSON.stringify(action.payload));
      return {
        ...state,
        notes: action.payload
      };

    case 'LOAD_NOTES':
      return {
        ...state,
        notes: action.payload,
        isLoading: false
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
}

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('noto-notes');
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        dispatch({ type: 'LOAD_NOTES', payload: parsedNotes });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error loading notes from localStorage:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const value = {
    state,
    dispatch,
    // Helper functions
    addNote: (note) => dispatch({ type: 'ADD_NOTE', payload: note }),
    updateNote: (id, updates) => dispatch({ type: 'UPDATE_NOTE', payload: { id, updates } }),
    deleteNote: (id) => dispatch({ type: 'DELETE_NOTE', payload: { id } }),
    restoreNote: (id) => dispatch({ type: 'RESTORE_NOTE', payload: { id } }),
    permanentDelete: (id) => dispatch({ type: 'PERMANENT_DELETE', payload: { id } }),
    toggleImportant: (id) => dispatch({ type: 'TOGGLE_IMPORTANT', payload: { id } }),
    toggleArchive: (id) => dispatch({ type: 'TOGGLE_ARCHIVE', payload: { id } }),
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    reorderNotes: (notes) => dispatch({ type: 'REORDER_NOTES', payload: notes })
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};