import React, { useState } from "react";
import { Link } from "react-router-dom";

const allArtists = [
  { id: "iu", name: "IU", image: "https://i.scdn.co/image/ab6761610000e5eb1e5d3d1cfe39515b4b9c8b27" },
  { id: "taeyeon", name: "Taeyeon", image: "https://i.scdn.co/image/ab6761610000e5eb3a382e4e5e4373500b4bd7cb" },
  { id: "exo", name: "EXO", image: "https://i.scdn.co/image/ab6761610000e5eb7f7f3ff7775e6f90a70a8d2a" },
];

const hotArtists = [
  {
    id: "blackpink",
    name: "BLACKPINK",
    image: "https://media.gq-magazine.co.uk/photos/5d13ab78c26553619da379be/master/pass/blackpink-gq-10apr18_shutterstock_b.jpg"
  },
  {
    id: "bts",
    name: "BTS",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/BTS_for_Love_Myself_campaign.png/400px-BTS_for_Love_Myself_campaign.png"
  },
  {
    id: "newjeans",
    name: "NewJeans",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/NewJeans_KCON_2022.jpg/400px-NewJeans_KCON_2022.jpg"
  },
  {
    id: "straykids",
    name: "Stray Kids",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Stray_Kids_in_2021.png/400px-Stray_Kids_in_2021.png"
  },
  {
    id: "twice",
    name: "TWICE",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Twice_KCON_2018.jpg/400px-Twice_KCON_2018.jpg"
  },
  {
    id: "ateez",
    name: "ATEEZ",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/ATEEZ_2022_KCON.png/400px-ATEEZ_2022_KCON.png"
  }
];

function ArtistsPage() {
  const [search, setSearch] = useState("");

  const searchResults = allArtists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-pink-500">KPOP's Artist</h1>

      {/* Barre de recherche */}
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un artiste..."
          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
        />
      </div>

      {/* Résultats de recherche */}
      {search && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Résultats de recherche</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {searchResults.length > 0 ? (
              searchResults.map((artist) => (
                <Link
                  to={`/artist/${artist.id}`}
                  key={artist.id}
                  className="bg-white p-4 shadow rounded text-center hover:shadow-lg transition"
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x300?text=Image+non+disponible";
                    }}
                    className="mx-auto mb-2 rounded h-40 object-cover w-full"
                  />
                  <p className="font-bold">{artist.name}</p>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">Aucun artiste trouvé.</p>
            )}
          </div>
        </>
      )}

      {/* Hot Artists Section */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hot artists right now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotArtists.map((artist) => (
          <Link
            to={`/artist/${artist.id}`}
            key={artist.id}
            className="bg-white p-4 shadow rounded text-center hover:shadow-lg transition"
          >
            <img
              src={artist.image}
              alt={artist.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x300?text=Image+non+disponible";
              }}
              className="mx-auto mb-2 rounded h-40 object-cover w-full"
            />
            <p className="font-bold">{artist.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArtistsPage;