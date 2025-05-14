import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

function ArtistCard({ artist }) {
  if (!artist) return null;

  return (
    <Card>
      <CardActionArea component={Link} to={`/artist/${artist.id}`}>
        <CardMedia
          component="img"
          height="200"
          image={artist.image}
          alt={artist.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=Image+indisponible";
          }}
        />
        <CardContent>
          <Typography variant="h6" align="center">
            {artist.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ArtistCard;
