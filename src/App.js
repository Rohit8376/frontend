import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./containers/home";
import Signin from "./containers/signin";
import Signup from "./containers/signup";
import Addcar from "./containers/add_car";
import Display from "./containers/display";



function App() {
  return (
    <>
      
       
     <Router>
       <Switch>
         
       <Route  path='/' exact component={Home}      />
       <Route  path='/signin' component={Signin}    />
       <Route  path='/signup' component={Signup}    />
       <Route  path='/add-new' component={Addcar}   />
       <Route  path='/showcar' component={Display}  />

       </Switch>
     </Router>
      

    </>
  );
}

export default App;
