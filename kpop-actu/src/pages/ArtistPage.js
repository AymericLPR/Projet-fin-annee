import React from "react";
import { useParams } from "react-router-dom";

const artistData = {
  blackpink: {
    name: "BLACKPINK",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/BLACKPINK_Kill_This_Love_2019.jpg",
    bio: "BLACKPINK est un girl group sud-coréen formé par YG Entertainment. Il est reconnu pour ses hits mondiaux et ses performances puissantes.",
    albums: ["Square Up", "Kill This Love", "The Album", "Born Pink"],
    youtube: "https://www.youtube.com/@BLACKPINKOFFICIAL",
    spotify: "https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF"
  },
  bts: {
    name: "BTS",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/BTS_for_Love_Myself_campaign.png",
    bio: "BTS est un boys band sud-coréen connu mondialement. Il est formé de 7 membres et aborde des thèmes profonds dans ses chansons.",
    albums: ["Wings", "Love Yourself", "Map of the Soul", "BE"],
    youtube: "https://www.youtube.com/@BANGTANTV",
    spotify: "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX"
  },
  
};

function ArtistPage() {
  const { id } = useParams();
  const artist = artistData[id];

  if (!artist) {
    return <div className="p-4 text-center text-red-500">Artiste introuvable.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-pink-600">{artist.name}</h1>

      <img
        src={artist.image}
        alt={artist.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x300?text=Image+indisponible";
        }}
        className="w-full max-h-[400px] object-cover rounded shadow mb-6"
      />

      <p className="text-gray-700 mb-6 leading-relaxed">{artist.bio}</p>

      <h2 className="text-2xl font-semibold mb-2">📀 Albums</h2>
      <ul className="list-disc list-inside mb-6">
        {artist.albums.map((album, index) => (
          <li key={index}>{album}</li>
        ))}
      </ul>

      <div className="flex gap-4 mt-6">
        <a
          href={artist.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          YouTube
        </a>
        <a
          href={artist.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Spotify
        </a>
      </div>
    </div>
  );
}

export default ArtistPage;
