import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'space-around' }}>
      <TodoList />
      <ImageSearch />
      <RandomColor />
    </div>
  );
}

// TodoList Component
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    const updatedTodo = prompt('Chỉnh sửa công việc', todos[index]);
    if (updatedTodo) {
      const newTodos = [...todos];
      newTodos[index] = updatedTodo;
      setTodos(newTodos);
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '20px', width: '300px' }}>
      <h2>Todo List</h2>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Nội dung công việc"
      />
      <button onClick={addTodo}>Thêm</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ listStyleType: 'none', marginTop: '10px' }}>
            <input type="checkbox" />
            {todo}
            <button onClick={() => editTodo(index)}>Chỉnh sửa</button>
            <button onClick={() => deleteTodo(index)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ImageSearch Component (Updated with Pixabay API)
function ImageSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageResults, setImageResults] = useState([]);
  const [error, setError] = useState('');

  const searchImage = async () => {
    if (searchQuery.trim() === '') {
      setError('Bạn cần nhập từ khóa tìm kiếm');
      return;
    }
    setError(''); // Clear any previous errors
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${searchQuery.trim()}&image_type=photo`
      );
      const data = await response.json();
      if (data.hits.length > 0) {
        setImageResults(data.hits);
      } else {
        setImageResults([]);
        setError('Không tìm thấy hình ảnh.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi tải hình ảnh.');
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '20px', width: '300px' }}>
      <h2>Tìm kiếm hình ảnh</h2>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Tìm kiếm hình ảnh"
      />
      <button onClick={searchImage}>Tìm</button>
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {imageResults.length > 0 ? (
          <div>
            {imageResults.map((image) => (
              <div key={image.id} style={{ margin: '10px 0' }}>
                <img src={image.previewURL} alt={image.tags} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        ) : (
          <p>Không tìm thấy hình ảnh.</p>
        )}
      </div>
    </div>
  );
}

// RandomColor Component
function RandomColor() {
  const [currentColor, setCurrentColor] = useState('');
  const [colorHistory, setColorHistory] = useState([]);

  const changeColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColor(randomColor);
    setColorHistory([...colorHistory, randomColor]);
  };

  const undoColor = () => {
    if (colorHistory.length > 0) {
      const newHistory = [...colorHistory];
      newHistory.pop();
      setCurrentColor(newHistory[newHistory.length - 1] || '');
      setColorHistory(newHistory);
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '20px', width: '300px' }}>
      <h2>Random Color</h2>
      <button onClick={changeColor}>Change Background Color</button>
      <button onClick={undoColor} disabled={colorHistory.length === 0}>Undo</button>
      <div>Current Color: <span style={{ backgroundColor: currentColor }}>{currentColor}</span></div>
      <div>Color History: {colorHistory.join(', ')}</div>
    </div>
  );
}

export default App;
