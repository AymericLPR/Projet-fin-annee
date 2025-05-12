import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

function NewsFeed({ news }) {
  return (
    <div>
      {news.map((item) => (
        <Card key={item.id} style={{ marginBottom: '20px' }}>
          <CardMedia
            component="img"
            alt={item.title}
            height="140"
            image={item.image} // Assure-toi que 'image' existe dans l'API
          />
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="textSecondary">{item.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default NewsFeed;
