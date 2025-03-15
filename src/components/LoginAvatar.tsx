import { singOut } from '../firebase/firebase';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from './shadcn-components/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from './shadcn-components/popover';

const LoginAvatar = () => {
  return (
    <Popover>
      <PopoverTrigger>
        {' '}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <ul className="space-y-2">
          <li>
            <a
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 rounded"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="block px-4 py-2 hover:bg-gray-100 rounded"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="/notifications"
              className="block px-4 py-2 hover:bg-gray-100 rounded"
            >
              Notifications
            </a>
          </li>
          <li>
            <a
              href="/help"
              className="block px-4 py-2 hover:bg-gray-100 rounded"
            >
              Help
            </a>
          </li>
          <li className="border-t pt-2">
            <button className="w-full text-left px-4 py-2 hover:bg-red-100 rounded text-red-600" onClick={()=> singOut()}>
              Logout
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default LoginAvatar;
