import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fetchContent, BlogPost } from '../utils/content';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchContent().then(data => setPosts(data.blogs));
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h2" sx={{ mb: 6, color: 'var(--accent)' }}>Archive</Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} key={post.slug}>
            <Card sx={{ bgcolor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 0 }}>
              <CardActionArea component={RouterLink} to={`/blog/${post.slug}`} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="overline" color="var(--text-sub)">
                    {new Date(post.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ my: 2, fontFamily: 'Oswald', color: 'var(--text-main)' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-sub)' }}>
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
