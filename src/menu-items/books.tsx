// third-party
import { FormattedMessage } from 'react-intl';

// assets
import BookOutlined from '@ant-design/icons/BookOutlined';
import AddIcon from '@mui/icons-material/AddCircle';
import ViewIcon from '@mui/icons-material/RemoveRedEye';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  BookOutlined,
  AddIcon,
  ViewIcon
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
      id: 'view-books',
      title: <FormattedMessage id="view-books" />,
      type: 'item',
      url: '/books/list',
      icon: icons.ViewIcon
    }
  ]
};

export default books;