import React, { Component } from "react";
import styled from "styled-components";


class PanelBar extends Component {
  render() {
    const { hide, dragHandleProps } = this.props;
    return (
      <Bar {...dragHandleProps}>
       
      </Bar>
    );
  }
}

const Bar = styled.div`
  height: 18px;
  background-color: gray;
  padding-top: 2px;
  padding-right: 2px;
  text-align: right;
  &:hover {
    background-color: beige;
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }
`;

export default PanelBar;