import './App.css';
import {Route, Routes} from 'react-router-dom';
import Artists from './features/Artists/Artists.tsx';
import Albums from './features/Albums/Albums.tsx';
import Tracks from './features/Tracks/Tracks.tsx';
import AppMainBar from './components/AppBar.tsx';
import Register from './features/Users/Registers.tsx';
import Login from './features/Users/Login.tsx';
import ArtistsForm from './features/Artists/ArtistsForm.tsx';
import TracksHistory from './features/Tracks/TracksHistory.tsx';
import RouteComponents from './components/RouteComponents.tsx';
import {useAppSelector} from './App/hooks.ts';
import {selectUser} from './features/Users/usersSlice.ts';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <AppMainBar />
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/albums/:id" element={<Albums />} />
        <Route path="/tracks/:id" element={<Tracks />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/track_history" element={user && <TracksHistory />} />
        <Route path="/new/artist" element={
          <RouteComponents isAllowed={user && user.role !== ''}>
            <ArtistsForm />
          </RouteComponents>
        } />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </>
  )
}

export default App;
