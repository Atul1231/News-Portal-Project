import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { signOutSuccess } from "@/redux/user/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()  
  const [searchTerm, setSearchTerm] = useState("")
  // console.log(searchTerm)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)

    const searchTermFromUrl = urlParams.get("searchTerm")

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])
  
  const handleSignout = async () => {
      try {
        const res = await fetch("/api/user/signOut", {
          method: "POST",
        })
  
        const data = await res.json()
  
        if (!res.ok) {
          console.log(data.message)
        } else {
          dispatch(signOutSuccess())
        }
      } catch (error) {
        console.log(error)
      }
    }
    const handleSubmit = (e) => {
      e.preventDefault()
  
      const urlParams = new URLSearchParams(location.search)
      urlParams.set("searchTerm", searchTerm)
  
      const searchQuery = urlParams.toString()
  
      navigate(`/search?${searchQuery}`)
    }
  return (
    <nav className="shadow-lg sticky top-0 bg-white z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          <span className="text-slate-500">Morning</span>
          <span>Express</span>
        </Link>

        {/* Search Bar */}
        <form className="p-2 bg-slate-100 rounded-lg hidden sm:flex items-center"
        onSubmit={handleSubmit}>
          <input
           type="text"
           placeholder="Search..."
           className="focus:outline-none bg-transparent w-24 sm:w-64"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <CiSearch className="text-slate-600" />
          </button>
        </form>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-slate-700 hover:text-slate-400">Home</Link>
          <Link to="/about" className="text-slate-700 hover:text-slate-400">About</Link>
          <Link to="/news" className="text-slate-700 hover:text-slate-400">News Article</Link>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <img
                    src={currentUser.profilePicture}
                    alt="user"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-400" />
                <DropdownMenuItem className="block font-semibold text-sm">
                  <div className="flex flex-col gap-1">
                    <span>@{currentUser.username}</span>
                    <span>@{currentUser.email}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold mt-2">
                  <Link to="/dashboard?tab=profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                className="font-semibold mt-2"
                onClick={handleSignout}
              >
                Sign Out
              </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">
              <Button>Sign In</Button>
            </Link>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 pb-4 flex flex-col gap-3">
          <form className="p-2 bg-slate-100 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none bg-transparent w-full"
            />
            <button>
              <CiSearch className="text-slate-600" />
            </button>
          </form>

          <Link to="/" className="text-slate-700 hover:text-slate-400">Home</Link>
          <Link to="/about" className="text-slate-700 hover:text-slate-400">About</Link>
          <Link to="/news" className="text-slate-700 hover:text-slate-400">News Article</Link>

          {currentUser ? (
            <>
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={currentUser.profilePicture}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-sm font-semibold">
                  <div>@{currentUser.username}</div>
                  <div className="text-xs text-gray-500">{currentUser.email}</div>
                </div>
              </div>
              <Link to="/dashboard?tab=profile" className="text-slate-700 hover:text-slate-400">
                Profile
              </Link>
              <span className="text-slate-700 hover:text-slate-400 cursor-pointer">
                Sign Out
              </span>
            </>
          ) : (
            <Link to="/sign-in">
              <Button className="w-full">Sign In</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
