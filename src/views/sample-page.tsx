'use client';
import { useState } from 'react';
// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';

// ==============================|| SAMPLE PAGE ||============================== //

const teamMembers = [
  {
    name: 'Kaleb Anagnostou',
    profileUrl: 'https://github.com/kalebanagnostou',
    avatarUrl: 'https://github.com/kalebanagnostou.png'
  },
  {
    name: 'Christian Bonnalie',
    profileUrl: 'https://github.com/cbonnalie',
    avatarUrl: 'https://github.com/cbonnalie.png'
  },
  {
    name: 'Mark Kulibaba',
    profileUrl: 'https://github.com/Ku1iMrk04',
    avatarUrl: 'https://github.com/Ku1iMrk04.png'
  },
  {
    name: 'Noah Ogilvie',
    profileUrl: 'https://github.com/foo-7',
    avatarUrl: 'https://github.com/foo-7.png'
  }
];

export default function SamplePage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const theme = useTheme();
  const accentColor = theme.palette.primary.main;

  return (
    <>
      <MainCard title="TCSS 460 Course Project" darkTitle>
        <Typography variant="body1">
          Welcome to our Client Server Programming course project! Made by four students at UW Tacoma, this application
          is designed to showcase
          the knowledge and skills acquired throughout the course such as RESTful API design, client-server
          communication, and data management. The project includes various features such as user authentication,
          and book management. Navigate through the different sections to see how we have applied the concepts learned
          in class.
        </Typography>
      </MainCard>
      <MainCard title="Group 9" darkTitle sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {teamMembers.map((member, index) => (
            <Grid item xs={6} key={index}>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
              >
                <a
                  href={member.profileUrl}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                  onMouseEnter={() => setHoveredMember(index)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <Avatar
                    src={member.avatarUrl}
                    alt={member.name}
                    sx={{
                      width: 56,
                      height: 56,
                      border: `2px solid ${accentColor}`,
                      transition: 'all 0.3s ease-in-out',
                      transform: hoveredMember === index ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: hoveredMember === index ? `0 0px 8px ${accentColor}` : 'none'
                    }}
                  />
                </a>
                <a
                  href={member.profileUrl}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                  onMouseEnter={() => setHoveredMember(index)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      transition: 'all 0.3s ease-in-out',
                      color: hoveredMember === index ? accentColor : 'inherit'
                    }}
                  >
                    {member.name}
                  </Typography>
                </a>
              </Box>
            </Grid>
          ))}
        </Grid>
      </MainCard>
    </>
  );
}