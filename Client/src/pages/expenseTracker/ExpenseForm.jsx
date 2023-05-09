import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postExpense, editExpense } from "../../utils/expense-api";
import { fetchUsers } from "../../utils/user-api";

const ExpenseForm = ({ close, item }) => {
  const [name, setName] = useState(item === "" ? "Harshita" : item.name);
  const [expense, setExpense] = useState(item === "" ? "" : item.expenseName);
  const [amount, setAmount] = useState(item === "" ? "" : item.amount);
  const [date, setDate] = useState(
    item === "" ? "" : moment(item.createdDate).format("YYYY-MM-DD")
  );

  let dispatch = useDispatch();

  const onSubmit = () => {
    if (name !== "" && amount !== "") {
      const body = {
        name,
        expenseName: expense,
        amount,
        createdDate: date,
        houseId: "64408b189542db903a9281e1",
      };
      dispatch(postExpense(body));
      close();
    } else {
      alert("Invalid fields");
    }
  };

  const onEdit = () => {
    if (name !== "" && amount !== "") {
      const body = {
        ...item,
        name,
        expenseName: expense,
        amount,
      };
      dispatch(editExpense(body));
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
        {/* <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Name:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div> */}
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Name:</label>
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
          >
            {users.map((item) => (
              <option key={item.id} value={item.firstName}>
                {item.firstName + " " + item.lastName}
              </option>
            ))}
          </select>
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Expense:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="expense"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Amount:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Created Date:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div class="flex flex-row items-center justify-between mt-8">
          <button
            onClick={() => {
              setName("");
              setAmount("");
              setExpense("");
              setDate("");
              close();
            }}
            class="px-6 py-2 border-2 border-indigo-600 rounded-md text-indigo-600 my-2 mx-5"
          >
            Cancel
          </button>
          <button
            onClick={() => (item === "" ? onSubmit() : onEdit())}
            class="px-6 py-2 border-2 border-indigo-600 bg-indigo-600 rounded-md text-white my-2 mx-5"
          >
            {item === "" ? "Add Expense" : "Edit Expense"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
