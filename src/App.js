 import React ,{useEffect,useState}from 'react';
 import './index.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Routes, Route } from "react-router-dom";
import "./styles/App.scss";

import Navigation from './Components/Menu/Navigation';
import Table from './Components/DataTable/Table';
import Home from './Components/Home/Home';
import Registrations from './Components/Register/Registrations';
import Index from './Components/DragDrop/Index'
import Take from './Components/ReactTask/Take';
import Header from './Components/Header';
import Axios from 'axios'
import Recipes from './Components/Recipes';
import Pagination from './Components/Pagination';

import Schedulecal from './Components/Schedulecal';
import Eventive from './Components/Eventive';


function App() {
  return (
   <>
    
      
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Register' element={<Registrations/>}/>
    <Route path='/Register/:id' element={<Registrations/>}/>
    <Route path='/contact' element={<Table/>}/>
    <Route path='/drag' element={<Index/>}/>
    <Route path='/take' element={<Take/>}/>
    <Route path='/food' element={<Header  />}/>
    <Route path='/page' element={<Pagination  />}/>
    <Route path='/schedule' element={<Schedulecal  />}/>
    <Route path='/Eventive' element={<Eventive/>}/>
   </Routes>
  


   </>
  );
}

// // export default App;
// const { useEffect, useState, } = React;
// // const { DragDropContext, Draggable, Droppable } = ReactBeautifulDnd;

// const DATA = [
//   {
//     id: 'af1',
//     label: 'Incoming leads',
//     items: [
//       {id: 'af2', label: 'Item 1'},
//       {id: 'af3', label: 'Item 2'},
//     ],
//     tint: 1,
//   },
//   {
//     id: 'af4',
//     label: 'Closing leads',
//     items: [
//       {id: 'af5', label: 'Item 1'}, 
//       {id: 'af6', label: 'Item 2'}, 
//     ],
//     tint: 2,
//   },
//   {
//     id: 'af7', label: 'On hold', 
//     items: [
//       {id: 'af8', label: 'Item 1'}, 
//       {id: 'af9', label: 'Item 2'}, 
//     ],
//     tint: 3,
//   }, 
// ];

// function App()
// {
//   return (
//     <div className='layout__wrapper'>
//       <div className='layout__header'>
//         <div className='app-bar'>
//           <div className='app-bar__title'>
//             Sales Overview
//           </div>
//         </div>
//       </div>
//       <LeadsOverview />
//     </div>
//   );
// }

// function LeadsOverview() {
//   const [items, setItems] = useState([]);
//   const [groups, setGroups] = useState({});
  
//   useEffect(() => {
//     // Mock an API call.
//     buildAndSave(DATA);
//   }, []);
  
//   function buildAndSave(items)
//   {
//     const groups = {};
//     for (let i = 0; i < Object.keys(items).length; ++i) {
//       const currentGroup = items[i];
//       groups[currentGroup.id] = i;
//     }
    
//     // Set the data.
//     setItems(items);
    
//     // Makes the groups searchable via their id.
//     setGroups(groups);
//   }
  
//   return (
//     <div className='data'>
//       <div className='u-main'>
      
//     <DragDropContext  
//       onDragEnd={(result) => {
//         const { destination, draggableId, source, type, } = result;

//         if (!destination) {
//           return;
//         }

//         if (destination.droppableId === source.droppableId && destination.index === source.index) {
//           return;
//         }
        
//         if ('group' === type) {
//           const sourceIndex = source.index;
//           const targetIndex = destination.index;
          
//           const workValue = items.slice();
//           const [deletedItem, ] = workValue.splice(sourceIndex, 1);
//           workValue.splice(targetIndex, 0, deletedItem);

//           buildAndSave(workValue);
          
//           return;
//         }

//         const sourceDroppableIndex = groups[source.droppableId];
//         const targetDroppableIndex = groups[destination.droppableId];
//         const sourceItems = items[sourceDroppableIndex].items.slice();
//         const targetItems = source.droppableId !== destination.droppableId ? items[targetDroppableIndex].items.slice() : sourceItems;
        
//         // Pull the item from the source.
//         const [deletedItem, ] = sourceItems.splice(source.index, 1);
//         targetItems.splice(destination.index, 0, deletedItem);
        
//         const workValue = items.slice();
//         workValue[sourceDroppableIndex] = {
//           ...items[sourceDroppableIndex],
//           items: sourceItems,
//         };
//         workValue[targetDroppableIndex] = {
//           ...items[targetDroppableIndex],
//           items: targetItems,
//         };
        
        
//         setItems(workValue);
//       }}
//     >
//       <Droppable droppableId='ROOT' type='group' >
//         {(provided) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {items.map((item, index) => (
//               <Draggable 
//                 draggableId={item.id}
//                 key={item.id}
//                 index={index}
//               >
//                 {(provided) => (
//                   <div
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     ref={provided.innerRef}
//                   >
//                     <DroppableList
//                       key={item.id}
//                       {...item}
//                     />
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//     </div>
//     </div>
   
//   );
// }

// function DroppableList({ id, items, label, tint, })
// {
//   return (
    
//     <Droppable droppableId={id} >
//       {(provided) => (
//         <div 
//           {...provided.droppableProps}
//           ref={provided.innerRef} 
          
//         >
//           <div >
//           <div className={`holder holder--tint-${tint} `} >
//             <div className='holder__title'>
//               {label}
//             </div>
//             <div className='holder__content'>
//               <ul className='list'>
//                 {items.map((item, index) => (
//                   <li 
//                     className='list__item'
//                     key={item.id}
//                   >
//                     <Draggable 
//                       draggableId={item.id}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <div
//                           className='card'
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           ref={provided.innerRef}
//                         >
//                           {item.label}
//                         </div>
//                       )}
//                     </Draggable>
//                   </li>
//                 ))}
//                 {provided.placeholder}
//               </ul>
//             </div>
//           </div>
//           </div>
//         </div>
//       )}
//     </Droppable>
       
//   );
// }
export default App;