import React from 'react'
import { NavLink} from 'react-router-dom';
function Navigation() {
    return (
        <div style={{background:"#981a98"}} >
            <ul style={{display:"flex"}}>
            <li>
                              <NavLink exact activeClassName="active_class" to="/">Home</NavLink>
                           </li>
                  <li>
                              <NavLink exact activeClassName="active_class" to="/Register">Register</NavLink>
                           </li>
                         
                           <li>
                              <NavLink exact activeClassName="active_class" to="/contact">contact</NavLink>
                           </li>
                         
                           <li>
                              <NavLink exact activeClassName="active_class" to="/drag">DragDrop</NavLink>
                           </li>
                           
                           <li>
                              <NavLink exact activeClassName="active_class" to="/take">Take</NavLink>
                           </li>
                           <li>
                              <NavLink exact activeClassName="active_class" to="/food">food</NavLink>
                           </li>
                           <li>
                              <NavLink exact activeClassName="active_class" to="/page">page</NavLink>
                           </li>
                           <li>
                              <NavLink exact activeClassName="active_class" to="/schedule">schedule</NavLink>
                           </li>
                           <li>
                              <NavLink exact activeClassName="active_class" to="/Eventive">Eventive</NavLink>
                           </li>
                     
            </ul>
        </div>
    )
}

export default Navigation
