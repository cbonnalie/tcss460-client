// third-party
import { FormattedMessage } from 'react-intl';

// local imports
import messages from './messages';
import books from './books';

// type
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [messages, books]
};

export default pages;