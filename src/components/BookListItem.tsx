import { Avatar, Box, ListItem, Rating, Typography } from '@mui/material';
import { IBook } from 'types/book';

function BookAvatar({ image, title }: { image: string; title: string }) {
  return (
    <Avatar
      variant="rounded"
      src={image}
      alt={title}
      sx={{ width: 60, height: 90, mr: 2 }}
    />
  );
}

// Info component
function BookInfo({ title, authors, publication }: {
  title: string;
  authors: string[];
  publication: number;
}) {
  return (
    <>
      <Typography variant="subtitle1" component="div" fontWeight="bold">
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        by {authors.join(', ')} - {publication}
      </Typography>
    </>
  );
}

// Rating component
function BookRating({ average, count }: { average: number; count: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating
        value={average}
        precision={0.1}
        readOnly
        size="small"
      />

      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
        {average.toFixed(1)} ({count.toLocaleString()} ratings)
      </Typography>
    </Box>
  );
}

// Main component
export function BookListItem({ book }: { book: IBook }) {
  return (
    <ListItem alignItems="flex-start" sx={{ py: 2 }}>

      <BookAvatar
        image={book.small}
        title={book.title}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

        <BookInfo
          title={book.title}
          authors={book.authors}
          publication={book.publication}
        />

        <BookRating
          average={book.average}
          count={book.count}
        />

      </Box>
    </ListItem>
  );
}