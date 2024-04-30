import './App.css';
import {Alert} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Artists from './features/Artists/Artists.tsx';
import Albums from './features/Albums/Albums.tsx';
import Tracks from './features/Tracks/Tracks.tsx';
import AppMainBar from './components/AppBar.tsx';

function App() {
  return (
    <>
      <AppMainBar />
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/albums/:id" element={<Albums />} />
        <Route path="/tracks/:id" element={<Tracks />} />
        <Route path="*" element={<Alert severity="error">Not found!</Alert>} />
      </Routes>
    </>
  )
}

export default App;
