import { Switch, BrowserRouter, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Alert from "./pages/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);}
  return (
    <BrowserRouter>
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">
        <Switch>
          <Route exact path="/" showAlert={showAlert} component={Home}  />
          <Route path="/add" component={AddUser} />
          <Route path="/edit/:id" showAlert={showAlert} component={EditUser} />
          <Route exact path="/signup">
            <Signup showAlert={showAlert} /></Route>
       
            <Route exact path="/login">
            <Login showAlert={showAlert} /> </Route>
      
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
