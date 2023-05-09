import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../utils/user-api";

const UserForm = ({ close, item }) => {
  const [fn, setFn] = useState(item.firstName);
  const [ln, setLn] = useState(item.lastName);
  const [un, setUn] = useState(item.username);

  let dispatch = useDispatch();

  const onEdit = () => {
    console.log("fields", fn, ln, un);
    if (fn !== "" || ln !== "" || un !== "") {
      const body = {
        ...item,
        firstName: fn,
        lastName: ln,
        username: un,
      };
      dispatch(editAnnouncement(body));
      close();
    } else {
      alert("Invalid fields");
    }
  };

  return (
    <div
      class="fixed block inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div class="relative top-20 mx-auto p-10 border w-2/5 shadow-2xl rounded-xl bg-white flex flex-col items-center justify-center">
        <p class="text-2xl text-gray-800 font-extrabold "></p>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">First Name:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="name"
            value={fn}
            onChange={(e) => setFn(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Last Name:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="name"
            value={ln}
            onChange={(e) => setLn(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">UserName:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="name"
            value={un}
            onChange={(e) => setUn(e.target.value)}
          />
        </div>

        <div class="flex flex-row items-center justify-between mt-8">
          <button
            onClick={() => close()}
            class="px-6 py-2 border-2 border-indigo-600 rounded-md text-indigo-600 my-2 mx-5"
          >
            Cancel
          </button>
          <button
            onClick={() => onEdit()}
            class="px-6 py-2 border-2 border-indigo-600 bg-indigo-600 rounded-md text-white my-2 mx-5"
          >
            {"Edit Announcement"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
