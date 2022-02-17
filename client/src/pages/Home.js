import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";


const Home = () => {
  let history = useHistory();
  const [users, setUsers] = useState();

  useEffect(() => {
    if(localStorage.getItem('token')){
     
      
      const fetchUsers = async () => {
        const res = await fetch(`http://localhost:5000/user`);
        const data = await res.json();
        setUsers(data);
      };

      fetchUsers();
    }
    else{
      history.push("/login")
 }
 
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row">
    
    {/* <div>
           <ul className="btn">
             <li className="nav-item">
               <Link className="nav-link" to="/add">
                 Add User
               </Link>
             </li>
           </ul>
         </div> */}



         {/* <button type="button" className="btn btn-primary"> */}
           
         <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/add" role="button">
               Add User
              </Link></form>





      {users?.map((user) => (
        <div className="col-md-3 card me-2 mt-1 p-0" key={user._id}>
          <h6>profileImage:-  <img src={user.avatar} alt="" width={"50%"} height={100} /></h6>
         
          <div className="p-1" >
            <h6>name:-{user.name}</h6>
            <h6>email:-{user.email}</h6>
            <h6>address:-{user.address}</h6>
            <h6>mentor:-{user.mentor}</h6>
            <h6>village:-{user.village}</h6>
            <h6>groupLeader:-{user.groupLeader}</h6>
            <h6>memberNumber:-{user.memberNumber}</h6>
            <h6>phone:-{user.phone}</h6>
            <h6>birthDay:-{user.birthDay}</h6>
            <h6>birthMonth:-{user.birthMonth}</h6>
            <h6>birthYear:-{user.birthYear}</h6>
         

            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/edit/${user._id}`} style={{ textDecoration: "none" }}>
                Edit
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(user._id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
