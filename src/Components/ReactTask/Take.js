import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "reset-css";
import ReactDOM from "react-dom";
import initialData from "./Data";
import Column from "./Column";
import Navigation from "../Menu/Navigation";

const Container = styled("div")`
  display: flex;
  background-color: ${props => (props.isDraggingOver ? "#639ee2" : "inherit")};
`;

const reorder = (array, startIndex, endIndex) => {
  const result = Array.from(array);

  const previousItem = result[endIndex];
  const [removed] = result.splice(startIndex, 1);

  if (previousItem) {
    (removed).index = (previousItem).index;
  }
  result.splice(endIndex, 0, removed);
  return result;
};

const InnerList = ({ column, taskMap, index }) => {
  const tasks = column.taskIds.map((task) => taskMap[task.id]);
  return <Column key={column.id}  column={column} tasks={tasks} index={index} />;
}

const Take = () => {

  const [starter, setStarter] = useState(initialData);

  const onDragEnd = ({ destination, source, draggableId, type }) => {

    if (!destination) { return; }

    if ( destination.droppableId === source.droppableId && destination.index === source.index ) { return; }

    if (type === "COLUMN") {

      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
    
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      setStarter(newState)
      this.setState(newState);
      // console.log(destination, source, draggableId);
      // const newOrder = [...starter.columnOrder];
      // newOrder.splice(source.index, 1);
      // newOrder.splice(destination.index, 0, draggableId);

      // setStarter({
      //   ...starter,
      //   columnOrder: newOrder
      // });
      // return;
      // setStarter({
      //   ...starter,
      //   columnOrder: reorder(
      //     starter.columnOrder,
      //     source.index,
      //     destination.index
      //   )
      // });
      // return;
    }

    const start = starter.columns[source.droppableId];
    const end = starter.columns[destination.droppableId];

    if (start === end) {
      const newColumn = {
        ...start,
        taskIds: reorder(start.taskIds, source.index, destination.index)
      };

      const newState = {
        ...starter,
        columns: {
          ...starter.columns,
          [newColumn.id]: newColumn
        }
      };
      setStarter(newState);
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const endTaskIds = Array.from(end.taskIds);
    endTaskIds.splice(destination.index, 0, {
      id: draggableId,
      index: "test"
    });
    const newEnd = {
      ...end,
      taskIds: endTaskIds
    };

    const newState = {
      ...starter,
      columns: {
        ...starter.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd
      }
    };
    setStarter(newState);
  };

  return (
    <>
    <Navigation/>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDragging={snapshot.isDragging}
          >
            {starter.columnOrder.map((columnId, index) => {
              const column = starter.columns[columnId];

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  index={index}
                  taskMap={starter.tasks}
                />
              );
            })}
            {provided.placeholder}
            <div className="ToData">
              <h3 className="css-1veigam">Add Section</h3>
              <div className="Add_More"></div>
            </div>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
    </>
  );
};
export default Take;