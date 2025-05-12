import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from "@mui/material";

function NewsFeed({ items = [], type = "video" }) {
  return (
    <Grid container spacing={3}>
      {items.map((item, index) => {
        if (type === "video") {
          const videoId = item.id?.videoId;
          const snippet = item.snippet;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={snippet?.thumbnails?.high?.url}
                    alt={snippet?.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{snippet?.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {snippet?.channelTitle}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        }

        if (type === "article") {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        }

        return null;
      })}
    </Grid>
  );
}

export default NewsFeed;
