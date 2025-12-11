import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fetchContent, BlogPost } from '../utils/content';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchContent().then(data => setPosts(data.blogs));
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>Blog</Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.slug}>
            <Card>
              <CardActionArea component={RouterLink} to={`/blog/${post.slug}`}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
