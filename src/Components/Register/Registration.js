import React, { useState ,useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
// import Menu from './Components/navigation/Menu';
import Cookies from 'js-cookie';
import Navigation from "../Menu/Navigation";


function Registration() {
    let history = useNavigate();
    const [user, setUser] = useState({
          fname:"",
          lname:"",
          email:"",
          password:"",
          cpassword:"",
          number:"",
    });
    useEffect(()=>{
      // if(localStorage.getItem('result'))
      // {
      //   history.replace('/');
      // }
    });
  
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
   
    const onSubmit = async e => {
      e.preventDefault();
      try { 
      
        // const data = await axios.post("http://localhost:3004/register", user);
        const alldata = JSON.parse(localStorage.getItem('result'));
        if (!alldata) {
          let temarray = [];
          temarray.push(user);
          localStorage.setItem("result",JSON.stringify(temarray))
          // temarray.push(data);
        }
        else {
          alldata.push(user);
          
          localStorage.setItem("result",JSON.stringify(alldata))
        }
        
        history("/contact");
      }
      catch (error) {
        console.log("error",error);
      }
      //  Cookies.set("user",'fdsojfspodijfosfjho');
    };
    return (
      <>
      <Navigation/>
    
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Registration Form</h2>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
               id="fame"
               type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your first name"
                name="fname"
                value={user.fname}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
               id="lname"
               type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your last Name"
                name="lname"
                value={user.lname}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
               id="Email"
               type="email"
                className="form-control form-control-lg"
                placeholder="Enter Your E-mail Address"
                name="email"
                value={user.email}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
               id="password"
               type="password"
                className="form-control form-control-lg"
                placeholder="Enter Your password"
                name="password"
                value={user.password}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
               id="cpassword"
               type="password"
                className="form-control form-control-lg"
                placeholder="Enter Your confirm password"
                name="cpassword"
                value={user.cpassword}
                onChange={e => onInputChange(e)}
              />
            </div>
            <div className="form-group">
                <input type="text"
                 className="form-control form-control-lg"
                 maxLength="10"
                  minLength="10"
                  name="number"
                  value={user.number}
                  onChange={e => onInputChange(e)}
                  placeholder="Contact no" />
              </div>
            <button className="btn btn-primary btn-block">Add User</button>
          </form>
        </div>
      </div>
      </>
    );
}

export default Registration
