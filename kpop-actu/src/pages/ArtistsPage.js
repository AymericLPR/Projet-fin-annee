import React, { useState } from "react";
import artistData from "../data/artistData"; // ✅ Données centralisées
import ArtistCard from "../components/ArtistCard"; // ✅ Composant carte

function ArtistsPage() {
  const [search, setSearch] = useState("");

  const allArtists = Object.values(artistData);

  // 🔍 Filtrage par nom de groupe
  const filtered = allArtists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-pink-500">
        KPOP's Artist
      </h1>

      {/* Champ de recherche */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un artiste..."
          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Hot artists right now
      </h2>

      {/* Grille des cartes artistes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((artist) => (
          <ArtistCard key={artist.id} id={artist.id} />
        ))}
      </div>
    </div>
  );
}

export default ArtistsPage;
