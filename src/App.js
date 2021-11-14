// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { Button, DatePicker, Input ,Checkbox } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import {Container} from './components/Container'
import { TodoItem } from './components/TodoItems';
import { ACTIVE, add_todo, ALL, COMPLETED, set_filter } from './store/actions';


const Title = styled.h1`
text-align: center;
margin-bottom: 10px;
`
const InputBlock = styled.div`
display: flex;
justify-content: space-between;
`
function App() {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');


  const todos = useSelector((state) => state.todos);
  const currentFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch()

  function onChange(date) {
    // console.log(date, dateString);
    setDate(date)
  }
  const onAdd = () => {
    dispatch(add_todo(text, date))
    setText('')
  }

  
  const filtered_todos = () => {
    switch (currentFilter) {
      case ALL:
        return todos;
      case COMPLETED:
        return todos.filter((el)=> el.checked === true);
      case ACTIVE:
        return todos.filter((el)=> el.checked === false);
      default:
        return todos
    }
  }
  return (
    <div className="App">
      <Container>
        <Title>Todo list</Title>
        <InputBlock>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="type smth..."
            style={{ width: 350 }}
          />
          <DatePicker value={date} onChange={onChange} />
          <Button onClick={onAdd} type="primary">
            Add
          </Button>
        </InputBlock>
        <div>
          <Checkbox
            checked={currentFilter === ALL}
            style={{ marginRight: 10 }}
            onChange={() => {
              dispatch(set_filter(ALL));
            }}
          >
            All
          </Checkbox>
          <Checkbox
            checked={currentFilter === COMPLETED}
            style={{ marginRight: 10 }}
            onChange={() => {
              dispatch(set_filter(COMPLETED));
            }}
          >
            Completed
          </Checkbox>
          <Checkbox
            checked={currentFilter === ACTIVE}
            style={{ marginRight: 10 }}
            onChange={() => {
              dispatch(set_filter(ACTIVE));
            }}
          >
            Active
          </Checkbox>
        </div>
        <div>
          {filtered_todos().map((el, id) => {
            return <TodoItem key={id} id={id} todo={el} />;
          })}
        </div>
      </Container>
    </div>
  );
}

export default App;

