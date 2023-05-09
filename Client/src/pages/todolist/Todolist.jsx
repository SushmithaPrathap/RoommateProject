import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/UserNavbar/UserNavBar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteTodo, editTodo, fetchTodoList } from "../../Utils/todo-api";
import TodoForm from "./todoForm";

const TodoList = () => {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");
  let dispatch = useDispatch();

  let itemState = useSelector((store) => {
    return store["todo"];
  });

  useEffect(() => {
    dispatch(fetchTodoList()); //dispatch the action to call the api
  }, [dispatch]);

  let { loading, todoList, error } = itemState;

  console.log("list", todoList);

  const onDelete = (id) => {
    dispatch(deleteTodo(id));
    alert("Successful delete");
    refreshList();
  };

  const refreshList = () => {
    dispatch(fetchTodoList());
  };

  const check = (item, flag) => {
    const body = {
      ...item,
      checked: flag,
    };
    dispatch(editTodo(body));
  };

  return (
    <div>
      <UserNavBar text="Todo List" path="todolist"></UserNavBar>
      <div class="flex flex-col items-center justify-center mt-10">
        <button
          onClick={() => {
            setItem("");
            setShow(true);
          }}
          class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-2"
        >
          Create To do Item
        </button>
        <div className="p-10 m-5 rounded-lg flex flex-row items-start justify-start flex-wrap">
          {todoList.map((item) => (
            <div
              key={item._id}
              className="bg-indigo-200 p-5 rounded-lg m-5 flex flex-col items-start justify-start"
            >
              <div className="flex flex-row items-center justify-center m-3">
                <label class="m-1 text-sm font-semibold text-left">Task:</label>
                <p class="text-gray-900 m-1 font-semibold text-md whitespace-no-wrap text-justify">
                  {item.todoName}
                </p>
              </div>
              <div className="flex flex-row items-center justify-center m-3">
                <label class="m-1 text-sm font-semibold text-left">
                  Assigned To:{" "}
                </label>
                <p class="text-gray-900 m-1 font-semibold text-md whitespace-no-wrap ">
                  {item.assignedTo}
                </p>
              </div>
              <div className="flex flex-row items-center justify-center m-3">
                <label class="m-1 text-sm font-semibold text-left">
                  Created Date:{" "}
                </label>
                <p class="text-gray-900 m-1 font-semibold text-md whitespace-no-wrap">
                  {moment(item.createdDate).format("l")}
                </p>
              </div>
              <div className="flex flex-row items-center justify-around m-2">
                <p class="m-1 text-sm font-semibold text-left">Completed?</p>
                <input
                  type="checkbox"
                  class="text-4xl py-2 ml-5 text-indigo-600"
                  value={item.checked}
                  checked={item.checked}
                  onChange={(e) => {
                    let flag = item.checked ? false : true;
                    check(item, flag);
                  }}
                />
              </div>
              <div className="flex flex-row items-center justify-around m-2">
                <FiEdit
                  onClick={() => {
                    setItem(item);
                    setShow(true);
                  }}
                  class="text-gray-800 text-lg ml-3 cursor-pointer"
                />
                <RiDeleteBin6Line
                  onClick={() => onDelete(item.id)}
                  class="text-gray-800 text-lg ml-3 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        {show && <TodoForm close={() => setShow(false)} item={item} />}
      </div>
    </div>
  );
};

export default TodoList;
