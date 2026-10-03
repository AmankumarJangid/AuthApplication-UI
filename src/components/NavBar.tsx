import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import { 
  Circle, 
  Menu, 
  X, 
  ChevronDown, 
  ExternalLink, 
  Briefcase, 
  FolderGit2, 
  Wrench 
} from 'lucide-react'
import { selectAccessToken, selectUser } from '@/redux/slices/authSlice.ts'
import { useSelector } from 'react-redux'
import { handleLogout } from '@/utils/handleAuthRequeset'

// Shadcn UI Dropdown Imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const token = useSelector(selectAccessToken)
  const user = useSelector(selectUser)

  const isAuthenticated = Boolean(token)

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 flex min-h-12 w-full items-center justify-between border-b border-dashed bg-background px-2 md:px-4"
      >
        <div className="flex min-w-0 items-center gap-1 md:gap-10">
          <Button
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-menu"
            className="text-accent-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            size="icon"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>

          <h1 className="truncate text-base font-bold text-accent-foreground sm:text-lg">
            <a href="/">GameGrind.Dev</a>
          </h1>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-accent-foreground text-sm font-medium">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}
            >
              About
            </NavLink>

            {/* Desktop Services / Work Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:text-primary transition-colors outline-none cursor-pointer">
                  Work & Services <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <a
                    href="https://portfolio.amanjangid.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Portfolio
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <NavLink to="/projects" className="flex items-center gap-2 w-full cursor-pointer">
                    <FolderGit2 className="h-4 w-4" /> My Projects
                  </NavLink>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <NavLink to="/services" className="flex items-center gap-2 w-full cursor-pointer">
                    <Wrench className="h-4 w-4" /> Services
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}
            >
              Contact
            </NavLink>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {/* Mode toggle */}
          <ModeToggle />

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2 text-accent-foreground">
            {!isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <NavLink to="/auth/login">Login</NavLink>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <NavLink to="/auth/signup">Register</NavLink>
                </Button>
              </>
            ) : (
              <>
                {user && (
                  <div className="flex items-center gap-2 mr-2">
                    <Circle className="h-6 w-6">{user.name?.[0]}</Circle>
                    <span className="font-bold">{user.name}</span>
                  </div>
                )}
                <Button variant="default" onClick={() => handleLogout()} size="sm">
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div
            id="mobile-navigation-menu"
            className="absolute left-0 top-full flex w-full flex-col gap-1 border-b bg-background p-3 shadow-lg md:hidden"
          >
            <Button variant="ghost" className="w-full justify-start" asChild>
              <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
            </Button>

            <Button variant="ghost" className="w-full justify-start" asChild>
              <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
            </Button>

            {/* Mobile Expandable Services Section */}
            <div className="flex flex-col">
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              >
                <span>Work & Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isMobileServicesOpen && (
                <div className="ml-4 flex flex-col gap-1 border-l-2 border-muted pl-2 my-1">
                  <a
                    href="https://portfolio.amanjangid.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 text-sm hover:bg-muted rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Portfolio
                    </span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <NavLink
                    to="/projects"
                    className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <FolderGit2 className="h-4 w-4" /> My Projects
                  </NavLink>

                  <NavLink
                    to="/services"
                    className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Wrench className="h-4 w-4" /> Services
                  </NavLink>
                </div>
              )}
            </div>

            <Button variant="ghost" className="w-full justify-start" asChild>
              <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
            </Button>

            <hr className="my-2 border-dashed border-muted-foreground/30" />

            <div className="flex flex-col gap-2">
              {!isAuthenticated ? (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <NavLink to="/auth/login" onClick={() => setIsOpen(false)}>Login</NavLink>
                  </Button>
                  <Button variant="default" className="w-full" asChild>
                    <NavLink to="/auth/signup" onClick={() => setIsOpen(false)}>Register</NavLink>
                  </Button>
                </>
              ) : (
                <>
                  {user && (
                    <div className="flex items-center gap-3 px-3 py-2 text-left">
                      <Circle className="shrink-0">{user.name?.[0]}</Circle>
                      <span className="min-w-0 truncate font-medium">{user.name}</span>
                    </div>
                  )}
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      void handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="w-full min-h-[calc(100vh-3rem)] flex flex-col justify-center items-center-safe mt-10 text-center overflow-auto">
        <Outlet />
      </main>

      <footer className="w-full h-12 border-t border-dashed flex items-center justify-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} GameGrind.Dev. All rights reserved By Aman Kumar Jangid.
      </footer>
    </>
  )
}

export default NavBar