import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fetchContent, BlogPost } from '../utils/content';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchContent().then(data => setPosts(data.blogs));
  }, []);

  return (
    <Container maxWidth="md">
      {posts.map((post, index) => (
        <VisualPostCard key={post.slug} post={post} index={index} />
      ))}

      {posts.length === 0 && (
        <Typography variant="h5" align="center" sx={{ mt: 10, color: 'var(--text-sub)' }}>
          Loading content...
        </Typography>
      )}
    </Container>
  );
}

// The Component matching the "Visual Blog" Layout
function VisualPostCard({ post, index }: { post: BlogPost, index: number }) {
  // Visual placeholders based on index to simulate the design
  const portraitImg = `https://images.unsplash.com/photo-${index % 2 === 0 ? '1534528741775-53994a69daeb' : '1598885511440-218a568c600d'}?q=80&w=800&auto=format&fit=crop&saturation=-100`;
  const wideImg = `https://images.unsplash.com/photo-${index % 2 === 0 ? '1529139574466-a302d27f60d0' : '1490750967868-58cb75063ed4'}?q=80&w=1200&auto=format&fit=crop&saturation=-100`;
  const category = post.tags[0] || "Editor's Choice";

  return (
    <Box 
      className="fade-up"
      sx={{ 
        mb: 15, 
        borderBottom: '1px solid var(--border)', 
        pb: 8,
        animationDelay: `${index * 0.2}s`
      }}
    >
      {/* Meta Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="overline" sx={{ color: 'var(--text-sub)', fontWeight: 600, letterSpacing: 1 }}>
          {category}
        </Typography>
        <Typography variant="overline" sx={{ color: 'var(--text-sub)', fontWeight: 600, letterSpacing: 1 }}>
          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
      </Box>

      {/* Top Section: Portrait + Content */}
      <Grid container spacing={5} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            position: 'relative', 
            width: '100%', 
            aspectRatio: '4/3', 
            overflow: 'hidden', 
            borderRadius: 1 
          }}>
            <img 
              src={portraitImg} 
              alt={post.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            sx={{ 
              fontStyle: 'italic', 
              fontSize: '1.1rem', 
              lineHeight: 1.6, 
              mb: 3, 
              color: 'var(--text-main)',
              fontWeight: 300
            }}
          >
            "{post.excerpt}"
          </Typography>
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              color: 'var(--accent)', 
              mb: 1,
              lineHeight: 1
            }}
          >
            {post.title}
          </Typography>

          <Typography variant="body2" sx={{ color: 'var(--text-sub)', mb: 4 }}>
            Author: TechWithoutDrama
          </Typography>

          <Box>
            <Button 
              component={RouterLink} 
              to={`/blog/${post.slug}`}
              variant="outlined"
            >
              Read Analysis
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Section: Wide Image */}
      <Box sx={{ 
        width: '100%', 
        aspectRatio: '21/9', 
        overflow: 'hidden', 
        borderRadius: 1 
      }}>
        <img 
          src={wideImg} 
          alt="Wide Cinematic Shot" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(10%)' }} 
        />
      </Box>
    </Box>
  );
}
