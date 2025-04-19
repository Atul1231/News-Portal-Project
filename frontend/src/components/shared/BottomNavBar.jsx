import { signOutSuccess } from "@/redux/user/userSlice"
import React from "react";
import { FaUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { IoIosCreate , IoIosDocument } from "react-icons/io";

const BottomNavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
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
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 border-t border-gray-300 px-6 py-2 flex justify-around items-center z-50">
      {/* Home */}
      <Link
        to="/"
        className={`flex flex-col items-center text-sm ${
          location.pathname === "/" ? "text-blue-600 font-semibold" : "text-slate-800"
        }`}
      >
        <FaHome size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>

      {/* Profile */}
      <Link
        to="/dashboard?tab=profile"
        className={`flex flex-col items-center text-sm ${
          location.search.includes("tab=profile") ? "text-blue-600 font-semibold" : "text-slate-800"
        }`}
      >
        <FaUser size={20} />
        <span className="text-xs mt-1">Profile</span>
      </Link>

      {currentUser && currentUser.isAdmin && (
        <Link
          to="/create-post"
          className="flex flex-col items-center text-slate-800"
        >
          <IoIosCreate size={20} />
          <span className="text-xs">Create Post</span>
        </Link>
      )}
      {currentUser && currentUser.isAdmin && (
        <Link
          to="/dashboard?tab=posts"
          className="flex flex-col items-center text-slate-800"
        >
          <IoIosDocument size={20} />
          <span className="text-xs">Posts</span>
        </Link>
      )}

      <button
        className="flex flex-col items-center text-slate-800 text-sm"
        onClick={handleSignout}
      >
        <TbLogout size={20} />
        <span className="text-xs mt-1">Logout</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;
