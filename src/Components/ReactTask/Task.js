import React,{memo} from "react";
import styled from "@emotion/styled";
import { Draggable } from "react-beautiful-dnd";

const Container = styled("div")`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  border-radius: 2px;
  padding: 8px;
  background: ${props => (props.isDragging ? "lightgreen" : "white")};
`;

// const shallowCompare = (nextProps,prevProp,) =>  {
//   if (nextProps.task === prevProp.task ) {return true}
// }

const Task = ({ task, index }) => {
  console.log('=========')
  return (
    <Draggable  draggableId={task?.id} index={index} type="TASK">
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {task?.content}
        </Container>
      )}
    </Draggable>
  );
};

export default memo(Task);