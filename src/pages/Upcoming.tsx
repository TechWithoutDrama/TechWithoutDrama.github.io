import { useEffect, useState } from 'react';
import { Container, Typography, Box, Chip } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { fetchContent, UpcomingVideo } from '../utils/content';

export default function Upcoming() {
  const [videos, setVideos] = useState<UpcomingVideo[]>([]);

  useEffect(() => {
    fetchContent().then(data => setVideos(data.upcoming));
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Recording': return 'error';
      case 'Editing': return 'warning';
      case 'Released': return 'success';
      default: return 'primary';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>Upcoming Content</Typography>
      <Timeline position="alternate">
        {videos.map((vid, i) => (
          <TimelineItem key={i}>
            <TimelineOppositeContent color="text.secondary">
              {vid.tentativeDate || "TBA"}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={getStatusColor(vid.status)} />
              {i < videos.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h6" component="span">
                  {vid.title}
                </Typography>
                <Typography>{vid.description}</Typography>
                <Chip size="small" label={vid.status} color={getStatusColor(vid.status)} sx={{ mt: 1 }} />
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}
