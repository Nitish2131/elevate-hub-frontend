import useUserStore from "../store/user";
import { removeToken } from "../helper";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Dropdown, Menu } from "antd";

export const Nav = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const signInBtnClick = () => navigate("/signin");
  const signUpStudentBtnClick = () => navigate("/signup/student");
  const signUpMentorBtnClick = () => navigate("/signup/mentor");

  const onButtonClick = () => {
    removeToken();
    setUser(null);
    navigate("/");
  };

  const menu = (
    <Menu
      className="border border-gray-200 rounded-lg shadow-md"
      style={{ backgroundColor: "white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <Menu.Item key="1" className="text-gray-700 hover:bg-green-100 hover:text-green-600 transition duration-200">
        <NavLink className="text-base font-medium" to="/dashboard/profile" style={{ color: "inherit" }}>
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2" className="text-gray-700 hover:bg-green-100 hover:text-green-600 transition duration-200">
        <button onClick={onButtonClick} className="w-full text-base text-left font-medium" style={{ color: "inherit" }}>
          Logout
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="inline-flex items-center mr-8">
              <span className="ml-2 text-2xl font-bold text-green-700">Elevate Hub</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          {!user && (
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 focus:outline-none">
                <span className="text-2xl">&#9776;</span>
              </button>
            </div>
          )}

          {/* Desktop Navigation (Visible only when user is not logged in) */}
          {!user ? (
            <ul className="items-center hidden space-x-8 lg:flex">
              <li>
                <button
                  onClick={signUpMentorBtnClick}
                  className="h-12 px-6 font-medium tracking-wide text-gray border-4 border-green-500 bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300 hover:text-white"
                >
                  Become a Mentor with Us
                </button>
              </li>
              <li>
                <button
                  onClick={signInBtnClick}
                  className="font-medium tracking-wide text-green-500 hover:text-green-700 transition-all duration-300"
                >
                  Sign in
                </button>
              </li>
              <li>
                <button
                  onClick={signUpStudentBtnClick}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300"
                >
                  Sign up
                </button>
              </li>
            </ul>
          ) : (
            <Dropdown overlay={menu} trigger={["hover"]}>
              <button className="flex items-center justify-center font-medium tracking-wide text-white bg-green-500 transition-all duration-300 border-2 border-green-500 rounded-full w-10 h-10 hover:bg-green-600 hover:shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </button>
            </Dropdown>
          )}

          {/* Mobile Menu (Only for non-logged-in users) */}
          {!user && isMobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 space-y-4 lg:hidden z-10">
              <button
                onClick={signUpMentorBtnClick}
                className="block w-full text-center py-2 font-medium tracking-wide text-gray-800 border-4 border-green-500 bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300 hover:text-white"
              >
                Become a Mentor with Us
              </button>
              <button
                onClick={signInBtnClick}
                className="block w-full text-center py-2 font-medium tracking-wide text-green-500 hover:text-green-700 transition-all duration-300"
              >
                Sign in
              </button>
              <button
                onClick={signUpStudentBtnClick}
                className="block w-full text-center py-2 font-medium tracking-wide text-white bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
