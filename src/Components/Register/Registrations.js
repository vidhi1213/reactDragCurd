import React, { useState ,useEffect,useRef} from "react";
import { addContact ,getContact} from '../../store/action';
import { useNavigate } from "react-router-dom";
import Navigation from "../Menu/Navigation";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { Schedule } from "@syncfusion/ej2-react-schedule";

function Registrations() {
    let history = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const contacts = useSelector((state) => state.contact.userlist);
    const [editFlag,setEditFlag]=useState(false)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [user, setUser] = useState({
          //  id:new Date().getTime().toString(),
          fname:"",
          lname:"",
          email:"",
          password:"",
          cpassword:"",
          number:"",
    });
   
    useEffect(()=>{
     const editUser = contacts && contacts.length > 0 && id !== undefined && contacts.find(item=> item.id === id)
     setUser(editUser)
      id !== undefined && setEditFlag(true)
  },[])
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
    const Validator = useRef(new SimpleReactValidator({
      autoForceUpdate: this,
      messages: {
        in: 'Passwords do not match',
    },
      validators: {
          FirstName: {  // name the rule
              message: 'First  Name is required',
              rule: (val, params, validator) => {
                return validator.helpers.testRegex(val, /^([a-zA-Z ' -]*)$/i) && params.indexOf(val) === -1
              },
              required: true  // optional
            },
          LastName: {  // name the rule
            message: 'First  Name is required',
            rule: (val, params, validator) => {
              return validator.helpers.testRegex(val, /^([a-zA-Z ' -]*)$/i) && params.indexOf(val) === -1
            },
              required: true  // optional
          },
          emails: {  // name the rule

            message: 'Please use a valid emails ',
           
            rule: (val, params, validator) => {
              return validator.helpers.testRegex(val, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i) && params.indexOf(val) === -1
            },
          // optional
            required: true  // optional
          },
          password: {  // name the rule

            message: 'Password must be at least 8 characters and include one lowercase letter, one uppercase letter, and one digit ',
            rule: (val, params, validator) => {
              return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,30}$/) && params.indexOf(val) === -1
              // return validator.helpers.testRegex(val, /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/) && params.indexOf(val) === -1
              // const strongRegex = new RegExp(
              //   "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
              //   "gm"
              // );
            },
          // optional
            required: true  // optional
          },
          mobile: {  // name the rule

            message: 'Please use a valid mobiles',
           
            rule: (val, params, validator) => {
              return validator.helpers.testRegex(val, /^[0-9]{10}$/) && params.indexOf(val) === -1
            },
          // optional
            required: true  // optional
          },
      }
  }))
    const onSubmit =  e => {
      e.preventDefault();
      if (Validator.current.allValid()){
      if(editFlag) {
        dispatch(getContact(user))
        history('/contact')
     }
     else{
      user.id=Math.random().toString()
      dispatch(addContact(user));
      history('/contact')
     }
     Validator.current.hideMessages()
      }
    else{
      Validator.current.showMessages()
      forceUpdate()
    }
    };
    console.log("user",user);
    return (
      <>
      <Navigation/>
    
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Registration Form</h2>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
               id="fname"
               type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your first name"
                name="fname"
                value={user.fname}
                onChange={e => onInputChange(e)}
              />
              <div style={{color : 'red'}}>{Validator.current.message('fname', user.fname, 'required|FirstName')} </div>
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
               <div style={{color : 'red'}}>{Validator.current.message('lname', user.lname, 'required|LastName')} </div>
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
               <span style={{color : 'red'}}>    {Validator.current.message('email', user.email, 'required|emails')}</span>
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
               <span style={{color : 'red'}}>{Validator.current.message('password', user.password, 'required')}</span>
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
               <span style={{color : 'red'}}>    {Validator.current.message('cpassword', user.cpassword, `required|in:${user.password}`)}</span>
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
              <span style={{color : 'red'}}>    {Validator.current.message('number', user.number, 'required|mobile')}</span>
            <button className="btn btn-primary btn-block">Add User</button>
          </form>
        </div>
      </div>
      </>
    );
}


export default Registrations







