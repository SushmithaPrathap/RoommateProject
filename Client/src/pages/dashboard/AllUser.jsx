import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/UserNavbar/UserNavBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../utils/user-api";
import { RiDeleteBin6Line } from "react-icons/ri";

const AllUser = () => {
  let dispatch = useDispatch();

  let itemState = useSelector((store) => {
    return store["users"];
  });

  useEffect(() => {
    dispatch(fetchUsers()); //dispatch the action to call the api
  }, [dispatch]);

  let { loading, users, error } = itemState;

  console.log("list", users);

  const onDelete = (id) => {
    dispatch(deleteUser(id));
    alert("Successful delete");
    refreshList();
  };

  const refreshList = () => {
    dispatch(fetchUsers());
  };

  return (
    <div>
      <UserNavBar text="House Members" path="members"></UserNavBar>
      <div className="p-10 m-5 rounded-lg flex flex-row">
        {users.map((item) => (
          <div
            key={item._id}
            className="bg-indigo-200 p-5 rounded-lg m-5 flex flex-col items-start justify-start"
          >
            <div className="flex flex-row items-center justify-center m-3">
              <label class="m-1 text-sm text-left">UserName: </label>
              <p class="text-gray-900 m-1 font-semibold text-md whitespace-no-wrap">
                {item.username}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center m-3">
              <label class="m-1 text-sm text-left">First Name: </label>
              <p class="text-gray-900 m-1 font-semibold text-md whitespace-no-wrap">
                {item.firstName}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center m-3">
              <label class="m-1 text-sm text-left">Last Name: </label>
              <p class="text-gray-900 m-1 font-semibold text-md whitespace-no-wrap">
                {item.lastName}
              </p>
            </div>
            <div className="flex flex-row items-center justify-around m-2">
              {/* <FiEdit
                onClick={() => {
                  setItem(item);
                  setShow(true);
                }}
                class="text-gray-800 text-lg ml-3 cursor-pointer"
              /> */}
              <RiDeleteBin6Line
                onClick={() => onDelete(item._id)}
                class="text-gray-800 text-lg ml-3 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
