import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Chip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { fetchContent, BlogPost as BlogPostType } from '../utils/content';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    fetchContent().then(data => {
      const found = data.blogs.find(b => b.slug === slug);
      if (found) setPost(found);
    });
  }, [slug]);

  if (!post) return <Container><Typography>Loading...</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h2" gutterBottom>{post.title}</Typography>
      <Box sx={{ mb: 4, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="caption">{new Date(post.date).toLocaleDateString()}</Typography>
        {post.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
      </Box>
      <Box sx={{ '& img': { maxWidth: '100%' }, '& pre': { overflowX: 'auto', bgcolor: 'background.paper', p: 2, borderRadius: 1 } }}>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </Box>
    </Container>
  );
}
