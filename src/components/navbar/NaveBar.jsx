import { NavLink } from "react-router-dom";

const NaveBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary p-4">
      <div className="container-fluid container-lg">
        <a className="navbar-brand text-white" href="/">
          Gjensidige's Hotel
        </a>
        <button
          className="navbar-toggler bg-white "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-lg-flex justify-content-between"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                // exact

                aria-current="page"
                to="/all-rooms"
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link text-white "
                    : " nav-link text-white "
                }
              >
                Brows all rooms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link text-white "
                    : " nav-link text-white "
                }
                to="/admin"
              >
                Admin
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link text-white "
                    : " nav-link text-white "
                }
                to="/find-booking"
              >
                Find my Booking
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="#"
              >
                Account
              </a>
              <ul className="dropdown-menu bg-white">
                <li>
                  <NavLink
                    className="dropdown-item bg-white text-black"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item bg-white text-black"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item bg-white text-black"
                    to="/logout"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NaveBar;
