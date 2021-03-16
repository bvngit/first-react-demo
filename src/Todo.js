import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTtodoClick() {
        toggleTodo(todo.id)
    }
    
    return (
        <div>
            <lebel>
                <input type="checkbox" checked={todo.complete} onChange={handleTtodoClick}></input>
                {todo.name}
            </lebel>
            
        </div>
    )
}
