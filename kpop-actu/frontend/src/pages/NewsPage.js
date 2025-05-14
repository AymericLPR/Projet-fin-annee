import React, { useEffect, useState } from "react";
import { Container, Typography, Divider } from "@mui/material";
import axios from "axios";
import ArticleFeed from "../components/ArticleFeed";
import VideoFeed from "../components/VideoFeed";

const NewsPage = () => {
  const [videos, setVideos] = useState([]);

  // Remplace ceci par l’URL publique du backend si nécessaire :
  const BACKEND_URL = "https://turbo-fishstick-xx7w749gggrf6r9g-5000.app.github.dev";

  const sampleArticles = [
    {
      title: "BTS atteint les 4,7 milliards de streams sur Spotify",
      description: "Le groupe K-pop BTS continue de dominer les plateformes de streaming avec un nouveau record impressionnant.",
      image: "https://imgeng.jagran.com/images/2025/05/12/article/image/BTS-V-(4)-1747035234266.jpg",
      url: "https://english.jagran.com/entertainment/bts-v-creates-history"
    },
    {
      title: "BLACKPINK fait sensation à Coachella 2025",
      description: "Le groupe sud-coréen a enflammé la scène avec une performance inoubliable et un public en délire.",
      image: "https://image.koreaboo.com/2025/05/FD2870-1-6.jpg",
      url: "https://www.koreaboo.com/news/blackpink-coachella-performance"
    },
    {
      title: "G-Dragon vend 80 000 places au Tokyo Dome",
      description: "Le leader de BIGBANG revient avec un nouveau show à guichets fermés au Japon.",
      image: "https://koreajoongangdaily.joins.com/data/photo/2025/05/12/93fabfe4-ca9a-4f95-89a0-f15cc458cc04.jpg",
      url: "https://koreajoongangdaily.joins.com/news/gdragon-tokyo-dome"
    },
    {
      title: "IVE bat des records avec son dernier single",
      description: "Le groupe féminin IVE enregistre des ventes records dès la première semaine de sortie de son nouveau single.",
      image: "https://img.kpopmap.com/2025/05/ive-record-breaking.jpg",
      url: "https://kpopmap.com/ive-new-single-breaks-records/"
    },
    {
      title: "Stray Kids annoncés au festival Lollapalooza",
      description: "Le boys band Stray Kids est confirmé comme tête d'affiche pour Lollapalooza 2025 à Chicago.",
      image: "https://cdn.soompi.com/stray-kids-lollapalooza.jpg",
      url: "https://www.soompi.com/article/stray-kids-lollapalooza-lineup"
    },
    {
      title: "TWICE annonce une tournée mondiale pour 2025",
      description: "TWICE entame une tournée mondiale avec plus de 20 dates prévues en Amérique, Europe et Asie.",
      image: "https://twice.jype.com/images/worldtour-2025.jpg",
      url: "https://jypetwice.com/news/2025-world-tour"
    }
  ];

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/youtube?q=kpop`)
      .then((res) => {
        setVideos(res.data || []);
      })
      .catch((err) => {
        console.error("Erreur vidéos (backend) :", err);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        📰 Articles récents sur la K-Pop
      </Typography>
      <ArticleFeed articles={sampleArticles} />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" gutterBottom>
        🎥 Dernières vidéos K-Pop
      </Typography>
      <VideoFeed videos={videos} />
    </Container>
  );
};

export default NewsPage;
