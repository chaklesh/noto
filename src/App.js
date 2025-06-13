import { Route, Routes } from 'react-router-dom';
import { NotesProvider } from './contexts/NotesContext';
import { Home } from './pages/Home';
import { Important } from './pages/Important';
import { Archive } from './pages/Archive';
import { Bin } from './pages/Bin';

function App() {
  return (
    <NotesProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/important' element={<Important />} />
        <Route path='/archive' element={<Archive />} />
        <Route path='/bin' element={<Bin />} />
      </Routes>
    </NotesProvider>
  );
}

export default App;
