import { useEffect } from "react";
import {
  ADD_TODO,
  ALL,
  COMPLETED,
  DELETE_TODO,
  EDIT_TODO,
  set_filter,
  SET_FILTER,
  TOGGLE_TODO,
} from "../actions";

const initialState = {
  todos: [],
  filter: ALL,
  nextId: 0,
};

const toSave = (obj) => {
  localStorage.setItem("state", JSON.stringify(obj));
};

const localData = JSON.parse(localStorage.getItem("state"));

export const rootReducer = (
  state = localData ? localData : initialState,
  action
) => {
  switch (action.type) {
    case ADD_TODO:
      let obj = {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.text,
            deadline: action.date,
            checked: false,
          },
        ],
      };
      toSave(obj);
      return obj;
    case DELETE_TODO:
      let obj2 = {
        ...state,
        todos: state.todos.filter((_, id) => id !== action.id),
      };
      toSave(obj2);
      return obj2;
    case TOGGLE_TODO:
      let obj3 = {
        ...state,
        todos: state.todos.map((todo, id) => {
          return id === action.id ? { ...todo, checked: action.value } : todo;
        }),
      };
      toSave(obj3);
      return obj3;
    case EDIT_TODO:
      let obj4 = {
        ...state,
        todos: state.todos.map((todo, id) => {
          return id === action.id ? { ...todo, text: action.text } : todo;
        }),
      };
      toSave(obj4);
      return obj4;
    case SET_FILTER:
      let obj5 = {
        ...state,
        filter: action.filter,
      };
      toSave(obj5);
      return obj5;
    default:
      return state;
  }
};
