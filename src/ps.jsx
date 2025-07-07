// 🔁 1. Reducer function
// function FormReducer(state, action) {
//   switch (action.type) {
//     case "UPDATE":
//       return {
//         ...state,
//         [action.field]: action.value,
//       };
//     case "RESET":
//       return {
//         name: "",
//         email: "",
//         message: "",
//       };
//     default:
//       return state;
//   }
// }

// export default function ContactForm() {
//   // 🟡 2. Initial form state
//   const initialState = {
//     name: "",
//     email: "",
//     message: "",
//   };

//   //  3. useReducer hook
//   const [formState, dispatch] = useReducer(FormReducer, initialState);

//   //  4. Handle input changes
//   const handleChange = (e) => {
//     console.log(e.target.name);
//     dispatch({
//       type: "UPDATE",
//       field: e.target.name,
//       value: e.target.value,
//     });
//   };

//   // ✅ 5. Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted Data:", formState);
//     dispatch({ type: "RESET" }); // optional: reset form after submit
//   };
//   console.log(formState);
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📩 Contact Form using useReducer</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label> <br />
//           <input
//             type="text"
//             name="name"
//             value={formState.name}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Email:</label> <br />
//           <input
//             type="email"
//             name="email"
//             value={formState.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Message:</label> <br />
//           <textarea
//             name="message"
//             value={formState.message}
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <button type="submit" style={{ marginTop: "10px" }}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
import { useReducer, useState } from "react";

function TodoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Math.random(), text: action.payload, Completed: false },
      ];
    case "Delete":
      return state.filter((todo) => todo.id !== action.payload);

    case "toggle":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, Completed: !todo.Completed }
          : todo
      );
    default:
      return state;
  }
}

export default function TODOAPP() {
  const [input, setInput] = useState("");
  const [todos, dispatch] = useReducer(TodoReducer, []);

  const addTaskHandler = () => {
    if (input.trim() === "") return;
    dispatch({ type: "ADD", payload: input });
    setInput("");
  };

  const handleDelete = (id) => {
    dispatch({ type: "Delete", payload: id });
  };
  const handleToggle = (id) => {
    console.log("toogle call");
    dispatch({ type: "toggle", payload: id });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Todo App using useReducer</h2>
      <input
        type="text"
        placeholder="Enter task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTaskHandler}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.Completed ? "line-through" : "none",
                color: todo.Completed ? "gray" : "black",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => handleDelete(todo.id)}>❌</button>
            <button onClick={() => handleToggle(todo.id)}>
              {todo.completed ? "Undo" : "✅"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
