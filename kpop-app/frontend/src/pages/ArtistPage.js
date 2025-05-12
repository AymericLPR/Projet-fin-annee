import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import axios from 'axios';

function ArtistPage() {
  const { id } = useParams(); // Récupérer l'id de l'artiste dans l'URL
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    axios.get(`https://api.example.com/artist/${id}`)
      .then(response => {
        setArtist(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  if (!artist) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4">{artist.name}</Typography>
      <Typography variant="h6">Bio</Typography>
      <Typography variant="body1">{artist.bio}</Typography>
      <Grid container spacing={3}>
        {artist.albums.map((album) => (
          <Grid item key={album.id} xs={12} sm={6} md={4}>
            <div>{album.title}</div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ArtistPage;
