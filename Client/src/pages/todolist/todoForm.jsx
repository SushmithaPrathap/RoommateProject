import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, postTodo } from "../../Utils/todo-api";

import { fetchUsers } from "../../utils/user-api";

const TodoForm = ({ close, item }) => {
  const [name, setName] = useState(item === "" ? "" : item.todoName);
  const [assign, setAssign] = useState(
    item === "" ? "Harshita" : item.assignedTo
  );
  const [checked, setChecked] = useState(item.checked);

  let dispatch = useDispatch();

  const onSubmit = () => {
    console.log("fields", name, assign);
    if (name !== "") {
      const body = {
        todoName: name,
        assignedTo: assign,
      };
      dispatch(postTodo(body));
      close();
    } else {
      alert("Invalid fields");
    }
  };

  const onEdit = () => {
    console.log("fields", name, assign);
    if (name !== "") {
      const body = {
        ...item,
        todoName: name,
        assignedTo: assign,
        checked,
      };
      dispatch(editTodo(body));
      close();
    } else {
      alert("Invalid fields");
    }
  };

  let itemState = useSelector((store) => {
    return store["users"];
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  let { users } = itemState;

  console.log("uu", users);

  return (
    <div
      class="fixed block inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div class="relative top-20 mx-auto p-10 border w-2/5 shadow-2xl rounded-xl bg-white flex flex-col items-center justify-center">
        <p class="text-2xl text-gray-800 font-extrabold "></p>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Task:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Assign To:</label>
          <select
            value={assign}
            onChange={(e) => setAssign(e.target.value)}
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
          >
            {users.map((item) => (
              <option key={item.id} value={item.firstName}>
                {item.firstName + " " + item.lastName}
              </option>
            ))}
          </select>
        </div>
        {item !== "" && (
          <div class="flex flex-row items-center justify-start w-full my-2">
            <label class="text-xl py-2">Completed?</label>
            <input
              type="checkbox"
              class="text-4xl py-2 ml-5 text-indigo-600"
              value={checked}
              checked={checked}
              onChange={(e) => {
                setChecked(checked ? false : true);
              }}
            />
          </div>
        )}

        <div class="flex flex-row items-center justify-between mt-8">
          <button
            onClick={() => close()}
            class="px-6 py-2 border-2 border-indigo-600 rounded-md text-indigo-600 my-2 mx-5"
          >
            Cancel
          </button>
          <button
            onClick={() => (item === "" ? onSubmit() : onEdit())}
            class="px-6 py-2 border-2 border-indigo-600 bg-indigo-600 rounded-md text-white my-2 mx-5"
          >
            {item === "" ? "Add Task" : "Edit Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
