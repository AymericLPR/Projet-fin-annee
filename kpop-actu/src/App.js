import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';
import NewsPage from './pages/NewsPage';
import EventPage from './pages/EventPage';

function App() {
  return (
    <Router>
      {/* Conteneur principal qui empêche la navbar d'être sur la même ligne */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      {/* Ajout de marge pour éviter que le contenu ne colle à la navbar */}
      <div style={{ paddingTop: '60px' }}>
      <div className="content">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>
      </div>
      </div>
      </div>
    </Router>
  );
}

export default App;
