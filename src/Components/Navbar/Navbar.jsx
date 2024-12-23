// import React, { useContext } from "react";
// import { AuthContext } from "../Provider/authProvider";
// import { NavLink } from "react-router-dom";


// const Navbar = () => {
//     const { user, signOutUser } = useContext(AuthContext)

//     const handleLogout = async () => {
//         try {
//             await signOutUser();
//             console.log("User logged out successfully");
//         } catch (error) {
//             console.error("Logout error:", error.message);
//             alert("Failed to log out. Please try again.");
//         }
//     };

//     const links = (
//         <>
//             <li>
//                 <NavLink to="" activeclassname="active">
//                     Home
//                 </NavLink>
//             </li>
//             <li>
//                 <NavLink to="/rooms" activeclassname="active">
//                     Rooms
//                 </NavLink>
//             </li>

//             {user && user.displayName && (
//                 <>
//                     <li>
//                         <NavLink to="/mybookings" activeclassname="active">
//                             My Bookings
//                         </NavLink>
//                     </li>
//                     {/* <li>
//                         <NavLink to="/myaddedvisa" activeclassname="active">
//                             My Added Visa
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/myvisaapplication" activeclassname="active">
//                             My Visa Application
//                         </NavLink>
//                     </li> */}
//                 </>
//             )}
//         </>
//     );

//     return (
//         <div>
//             {user && user.displayName && (
//                 <div className="bg-gray-100 text-center py-2">
//                     <span className="text-sm font-medium">
//                         Welcome, {user.displayName}!
//                     </span>
//                 </div>
//             )}
//             <div className="navbar bg-base-100">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <button tabIndex={0} className="btn btn-ghost lg:hidden">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h8m-8 6h16"
//                                 />
//                             </svg>
//                         </button>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//                         >
//                             {links}
//                         </ul>
//                     </div>

//                     <NavLink
//                         to="/"
//                         className="btn btn-ghost normal-case md:text-xl font-bold"
//                     >
//                         Hotel Inner Heritage
//                     </NavLink>
//                 </div>
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1">{links}</ul>
//                 </div>
//                 <div className="navbar-end gap-4 flex items-center">
//                     {user && user.photoURL && (
//                         <div className="relative group">
//                             <img
//                                 src={user.photoURL}
//                                 alt="User Avatar"
//                                 className="w-8 h-8 rounded-full"
//                             />
//                             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-75 py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
//                                 {user.displayName}
//                             </div>
//                         </div>
//                     )}
//                     {user && user.displayName ? (
//                         <div className="flex items-center gap-4">
//                             <button
//                                 className="btn btn-success"
//                                 onClick={handleLogout}
//                             >
//                                 Log Out
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="flex gap-4">
//                             <NavLink to="/register" className="btn" style={{ backgroundColor: "orange", color: "#FFFFFF", border: "none" }}>
//                                 Sign Up
//                             </NavLink>
//                             <NavLink to="/login" className="btn" style={{ backgroundColor: "#FFD700", color: "#000000", border: "none" }}>
//                                 Log In
//                             </NavLink>

//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import React, { useContext } from "react";
import { AuthContext } from "../Provider/authProvider";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await signOutUser();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout error:", error.message);
            alert("Failed to log out. Please try again.");
        }
    };

    const links = (
        <>
            <li>
                <NavLink to="" activeclassname="active">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/rooms" activeclassname="active">
                    Rooms
                </NavLink>
            </li>

            {user && user.displayName && (
                <>
                    <li>
                        <NavLink to="/mybookings" activeclassname="active">
                            My Bookings
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div>
            {user && user.displayName && (
                <div className="bg-[#FEFAE0] text-center py-2">
                    <span className="text-sm font-medium text-[#333533]">
                        Welcome, {user.displayName}!
                    </span>
                </div>
            )}
            <div className="navbar " style={{ backgroundColor: "#e5e4e2" }}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden text-[#FEFAE0]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow"
                            style={{ backgroundColor: "#FEFAE0", color: "#333533" }}
                        >
                            {links}
                        </ul>
                    </div>

                    <NavLink
                        to="/"
                        className="btn btn-ghost normal-case md:text-xl font-bold text-[#3F0113]"
                    >
                        Hotel Inner Heritage
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-[#3F0113]">{links}</ul>
                </div>
                <div className="navbar-end gap-4 flex items-center">
                    {user && user.photoURL && (
                        <div className="relative group">
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <div
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm bg-black bg-opacity-75 py-1 px-2 rounded-lg text-[#3F0113] opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {user.displayName}
                            </div>
                        </div>
                    )}
                    {user && user.displayName ? (
                        <div className="flex items-center gap-4">
                            <button
                                className="btn"
                                style={{
                                    backgroundColor: "#DDA15E",
                                    color: "#3F0113",
                                    border: "none",
                                }}
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <NavLink
                                to="/register"
                                className="btn"
                                style={{
                                    backgroundColor: "#BC6C25",
                                    color: "#3F0113",
                                    border: "none",
                                }}
                            >
                                Sign Up
                            </NavLink>
                            <NavLink
                                to="/login"
                                className="btn"
                                style={{
                                    backgroundColor: "#BC6C25",
                                    color: "#3F0113",
                                    border: "none",
                                }}
                            >
                                Log In
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
