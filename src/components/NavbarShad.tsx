import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './shadcn-components/navigation-menu';
import { useNavigate } from 'react-router-dom';
import VicSvg from '../assets/Vic.svg';
import LoginAvatar from './LoginAvatar';
import { useAuth } from '../firebase/authContext';

export default function NavbarShad() {
  const navbarItems = ['Forms', 'Templates', 'MyForms', 'Pricing'];
  const navigate = useNavigate();
  //get current user
  const { currentUser } = useAuth();

  const renderNavbar = (navbarItems: string[]) => {
    return navbarItems.map((navbarItem, index) => (
      <NavigationMenuItem key={index + navbarItem}>
        <NavigationMenuLink
          className={
            navigationMenuTriggerStyle() +
            'text-xl cursor-pointer font-pops font-extrabold'
          }
          onClick={() => {
            navigate('/' + navbarItem);
          }}
        >
          {navbarItem}
        </NavigationMenuLink>
      </NavigationMenuItem>
    ));
  };

  return (
    <div className="flex w-full py-4 bg-white items-center">
      {/* Logo on the left */}
      <div className="w-1/3 ">
        <img
          src={VicSvg}
          alt="VicSvg"
          onClick={() => navigate('/')}
          className="w-10 h-10 cursor-pointer fill-current"
        />
      </div>

      {/* Navbar items in the center */}
      <NavigationMenu className="w-1/3 flex-grow items-center justify-center">
        <NavigationMenuList className="flex space-x-6">
          {renderNavbar(navbarItems)}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Signup and Login buttons on the right */}
      {!currentUser && (
        <div className="flex items-end justify-end gap-2 w-1/3 ">
          <button
            onClick={() => {
              navigate('/signup');
            }}
            className="w-32 h-8 bg-[#6e4fff] rounded-[30px] text-white text-l font-bold font-['Poppins'] shadow-lg hover:shadow-xl active:shadow-md hover:bg-[#5a3ed7] active:bg-[#4a34b1]"
          >
            Signup Free
          </button>

          {/* Avatar popover */}
          <button
            onClick={() => {
              navigate('/login');
            }}
            className="w-24 h-8 rounded-[22px] border border-[#6e4fff] flex justify-center items-center gap-3.5 text-[#6e4fff] text-l font-extrabold font-['Poppins']  hover:shadow-xl active:shadow-md"
          >
            Log in
          </button>
        </div>
      )}

      {/* Avatar popover */}
      {currentUser && (
        <div className='flex items-end justify-end gap-2 w-1/3 '>
          <LoginAvatar></LoginAvatar>
        </div>
      )}
    </div>
  );
}
