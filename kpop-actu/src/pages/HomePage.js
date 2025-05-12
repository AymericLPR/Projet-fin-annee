import React, { useEffect, useState } from 'react';
import NewsFeed from '../components/NewsFeed'; // Assurez-vous que le chemin est correct
import { Container, Typography } from '@mui/material';
import axios from 'axios';

function HomePage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.example.com/kpop-news') // Remplacer par l'URL de l'API réelle
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to K-POP Actu
      </Typography>
      <NewsFeed news={news} />
    </Container>
  );
}

export default HomePage;
