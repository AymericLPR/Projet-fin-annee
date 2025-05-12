import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";
import axios from "axios";

const NewsPage = () => {
  // const [news, setNews] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
     /* // Récupération des articles d'actualités
    axios.get("https://api.example.com/kpop-news")
      .then(response => setNews(response.data.articles || []))
      .catch(error => console.error("Erreur lors de la récupération des news :", error)); */

    // Récupération des vidéos YouTube
    const YOUTUBE_API_KEY = "AIzaSyCAEG3ekl8LL3cQSueP1V9V43LzQ7oB3x8";
    const YOUTUBE_CHANNEL_ID = "UCa5GaH6SFgfpxa-_Vtu7W6Q"; // ID de la chaîne BeeJay KPOP
    axios.get(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`)
      .then(response => {
        console.log("Données des vidéos YouTube :", response.data.items);
        setVideos(response.data.items || []);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des vidéos YouTube :", error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>📰 Last K-Pop's news</Typography>
      <Grid container spacing={3}>
        {/* Affichage des vidéos YouTube */}
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                <CardMedia
                  component="img"
                  height="200"
                  image={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                />
                <CardContent>
                  <Typography variant="h6">{video.snippet.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{video.snippet.channelTitle}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


export default NewsPage;

