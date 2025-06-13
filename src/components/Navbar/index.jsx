import { useState } from 'react';
import { useNotes } from '../../contexts/NotesContext';

export const Navbar = ({ onMobileMenuToggle }) => {
  const { state, setSearchQuery } = useNotes();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-xl border-b border-indigo-900/20 sticky top-0 z-40">
      <header className="flex items-center gap-4 px-4 md:px-6 py-4">
        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors md:hidden"
        >
          <span className="material-icons text-white text-xl">menu</span>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/95 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
            <img
              className="w-6 h-6 md:w-8 md:h-8"
              src="https://www.svgrepo.com/show/281422/note-notepad.svg"
              alt="Noto Logo"
            />
          </div>
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg">
            Noto
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="ml-auto flex items-center">
          <div className={`relative transition-all duration-300 ${
            isSearchExpanded ? 'w-64 md:w-80' : 'w-10'
          }`}>
            <input
              type="text"
              placeholder="Search notes..."
              value={state.searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => {
                if (!state.searchQuery) setIsSearchExpanded(false);
              }}
              className={`w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all duration-300 ${
                isSearchExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
            <button 
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
            >
              <span className="material-icons text-white/80 hover:text-white text-lg">
                search
              </span>
            </button>
          </div>
        </div>
      </header>
    </nav>
  );
};