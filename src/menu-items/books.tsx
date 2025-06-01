// third-party
import { FormattedMessage } from 'react-intl';

// assets
import BookOutlined from '@ant-design/icons/BookOutlined';
import AddIcon from '@mui/icons-material/AddCircle';
import ViewIcon from '@mui/icons-material/RemoveRedEye';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Delete from '@mui/icons-material/Delete';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  BookOutlined,
  AddIcon,
  ViewIcon,
  ImportContactsIcon,
  Delete
};

// ==============================|| MENU ITEMS - BOOKS ||============================== //

const books: NavItemType = {
  id: 'books',
  title: <FormattedMessage id="books" />,
  type: 'collapse',
  icon: icons.BookOutlined,
  children: [
    {
      id: 'add-book',
      title: <FormattedMessage id="add-book" />,
      type: 'item',
      url: '/books/add',
      icon: icons.AddIcon
    },
    {
      id: 'single-book',
      title: <FormattedMessage id="single-book" />,
      type: 'item',
      url: '/books/book',
      icon: icons.ImportContactsIcon
    },
    {
      id: 'view-books',
      title: <FormattedMessage id="view-books" />,
      type: 'item',
      url: '/books/list/all',
      icon: icons.ViewIcon
    },
    {
      id: 'delete-books',
      title: <FormattedMessage id="Delete Book" />,
      type: 'item',
      url: '/books/delete',
      icon: icons.Delete
    }
  ]
};

export default books;
