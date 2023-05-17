import React, { useState ,useEffect} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../Menu/Navigation";
import { useNavigate } from "react-router-dom";
import { deleteContact} from '../../store/action';
function Table() {
    const [users, setUsers] = useState()
    let history = useNavigate();
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contact.userlist);
    useEffect(()=>{
      // setUsers(JSON.parse(localStorage.getItem('result')))
      setUsers(contacts)
      },[contacts]);
    const editdata=(id)=>{
      history(`/Register/${id}`)
      }
      const deletedata = (id) =>{
        dispatch(deleteContact(id))
    }
    return (
        <>  
       { console.log("contacts",users)}
        <Navigation/>  
      <div className="container"> 
      <div className="row">

        <div className="col-12">
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {users?.map((data,i)=>{
                  return(
                    <tr>
                    <th scope="row">{i+1}</th>
                    <td>{data.fname}</td>
                    <td>{data.lname}</td>
                    <td>{data.email}</td>
                    <td>
                      <a className="btn btn-primary mr-2">
                        View
                </a>
                      <a onClick={()=>{editdata(data.id)}}
                        className="btn btn-primary mr-2"
                       
                      >
                        Edit
                </a>
             
                      <a onClick={()=>{deletedata(data.id)}}
                        className="btn btn-danger"
                        
                      >
                        Delete
                </a>
                    </td>
                    {/* <td  onClick={()=>{editdata(data.id)}}> Edit</td> */}
                  </tr>
                  )
             })}
               
               

            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>  
    )
}

export default Table
