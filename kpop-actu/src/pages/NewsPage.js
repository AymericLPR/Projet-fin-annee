import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import NewsFeed from "../components/NewsFeed";

const NewsPage = () => {
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);

  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const NEWS_API_KEY = process.env.REACT_APP_NEWSDATA_API_KEY;

  console.log("Clé YouTube :", YOUTUBE_API_KEY);
  console.log("Clé NewsData :", NEWS_API_KEY);

  useEffect(() => {
    // Récupération des vidéos YouTube
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=UCa5GaH6SFgfpxa-_Vtu7W6Q&part=snippet,id&order=date&maxResults=6`
      )
      .then((response) => {
        setVideos(response.data.items || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des vidéos YouTube :", error);
      });

    // Récupération des articles K-pop via newsdata.io
    axios
      .get(
        `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&language=fr&q=kpop`
      )
      .then((response) => {
        const results = response.data.results || [];
        const formatted = results.map((item) => ({
          title: item.title,
          description: item.description,
          image: item.image_url || "https://via.placeholder.com/400",
          url: item.link
        }));
        setArticles(formatted);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des articles :", error);
      });
  }, [YOUTUBE_API_KEY, NEWS_API_KEY]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        📰 Dernières vidéos K-Pop
      </Typography>
      <NewsFeed items={videos} type="video" />

      <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
        🗞️ Articles récents sur la K-Pop
      </Typography>
      <NewsFeed items={articles} type="article" />
    </Container>
  );
};

export default NewsPage;
