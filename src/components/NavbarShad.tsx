import { Link } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export default function NavbarShad() {
    const navbarItems = ['Forms', 'Templates', 'Resources', 'Pricing'];

    const renderNavbar = (navbarItems: string[]) => {
        return navbarItems.map((navbarItem, index) => (
            <NavigationMenuItem key={index + navbarItem}>
                <Link to={'/' + navbarItem}>
                    <NavigationMenuLink 
                        className={navigationMenuTriggerStyle() + ' text-xl'}
                        onClick={() => { console.log(`${navbarItem} works !!`) }}
                    >
                        {navbarItem}
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        ));
    };

    return (
        <div className="flex items-center justify-between px-5">
        <div className="text-lg font-bold">LOGO</div>
    
        <NavigationMenu className="flex-grow">
            <NavigationMenuList className="flex justify-center space-x-6">
                {renderNavbar(navbarItems)}
            </NavigationMenuList>
        </NavigationMenu>
    
        <div className="mr-5">AVATAR</div>
    </div>
    
    );
}
