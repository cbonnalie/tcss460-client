// third-party
import { FormattedMessage } from 'react-intl';

// assets
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  MessageOutlined,
  EmailIcon,
  SendIcon
};

// ==============================|| MENU ITEMS - MESSAGES ||============================== //

const messages: NavItemType = {
  id: 'messages',
  title: <FormattedMessage id="messages" />,
  type: 'collapse',
  icon: icons.MessageOutlined,
  children: [
    {
      id: 'send-message',
      title: <FormattedMessage id="send-message" />,
      type: 'item',
      url: '/messages/send',
      icon: icons.SendIcon
    },
    {
      id: 'list-messages',
      title: <FormattedMessage id="view-messages" />,
      type: 'item',
      url: '/messages/list',
      icon: icons.EmailIcon
    }
  ]
};

export default messages;
