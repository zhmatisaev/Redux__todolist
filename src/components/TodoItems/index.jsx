import { Button, Checkbox } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { delete_todo, edit_todo, toggle_todo } from "../../store/actions";

const ItemContainer = ({ after, children }) => {
  return after ? <Item>{children}</Item> : <Item after>{children}</Item>;
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  background-color: ${(props) => {
    return props.after ? "pink" : "beige";
  }};
  padding: 8px;
  border-radius: 5px;
`;
export const TodoItem = ({ todo, id, currentFilter }) => {
  const dispatch = useDispatch();

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
    dispatch(toggle_todo(id, e.target.checked));
  }

  const deadline = moment(todo.deadline).format("MMMM Do YYYY");
  const after = moment(todo.deadline).isAfter(moment());
  return (
    <ItemContainer after={after}>
      <input
        disabled={currentFilter !== "ALL"}
        style={{ border: "none", background: "none" }}
        type="text"
        value={todo.text}
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(edit_todo(id, e.target.value));
        }}
      />

      <i style={{ textDecoration: todo.checked ? "line-through" : "none" }}>
        {deadline}
      </i>
      <div>
        <Checkbox
          checked={todo.checked}
          style={{ marginRight: 10 }}
          onChange={onChange}
        ></Checkbox>
        <Button
          type="primary"
          danger
          onClick={() => {
            dispatch(delete_todo(id));
          }}
        >
          delete
        </Button>
      </div>
    </ItemContainer>
  );
};
