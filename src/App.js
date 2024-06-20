// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editTodo, setEditTodo] = useState("")
    useEffect(() => {
        const List = localStorage.getItem("todoList")
        if (List) {
            try {
                setTodos(JSON.parse(List))
            }
            catch (error) {
                console.log(error);
            }

        }

    }, [])

    const updateLocalStorage = (updateTodos) => {
        localStorage.setItem("todoList", JSON.stringify(updateTodos))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo !== "") {
            setTodos(() => {
                const updateTodos = [...todos, todo];
                updateLocalStorage(updateTodos)
                return updateTodos
            })
        }
        setTodo("");
    }

    const handleDelete = (i) => {
        setTodos(() => {
            const updateTodos = todos.filter((item, index) => {
                return i !== index;
            })
            updateLocalStorage(updateTodos)
            return updateTodos
        })
        const updateTodos = todos
        updateLocalStorage(updateTodos)
    }
    const handleEdit = (i) => {
        setTodos(() => {
            const updateTodos = todos.map((item, index) => {
                if (i === index) {
                    return editTodo;
                }
                return item
            })
            updateLocalStorage(updateTodos)
            return updateTodos
        })
        setEditIndex(null);
        const updateTodos = todos
        updateLocalStorage(updateTodos)
    }

    const startEditing = (i, data) => {
        setEditIndex(i);
        setEditTodo(data);
    }
    return (
        <div className='main'>
            <u>
                <h1>TO-DO-APP</h1>
            </u>
            <div className='inputdata'>
                <form onClick={handleSubmit}>
                    <h2>ADD ITEM HERE</h2>
                    <input type='text' value={todo} onChange={e => setTodo(e.target.value)}></input>
                    <br></br>
                    <button type="submit" >Add in Todo-List</button>
                </form>
            </div>

            <div className='mapping'>
                {
                    todos.map((item, index) => {
                        return (
                            <div key={index} className='map'>
                                {
                                    editIndex === index ?
                                        <div>
                                            <input type='text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)}></input>
                                            <br></br>
                                            <button onClick={() => handleEdit(index)}>Done</button>
                                        </div>
                                        :
                                        <div>
                                            <h3>{item}</h3>
                                            <button onClick={() => startEditing(index, item)}>Edit</button>
                                            <button onClick={() => handleDelete(index)} >Delete</button>
                                        </div>
                                }
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default App;
