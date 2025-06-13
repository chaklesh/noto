import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useNotes } from '../../contexts/NotesContext';

export const Sidebar = ({ onNewNote, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        // Load collapsed state from localStorage
        const saved = localStorage.getItem('sidebar-collapsed');
        return saved ? JSON.parse(saved) : false;
    });
    
    const location = useLocation();
    const { state } = useNotes();
    
    // Save collapsed state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);
    
    const getNotesCount = (filter) => {
        switch (filter) {
            case 'all':
                return state.notes.filter(note => !note.isDeleted && !note.isArchived).length;
            case 'important':
                return state.notes.filter(note => note.isImportant && !note.isDeleted && !note.isArchived).length;
            case 'archive':
                return state.notes.filter(note => note.isArchived && !note.isDeleted).length;
            case 'bin':
                return state.notes.filter(note => note.isDeleted).length;
            default:
                return 0;
        }
    };
    
    const menuItems = [
        { path: "/", icon: "description", label: "All Notes", count: getNotesCount('all') },
        { path: "/important", icon: "star", label: "Important", count: getNotesCount('important') },
        { path: "/archive", icon: "archive", label: "Archive", count: getNotesCount('archive') },
        { path: "/bin", icon: "delete", label: "Bin", count: getNotesCount('bin') }
    ];

    const handleLinkClick = () => {
        // Close mobile menu when a link is clicked on mobile
        if (window.innerWidth < 768 && setIsMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <aside className={`
                bg-gradient-to-b from-indigo-700 to-indigo-900 text-white min-h-screen border-r border-indigo-800/30 shadow-2xl transition-all duration-300 
                ${isCollapsed ? 'w-20' : 'w-64'}
                md:relative md:translate-x-0
                fixed z-50 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-indigo-600/30 flex items-center justify-between">
                    {/* Desktop Hamburger */}
                    <button
                        onClick={handleToggleCollapse}
                        className="bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/15 transition-all duration-200 hover:scale-105 w-12 h-12 hidden md:flex"
                    >
                        <span className="material-icons text-white/90 text-xl">menu</span>
                    </button>
                    
                    {/* Mobile Hamburger and Close */}
                    <div className="md:hidden flex items-center justify-between w-full">
                        <button
                            onClick={handleToggleCollapse}
                            className="bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/15 transition-all duration-200 w-12 h-12"
                        >
                            <span className="material-icons text-white/90 text-xl">menu</span>
                        </button>
                        
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/15 transition-all duration-200 w-12 h-12"
                        >
                            <span className="material-icons text-white/90 text-xl">close</span>
                        </button>
                    </div>
                </div>
                
                {/* Add Note Button */}
                <div className="p-4">
                    <button
                        onClick={() => {
                            onNewNote();
                            handleLinkClick();
                        }}
                        className={`flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30 w-full group hover:scale-[1.02] ${
                            isCollapsed ? 'px-3 py-4' : 'px-4 py-3'
                        }`}
                        title={isCollapsed ? "New Note" : ""}
                    >
                        <span className="material-icons text-white text-xl">add</span>
                        {!isCollapsed && <span className="font-medium">New Note</span>}
                    </button>
                </div>
                
                {/* Menu Items */}
                <nav className="px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={handleLinkClick}
                                className={`relative flex items-center gap-4 rounded-xl transition-all duration-200 group hover:scale-[1.02] ${
                                    isCollapsed ? 'px-3 py-4 justify-center' : 'px-4 py-3'
                                } ${
                                    isActive 
                                        ? 'bg-white/15 text-white shadow-lg border border-white/20' 
                                        : 'hover:bg-white/8 text-white/80 hover:text-white'
                                }`}
                                title={isCollapsed ? item.label : ""}
                            >
                                {/* Active indicator for collapsed mode */}
                                {isActive && isCollapsed && (
                                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                                )}
                                
                                <span className={`material-icons text-xl flex-shrink-0 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                    {item.icon}
                                </span>
                                
                                {!isCollapsed && (
                                    <>
                                        <span className="font-medium flex-1">{item.label}</span>
                                        <div className="flex items-center gap-2">
                                            {item.count > 0 && (
                                                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                                                    isActive ? 'bg-white/20' : 'bg-white/10'
                                                }`}>
                                                    {item.count}
                                                </span>
                                            )}
                                            {isActive && (
                                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};