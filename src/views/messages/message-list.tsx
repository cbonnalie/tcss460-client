'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Divider, List } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import axios from 'utils/axios';
import { IMessage } from 'types/message';
import PrioritySelector from 'components/PrioritySelector';
import { MessageListItem, NoMessage } from 'components/MessageListItem';
import { ThemeMode } from '../../config';

export default function MessagesList() {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [priority, setPriority] = React.useState(0);
  const theme = useTheme();

  React.useEffect(() => {
    axios
      .get('c/message/offset?limit=50&offset=0')
      .then((response) => {
        setMessages(response.data.entries);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (name: string) => {
    axios
      .delete('c/message/' + name)
      .then((response) => {
        response.status == 200 && setMessages(messages.filter((msg) => msg.name !== name));
      })
      .catch((error) => console.error(error));
  };

  const handlePriorityClick = (event: React.MouseEvent<HTMLElement>, newPriority: number) => setPriority(newPriority ?? 0);

  const messagesAsComponents = messages
    .filter((msg) => priority == 0 || priority == msg.priority)
    .map((msg, index, messages) => (
      <React.Fragment key={'msg list item: ' + index}>
        <MessageListItem message={msg} onDelete={handleDelete} />
        {index < messages.length - 1 && (
          <Divider
            sx={{
              borderColor: theme.palette.mode === ThemeMode.DARK ? '#ffffff' : 'grey.A800'
            }}
            variant="middle"
            component="li"
          />
        )}
      </React.Fragment>
    ));

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'primary.main'
            }}
          >
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Read Messages
          </Typography>
          <Box sx={{ mt: 1 }}>
            <PrioritySelector initialValue={priority} onClick={handlePriorityClick} />
            <List>{messagesAsComponents.length ? messagesAsComponents : <NoMessage />}</List>
          </Box>
        </Box>
      </Container>
    </>
  );
}
