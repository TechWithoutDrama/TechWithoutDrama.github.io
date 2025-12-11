import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button, Skeleton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { fetchContent, SiteConfig } from '../utils/content';

interface ChannelStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

export default function Home() {
  const [stats, setStats] = useState<ChannelStats | null>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    // Fetch local content
    fetchContent().then(data => setConfig(data.config));

    // Fetch generated stats
    fetch('./data/channel-stats.json')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.warn('Could not load stats', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      {/* Hero */}
      <Box sx={{ mb: 8, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h2" gutterBottom className="text-gradient">
          {config?.title || "Tech Without Drama"}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
          {config?.description || "Loading..."}
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<PlayArrowIcon />}
          href={config?.social?.youtube}
          target="_blank"
          sx={{ borderRadius: 50, px: 4 }}
        >
          Subscribe
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard label="Subscribers" value={stats?.subscriberCount} delay={0} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Total Views" value={stats?.viewCount} delay={0.1} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Videos" value={stats?.videoCount} delay={0.2} />
        </Grid>
      </Grid>
    </Container>
  );
}

function StatCard({ label, value, delay }: { label: string, value?: string, delay: number }) {
  // Add formatNumber helper here
  const displayValue = value ? parseInt(value).toLocaleString() : null;

  return (
    <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="overline" color="text.secondary">{label}</Typography>
        {displayValue ? (
          <Typography variant="h3" fontWeight="bold">{displayValue}</Typography>
        ) : (
          <Skeleton variant="text" width={100} height={60} sx={{ mx: 'auto' }} />
        )}
      </CardContent>
    </Card>
  );
}
