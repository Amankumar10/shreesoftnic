// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           Admin Panel
//         </Link>
//         <div>
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link" to="/add">
//                 Add User
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React from "react";
import { Link,useLocation,useHistory } from "react-router-dom";



const Navbar = () => {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push("/login");
  };
  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          admin panel
        </Link>
    
       
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
          
          </ul>
          
          {!localStorage.getItem("token") ? 
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              {/* <Link className="btn btn-primary mx-2" to="/signup" role="button">
                Signup
              </Link> */}
            </form>
           : 
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          }
        </div>
   
    </nav>
  );
};

export default Navbar;
