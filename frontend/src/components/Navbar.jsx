import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="flex justify-between items-center bg-gray-100 px-6 py-3 shadow-md">
      {/* Logo / Brand */}
      <h2 className="text-2xl font-semibold text-red-600">MERN Todo</h2>

      {/* Links or Buttons */}
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            Welcome, <span className="text-red-600  p-5 uppercase ">{user?.name}</span>
          </span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-red-500 transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
