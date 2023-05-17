// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import styled from "styled-components";
// // import "./styles.css";
// import Column from "./Column";
// import Navigation from "../Menu/Navigation";

// const initialState = {
//   dragging: false,
//   panelStatus: "first-render" | "initialized", // not used yet
//   panelItems: {
//     "module-1": { id: "module-1", component: <div>1</div> }, //componentName: 'DevelopmentServerPane' },
//     "module-2": { id: "module-2", component: <div>2</div> }, //componentName: 'TaskRunnerPane' },
//     "module-3": {
//       id: "module-3",
//       component: <div>3</div>
//       // componentName: 'DependencyManagementPane',
//     }
//   },
//   // we could also name this panels instead of columns
//   columns: [
//     {
//       id: "column-1",
//       panelItemIds: ["module-1", "module-2", "module-3"],
//       width: 0 // calculated if panelStatus === 'first-render'
//     },
//     {
//       id: "column-2",
//       panelItemIds: [],
//       width: 0 // calculated if panelStatus === 'first-render'
//     },
//     {
//       id: "column-3",
//       panelItemIds: [],
//       width: 0 // calculated if panelStatus === 'first-render'
//     }
//   ],
//   columnOrder: ["column-1", "column-2", "column-3"]
// };

// class Index extends Component {
//   state = initialState;

//   onDragStart = result => {
//     console.log("dragstart", result);

//     this.setState({
//       dragging: true
//     });
//   };
//   onDragEnd = ({ destination, source, type }) => {
//     console.log("dragend", destination, source, type);
//     this.setState({
//       dragging: false
//     });

//     if (!destination) {
//       return;
//     }

//     if (type === "COLUMN") {
//       console.log(destination, source, type);
//       this.setState(state => ({
//         columnOrder: reorder(state.columnOrder, source.index, destination.index)
//       }));
//       return;
//     }

//     const { index: sourceIndex } = source;
//     const column = this.state.columns.find(
//       col => col.id === destination.droppableId
//     );
//     const colIndex = this.state.columns.indexOf(column);
//     const { index: targetIndex } = destination;
//     const panelItemIds = this.state.columns[colIndex].panelItemIds;

//     if (source.droppableId === destination.droppableId) {
//       // same column
//       // columns:
//       // [
//       //   {id: , ...},
//       //   {id: , ...}
//       // ]
//       this.setState({
//         columns: [
//           ...this.state.columns.slice(0, colIndex),
//           {
//             ...column,
//             panelItemIds: reorder(panelItemIds, sourceIndex, targetIndex)
//           },
//           ...this.state.columns.slice(colIndex + 1)
//         ]
//       });
//     } else {
//       // other column
//       let sourceColumn = this.state.columns.find(
//         col => col.id === source.droppableId
//       );
//       const sourceColumnIndex = this.state.columns.indexOf(sourceColumn);
//       let newColumns = this.state.columns.slice();

//       // remove item from sourceColumn
//       newColumns[sourceColumnIndex] = {
//         ...sourceColumn
//       };
//       const itemToMove =
//         newColumns[sourceColumnIndex].panelItemIds[sourceIndex];
//       newColumns[sourceColumnIndex].panelItemIds.splice(sourceIndex, 1);

//       // add item to targetColumn
//       newColumns[colIndex].panelItemIds = [
//         ...newColumns[colIndex].panelItemIds.slice(0, targetIndex),
//         itemToMove,
//         ...newColumns[colIndex].panelItemIds.slice(targetIndex)
//       ];

//       this.setState(state => ({ columns: newColumns }));
//     }
//   };

//   getPanelItems = (columns, colId) =>
//     columns.find(col => col.id === colId).panelItemIds;

//   render() {
//     const { columns, columnOrder } = this.state;

//     const board = (
//       <>
//       <Navigation/>
//       <Droppable droppableId="board" type="COLUMN" direction="horizontal">
//         {provided => (
//           <Container innerRef={provided.innerRef} {...provided.droppableProps}>
//             {columnOrder.map((colId, index) => (
//               <Column
//                 colId={colId}
//                 items={this.getPanelItems(columns, colId)}
//                 index={index}
//                 key={colId}
//               />
//             ))}
//             <Column
//               specialColumn={true}
//               isFixed={true}
//               showRemove={this.state.dragging}
//             />
//           </Container>
//         )}
//       </Droppable>
//       </>
//     );
//     return (
//       <DragDropContext
//         onDragStart={this.onDragStart}
//         onDragEnd={this.onDragEnd}
//       >
//         {board}
//       </DragDropContext>
//     );
//   }
// }

