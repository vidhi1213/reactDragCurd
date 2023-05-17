import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import PanelBar from "./PanelBar";

class Column extends Component {
  renderControls(provided) {
    return (
      <ControlsPanel innerRef={provided.innerRef}>
        Add & remove panel
        <p>Adding controls here</p>
        {this.props.showRemove && <button>Remove</button>}
        <p>
          This panel should be fixed to the right. Add will insert a new module
          - where should it be added?
        </p>
        <p>
          Remove should only show on move so we can drop a module on a trash
          bin.
        </p>
      </ControlsPanel>
    );
  }

  renderItems(provided, items) {
    return (
      <ModuleContainer innerRef={provided.innerRef}>
        {items.map((id, index) => (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
              <Item innerRef={provided.innerRef} {...provided.draggableProps}>
                <ItemHandle {...provided.dragHandleProps} />
                {id}
              </Item>
            )}
          </Draggable>
        ))}
      </ModuleContainer>
    );
  }

  render() {
    const { items, colId, index, specialColumn, isFixed } = this.props;
    const renderedItems = (provided) =>
      specialColumn
        ? this.renderControls(provided)
        : this.renderItems(provided, items);
    return (
      <Draggable
        key={colId}
        draggableId={colId}
        index={index}
        isDragDisabled={isFixed}
      >
        {(provided) => (
          <Wrapper
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            key={colId}
          >
            {!isFixed && (
              <PanelBar dragHandleProps={provided.dragHandleProps} />
            )}
            <Droppable droppableId={colId}>
              {(provided) => [renderedItems(provided), provided.placeholder]}
            </Droppable>
          </Wrapper>
        )}
      </Draggable>
    );
  }
}

const ControlsPanel = styled.div`
  padding: 4px;
  width: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid lightgray;
  min-width: 100px;
  margin: 4px;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Item = styled.div`
  padding: 8px;
  margin: 4px;
  width: auto;
  height: 100px;
  background-color: white;
  border: 2px solid purple;
  border-radius: 4px;
`;

const ItemHandle = styled.div`
  height: 6px;
  border-radius: 3px;
  background-color: lightgray;
  margin-bottom: 4px;

  &:hover {
    background-color: gray;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
`;

const ModuleContainer = styled.div`
  background: lightgray;
  flex: 1;
`;

export default Column;