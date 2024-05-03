import './App.css';
import {Route, Routes} from 'react-router-dom';
import Artists from './features/Artists/Artists.tsx';
import Albums from './features/Albums/Albums.tsx';
import Tracks from './features/Tracks/Tracks.tsx';
import AppMainBar from './components/AppBar.tsx';
import Register from './features/Users/Registers.tsx';

function App() {
  return (
    <>
      <AppMainBar />
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/albums/:id" element={<Albums />} />
        <Route path="/tracks/:id" element={<Tracks />} />
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </>
  )
}

export default App;
