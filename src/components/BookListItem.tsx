import { Avatar, Box, ListItem, Rating, Typography } from '@mui/material';
import { IBook } from 'types/book';

export function BookListItem({ book }: { book: IBook }) {
  return (
    <ListItem alignItems='flex-start' sx={{ py: 2 }}>
      <Avatar
        variant='rounded'
        src={book.small}
        alt={book.title}
        sx={{ width: 60, height: 90, mr: 2 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='subtitle1' component='div' fontWeight='bold'>
          {book.title}
        </Typography>
        <Typography variant='body2' color='text.secondary' gutterBottom>
          by {book.authors.join(', ')} - {book.publication}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            value={book.average}
            precision={0.1}
            readOnly
            size='small'
          />
          <Typography variant='body2' color='text.secondary' sx={{ ml: 1 }}>
            {book.average.toFixed(1)} ({book.count.toLocaleString()} ratings)
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}