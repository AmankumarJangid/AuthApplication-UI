import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { Circle, Menu } from 'lucide-react'
import { selectAccessToken, selectUser } from '@/redux/slices/AuthSlice'
import { useSelector } from 'react-redux'
import { handleLogout } from '@/utils/handleAuthRequeset'

const NavBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    const token = useSelector(selectAccessToken);
    const user= useSelector(selectUser);

    const isAuthenticated = token ? true : false;



    return (
        <>
            {/* 
        Added relative positioning so the absolute mobile menu anchors to this nav.
        Removed incorrect trailing exclamation marks (e.g., bg-transparent!) 
      */}
            <nav className="sticky top-0 flex justify-between items-center w-full min-h-12 bg-transparent px-2 md:px-4 border-b border-dashed z-50">
                <div className="flex items-center h-full gap-2 md:gap-10">
                    <Button
                        className="text-accent-foreground md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        variant="ghost"
                        size="icon"
                    >
                        <Menu />
                    </Button>
                    <h1 className="text-lg font-bold text-accent-foreground">
                        <a href="/">GameGrind.Dev</a>
                    </h1>

                    {/* Desktop Links */}
                    <div className="hidden md:flex justify-between gap-4 text-accent-foreground">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/services">Services</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                    </div>
                </div>

                <div className="flex items-center h-full gap-2">
                    {/* Mode toggle stays visible on mobile and desktop */}
                    <ModeToggle />

                    {/* Desktop Auth Buttons - Hidden on mobile to prevent crowding */}
                    <div className="hidden md:flex justify-between gap-2 text-accent-foreground">
                        {/* When using Shadcn UI buttons as links, use the `asChild` prop */}

                        {!isAuthenticated && (
                            <Button variant="outline" size="sm" asChild>
                                <NavLink to="/auth/login">Login</NavLink>
                            </Button>
                        )}
                        {!isAuthenticated && (
                            <Button variant="default" size="sm" asChild>
                                <NavLink to="/auth/signup">Register</NavLink>
                            </Button>
                        )}

                        {isAuthenticated && user && (
                            <div className="flex ">
                                <Circle>{user?.name[0]}</Circle>
                                <span className='mx-4'><strong>{user?.name}</strong></span>
                            </div>
                        )
                        }
                        {isAuthenticated && (
                             <Button variant="default" onClick={ ()=> handleLogout() }size="sm" asChild>
                                Logout
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-background border-b shadow-lg md:hidden flex flex-col gap-2 p-4 z-50">
                        {/* Moving the onClick to the NavLink ensures the menu closes when a route is clicked */}
                        <Button variant="ghost" className="justify-start w-full" onClick={() => { setIsOpen(false); navigate('/'); }}>
                            Home
                        </Button>

                        <Button variant="ghost" className="justify-start w-full" onClick={() => { setIsOpen(false); navigate('/about'); }}>
                            About
                        </Button>

                        <Button variant="ghost" className="justify-start w-full" onClick={() => { setIsOpen(false); navigate('/services'); }}>
                            Services
                        </Button>

                        <Button variant="ghost" className="justify-start w-full" onClick={() => { setIsOpen(false); navigate('/contact'); }}>
                            Contact
                        </Button>

                        {/* Added Auth buttons to the mobile menu */}
                        <hr className="my-2 border-dashed border-muted-foreground/30" />

                        <div className="flex flex-col gap-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={(e) => {
                                    // Prevent race condition by letting the click register 
                                    // before unmounting the menu component
                                    setIsOpen(false);
                                    navigate('/login');

                                }}
                            >
                                Login
                            </Button>

                            <Button
                                variant="default"
                                className="w-full"
                                onClick={(e) => {
                                    setIsOpen(false);
                                    navigate('/signup');
                                }}
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="w-full min-h-[calc(100vh-3rem)] flex flex-col justify-center items-center-safe mt-10 text-center overflow-auto">
                <Outlet />
            </main>

            <footer className="w-full h-12 border-t border-dashed flex items-center justify-center text-sm text-muted-foreground absolute *:bottom-0">
                &copy; {new Date().getFullYear()} GameGrind.Dev. All rights reserved By Aman Kumar Jangid.
            </footer>
        </>
    )
}

export default NavBar