// const Container = styled.div`
//   display: flex;
// `;

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const rootElement = document.getElementById("root");
// export default Index;
import React from 'react';
import { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Navigation from '../Menu/Navigation';
const { useEffect, useState, } = React;

// const { DragDropContext, Draggable, Droppable } = ReactBeautifulDnd;

const DATA = [
  {
    id: 'af1',
    label: 'Incoming leads',
    items: [
      {id: 'af2', label: 'Item 1'},
      {id: 'af3', label: 'Item 2'},
    ],
    tint: 1,
  },
  {
    id: 'af4',
    label: 'Closing leads',
    items: [
      {id: 'af5', label: 'Item 1'}, 
      {id: 'af6', label: 'Item 2'}, 
    ],
    tint: 2,
  },
  {
    id: 'af7', label: 'On hold', 
    items: [
      {id: 'af8', label: 'Item 1'}, 
      {id: 'af9', label: 'Item 2'}, 
    ],
    tint: 3,
  }, 
];

function Index()
{
  return (
    <>
    <Navigation/>
    <div className='layout__wrapper'>
      <div className='layout__header'>
        <div className='app-bar'>
          <div className='app-bar__title'>
            Sales Overview
          </div>
        </div>
      </div>
      <LeadsOverview />
    </div>
    </>
  );
}

function LeadsOverview() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState({});
  
  useEffect(() => {
    // Mock an API call.
    buildAndSave(DATA);
  }, []);
  
  function buildAndSave(items)
  {
    const groups = {};
    for (let i = 0; i < Object.keys(items).length; ++i) {
      const currentGroup = items[i];
      groups[currentGroup.id] = i;
    }
    
    // Set the data.
    setItems(items);
    
    // Makes the groups searchable via their id.
    setGroups(groups);
  }
  
  return (
    <>
   
    <DragDropContext 
      onDragEnd={(result) => {
        const { destination, draggableId, source, type, } = result;

        if (!destination) {
          return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
          return;
        }
        
        if ('group' === type) {
          const sourceIndex = source.index;
          const targetIndex = destination.index;
          
          const workValue = items.slice();
          const [deletedItem, ] = workValue.splice(sourceIndex, 1);
          workValue.splice(targetIndex, 0, deletedItem);

          buildAndSave(workValue);
          
          return;
        }

        const sourceDroppableIndex = groups[source.droppableId];
        const targetDroppableIndex = groups[destination.droppableId];
        const sourceItems = items[sourceDroppableIndex].items.slice();
        const targetItems = source.droppableId !== destination.droppableId ? items[targetDroppableIndex].items.slice() : sourceItems;
        
        // Pull the item from the source.
        const [deletedItem, ] = sourceItems.splice(source.index, 1);
        targetItems.splice(destination.index, 0, deletedItem);
        
        const workValue = items.slice();
        workValue[sourceDroppableIndex] = {
          ...items[sourceDroppableIndex],
          items: sourceItems,
        };
        workValue[targetDroppableIndex] = {
          ...items[targetDroppableIndex],
          items: targetItems,
        };
        
        
        setItems(workValue);
      }}
    >
      <Droppable droppableId='ROOT' type='group'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable 
                draggableId={item.id}
                key={item.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <DroppableList
                      key={item.id}
                      {...item}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <div className='holder holder--tint-2'>
      <div className='holder__title'>Closing leads</div>
      <div className='holder__content'>
        <ul className='list'>
          <li className='list__item'>
            <div className="card">item 7</div>
          </li>
          <li className='list__item'>
            <div className="card">item 8</div>
          </li>
        </ul>
      </div>
    </div>
   
    </>
    
  );
}

function DroppableList({ id, items, label, tint, })
{
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={`holder holder--tint-${tint}`}>
            <div className='holder__title'>
              {label}
            </div>
            <div className='holder__content'>
              <ul className='list'>
                {items.map((item, index) => (
                  <li 
                    className='list__item'
                    key={item.id}
                  >
                    <Draggable 
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className='card'
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {item.label}
                        </div>
                      )}
                    </Draggable>
                  </li>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Index;