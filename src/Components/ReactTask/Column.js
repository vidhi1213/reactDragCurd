import React,{useMemo,memo} from "react";
import styled from "@emotion/styled";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";

const Container = styled("div")`
  margin: 8px;
  border-radius: 2px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  width: 230px;
  background: white;
`;
const Title = styled("h3")`
  padding: 8px;
`;

const TaskList = styled("div")`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  transition: background-color ease 0.2s;
  background-color: ${props =>
    props.isDraggingOver ? "palevioletred" : "white"};
`;
const shallowcompare =(nextProps,prevProps)=>{
  if(nextProps.tasks===prevProps.tasks ){
          return false;
      }
   
}
const Column = ({ tasks, column, index,starter }) => {
// console.log(".....");
  // const factorial = useMemo(() => Tasks(column), [column]);
  // function Tasks(a,b) {
    
  // }
  // const List = React.memo(({ tasks }) => {
  //   // console.log("......");
  //  return (tasks.map((task, index) => (
  //     <Task key={task.id} task={task} index={index} />
  //     )))
  // });
 

   return (
    <>
      <Draggable draggableId={column.id}  index={index} >
        {provided => (
          <Container
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
            <Title> {column.title} </Title>
            <Droppable droppableId={column.id}  type="TASK">
              {(provided, snapshot) => (
                <TaskList
                  isDraggingOver={snapshot.isDraggingOver}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index}  />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    </>
  );
};

export default  memo(Column,shallowcompare);