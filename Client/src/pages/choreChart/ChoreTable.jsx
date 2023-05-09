import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../utils/user-api";

const ChoreTable = ({ list, editChore, deleteChore }) => {

  let dispatch = useDispatch();

  const days = [
    { day: "Monday", id: "1" },
    { day: "Tuesday", id: "2" },
    { day: "Wednesday", id: "3" },
    { day: "Thursday", id: "4" },
    { day: "Friday", id: "5" },
    { day: "Saturday", id: "6" },
    { day: "Sunday", id: "7" },
  ];

  let itemState = useSelector((store) => {
    return store["users"];
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  let { users } = itemState;

  console.log("uu", users);

  return (
    <>
      <table class="bg-pink-100 w-10/12 border-2 rounded-lg mt-10 self-center">
        <thead>
          <tr>
            <th class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left"></th>
            {days.map((item) => (
              <th
                key={item.id}
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left"
              >
                {item.day}
              </th>
            ))}
          </tr>
        </thead>
        {/* {people.map((item) => (
          <tr key={item.id}>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {item.name}
            </td>
          </tr>
        ))} */}

        <tbody>
          {users.map((person) => (
            <tr key={person.id}>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {person.firstName + " " + person.lastName}
              </td>
              {days.map((day) => {
                const chores = list.filter(
                  (c) => c.day === day.day && c.assignedTo === person.firstName
                );
                return (
                  <td
                    class="px-3 py-5 border-2 border-gray-200 bg-white text-sm bg-indigo-200"
                    key={day.id}
                  >
                    {chores.map((item) => (
                      <>
                        <div
                          class={
                            item.checked
                              ? "flex flex-row items-center justify-center my-2 bg-red-200 rounded-md p-1 line-through"
                              : "flex flex-row items-center justify-center my-2 bg-indigo-200 rounded-md p-1"
                          }
                        >
                          <p class="text-lg text-gray-800 text-left">
                            {item.choreName}
                          </p>
                          <FiEdit
                            onClick={() => editChore(item)}
                            class="text-gray-800 text-lg ml-3 cursor-pointer"
                          />
                          <RiDeleteBin6Line
                            onClick={() => deleteChore(item.id)}
                            class="text-gray-800 text-lg ml-3 cursor-pointer"
                          />
                        </div>
                      </>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ChoreTable;
