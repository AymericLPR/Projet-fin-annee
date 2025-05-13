import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import artistData from '../data/artistData';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/fr';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

dayjs.extend(isoWeek);
dayjs.locale('fr');

const sampleItems = [
  {
    type: 'article',
    title: 'BTS atteint 4,7 milliards de streams',
    description: 'Le groupe BTS continue de dominer Spotify avec un nouveau record.',
    image: 'https://imgeng.jagran.com/images/2025/05/12/article/image/BTS-V-(4)-1747035234266.jpg',
    url: 'https://english.jagran.com/entertainment/bts-v-creates-history',
  },
  {
    type: 'article',
    title: 'BLACKPINK fait sensation à Coachella',
    description: 'Performance inoubliable à Coachella 2025.',
    image: 'https://image.koreaboo.com/2025/05/FD2870-1-6.jpg',
    url: 'https://www.koreaboo.com/news/blackpink-coachella-performance',
  },
  {
    type: 'video',
    title: 'IVE - New Comeback Stage',
    channel: 'KPOP Stage',
    image: 'https://img.youtube.com/vi/abcdefghijk/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=abcdefghijk',
  },
  {
    type: 'video',
    title: 'Stray Kids - Behind the Scenes',
    channel: 'SKZ Official',
    image: 'https://img.youtube.com/vi/xyz12345678/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=xyz12345678',
  },
];

const hotArtistIds = ['bts', 'blackpink', 'newjeans', 'straykids'];

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3500,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

function MiniWeekCalendar() {
  const events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
  const startOfWeek = dayjs().startOf('isoWeek');
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

  return (
    <Box mt={5} mb={2}>
      <Typography variant="h5" gutterBottom color="secondary">
        📅 Événements cette semaine
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {days.map((day, i) => {
          const dayEvents = events.filter(ev => dayjs(ev.date).isSame(day, 'day'));
          const isToday = day.isSame(dayjs(), 'day');

          return (
            <Box
              key={i}
              p={2}
              bgcolor={isToday ? '#bbdefb' : '#f5f5f5'}
              borderRadius={2}
              textAlign="center"
              boxShadow={1}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {day.format('dddd D')}
              </Typography>
              {dayEvents.length > 0 ? (
                dayEvents.map((ev, idx) => (
                  <Typography key={idx} variant="caption" color="textSecondary">
                    • {ev.title}
                  </Typography>
                ))
              ) : (
                <Typography variant="caption" color="textSecondary">
                  Aucun
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function HomePage() {
  return (
    <Container maxWidth="md">
      {/* En-tête */}
      <Box textAlign="center" py={5}>
        <Typography variant="h3" gutterBottom color="primary">
          Bienvenue sur K-POP Actu 🎤
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Retrouvez toutes les dernières vidéos et actualités sur vos groupes K-Pop préférés.
        </Typography>
      </Box>

      {/* Titre actualités */}
      <Box mb={1}>
        <Typography variant="h5" gutterBottom color="secondary">
          📰 Actualités du jour
        </Typography>
      </Box>

      {/* Carrousel articles/vidéos */}
      <Box mb={2}>
        <Slider {...sliderSettings}>
          {sampleItems.map((item, index) => (
            <Box key={index} px={2}>
              <Card>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      width: '100%',
                      objectFit: 'contain',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.type === 'article'
                        ? item.description
                        : `Chaîne : ${item.channel}`}
                    </Typography>
                  </CardContent>
                </a>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Bouton vers page News */}
      <Box textAlign="center" mt={4} mb={2}>
        <Button variant="contained" component={Link} to="/news" size="large">
          Voir les actus & vidéos
        </Button>
      </Box>

      {/* Titre artistes */}
      <Box mb={1}>
        <Typography variant="h5" gutterBottom color="secondary">
          🎤 Artistes du moment
        </Typography>
      </Box>

      {/* Carrousel artistes */}
      <Box mb={2}>
        <Slider {...sliderSettings}>
          {hotArtistIds.map((id) => {
            const artist = artistData[id];
            return (
              <Box key={id} px={2}>
                <Card>
                  <Link to={`/artist/${id}`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                      component="img"
                      image={artist.image}
                      alt={artist.name}
                      sx={{
                        width: '100%',
                        objectFit: 'contain',
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>{artist.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Agence : {artist.agency}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Box>
            );
          })}
        </Slider>
      </Box>

      {/* Bouton vers page artistes */}
      <Box textAlign="center" mt={4} mb={2}>
        <Button variant="contained" component={Link} to="/artists" size="large">
          Voir les artistes
        </Button>
      </Box>

      {/* Mini calendrier */}
      <MiniWeekCalendar />

      {/* Bouton événements */}
      <Box textAlign="center" mt={3} mb={5}>
        <Button variant="contained" component={Link} to="/events" size="large">
          Voir les événements
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
