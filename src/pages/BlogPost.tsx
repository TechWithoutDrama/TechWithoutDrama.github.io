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

  if (!post) return <Container><Typography sx={{ color: 'var(--text-main)' }}>Loading...</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '3rem', md: '5rem'}, color: 'var(--accent)' }}>
        {post.title}
      </Typography>
      
      <Box sx={{ mb: 6, display: 'flex', gap: 2, alignItems: 'center', borderBottom: '1px solid var(--border)', pb: 2 }}>
        <Typography variant="overline" sx={{ color: 'var(--text-sub)' }}>
          {new Date(post.date).toLocaleDateString()}
        </Typography>
        {post.tags.map(tag => (
          <Chip 
            key={tag} 
            label={tag} 
            size="small" 
            sx={{ 
              bgcolor: 'transparent', 
              border: '1px solid var(--text-sub)', 
              color: 'var(--text-sub)',
              fontFamily: 'Inter'
            }} 
          />
        ))}
      </Box>

      <Box 
        sx={{ 
          color: 'var(--text-main)',
          fontSize: '1.1rem',
          lineHeight: 1.8,
          '& h1, & h2, & h3': { fontFamily: 'Oswald', color: 'var(--accent)', mt: 4, mb: 2 },
          '& p': { mb: 2 },
          '& img': { maxWidth: '100%', borderRadius: 1, my: 3 }, 
          '& pre': { overflowX: 'auto', bgcolor: 'var(--card-bg)', p: 3, borderRadius: 1, border: '1px solid var(--border)' },
          '& code': { fontFamily: 'monospace' }
        }}
      >
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </Box>
    </Container>
  );
}
