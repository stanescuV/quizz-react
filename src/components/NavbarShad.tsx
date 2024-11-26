import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useNavigate } from 'react-router-dom';
import VicSvg from '../assets/Vic.svg';

export default function NavbarShad() {
    const navbarItems = ['Forms', 'Templates', 'Resources', 'Pricing'];
    const navigate = useNavigate();

    const renderNavbar = (navbarItems: string[]) => {
        return navbarItems.map((navbarItem, index) => (
            <NavigationMenuItem key={index + navbarItem}>
                <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + ' text-xl cursor-pointer font-pops font-black'}
                    onClick={() => { navigate(navbarItem) }}
                >
                    {navbarItem}
                </NavigationMenuLink>
            </NavigationMenuItem>
        ));
    };

    return (
        <div className="flex items-center justify-between px-5 pt-4">
            {/* Logo on the left */}
            <div>
                <img src={VicSvg} alt="VicSvg" className="w-10 h-10 min-w-10 min-h-10"/>
            </div>
    
            {/* Navbar items in the center */}
            <NavigationMenu className="flex-grow"> 
                <NavigationMenuList className="flex justify-center space-x-6">
                    {renderNavbar(navbarItems)}
                </NavigationMenuList>
            </NavigationMenu>
    
            {/* Signup and Login buttons on the right */}
            <div className="flex items-center gap-2">
                <button className="w-40 h-14 bg-[#6e4fff] rounded-[30px] text-white text-xl font-bold font-['Poppins'] shadow-lg hover:shadow-xl active:shadow-md hover:bg-[#5a3ed7] active:bg-[#4a34b1]">
                    Signup Free
                </button>
                
                <button className="w-40 h-14 rounded-[22px] border border-[#6e4fff] flex justify-center items-center gap-3.5 text-[#6e4fff] text-xl font-extrabold font-['Poppins']">
                    Log in
                </button>
            </div>
        </div>
    );
}
