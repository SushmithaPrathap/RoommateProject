import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/UserNavbar/UserNavBar";
import ExpenseForm from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  fetchExpenseByName,
  fetchExpenseList,
  fetchExpenseByDate,
} from "../../utils/expense-api";
import ExpenseTable from "./ExpenseTable";
import { ColorRing } from "react-loader-spinner";
import DonutChart from "react-donut-chart";
import { fetchUserList, fetchUsers } from "../../utils/user-api";
// import { AuthContext } from "../../api/context";

const ExpenseTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [item, setItem] = useState("");

  // const {user} = AuthContext()

  let dispatch = useDispatch();

  //fetch data from the redux store
  let itemState = useSelector((store) => {
    return store["expense"];
  });

  useEffect(() => {
    dispatch(fetchExpenseList()); //dispatch the action to call the api
    // dispatch(fetchUserList());
  }, [dispatch]);

  let { loading, expenseList, error } = itemState;

  // let { userList } = itemState1;

  console.log("list", expenseList);

  const onDelete = (id) => {
    dispatch(deleteExpense(id));
    refreshList();
    alert("Successful delete");
  };

  const searchFunc = () => {
    let query = {
      name: searchText,
    };
    dispatch(fetchExpenseByName(query));
  };

  const searchDateFunc = () => {
    let query = {
      createdOn: searchDate,
    };
    dispatch(fetchExpenseByDate(query));
  };

  const resetFunc = () => {
    setSearchText("");
    dispatch(fetchExpenseList());
  };

  const resetDateFunc = () => {
    setSearchDate("");
    dispatch(fetchExpenseList());
  };

  const refreshList = () => {
    dispatch(fetchExpenseList());
  };

  let sum = 0;
  expenseList.forEach((item) => {
    sum = sum + item.amount;
  });

  const outputArray = expenseList.map((item) => {
    const { name, amount } = item;
    const label = name;
    const value = amount;

    return { label, value };
  });

  const expenseArray = expenseList.map((item) => {
    const { expenseName, amount } = item;
    const label = expenseName;
    const value = amount;

    return { label, value };
  });

  let itemState1 = useSelector((store) => {
    return store["users"];
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  let { users } = itemState1;

  console.log("uu", users);

  return (
    <div>
      <UserNavBar text="Expense Tracker" path="expenseTracker"></UserNavBar>
      <div class="bg-white px-8 rounded-md w-full">
        <div class="flex flex-row items-start justify-between my-8">
          <p class="text-3xl  text-gray-900"> Expenses</p>
          <button
            onClick={() => {
              setItem("");
              setShowForm(true);
            }}
            class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer self-center"
          >
            New Expense
          </button>
        </div>
        <div class="flex flex-row items-start justify-between my-5">
          <div class="flex flex-col">
            <label for="floatingInput" class="text-sm text-black">
              Search an Expense
            </label>
            <div class="flex flex-row items-center justify-center">
              <input
                class="bg-white-500 px-2 py-3 rounded-lg border-2 border-gray-400 my-2 placeholder:italic placeholder:text-slate-400"
                type="text"
                name="expense"
                placeholder="search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                onClick={() => searchFunc()}
                class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-2"
              >
                Search
              </button>
              <p
                onClick={() => resetFunc()}
                class="text-indigo-600 font-semibold tracking-wide cursor-pointer ml-2 underline"
              >
                Reset
              </p>
            </div>
          </div>
          {/* <div class="flex flex-col">
            <label for="floatingInput" class="text-sm text-black">
              Select a date
            </label>
            <div class="flex flex-row items-center justify-center">
              <input
                class="bg-white-500 px-2 py-3 rounded-lg border-2 border-gray-400 my-2 placeholder:italic placeholder:text-slate-400"
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
              <button
                onClick={() => searchDateFunc()}
                class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-2"
              >
                Filter
              </button>
              <p
                onClick={() => resetDateFunc()}
                class="text-indigo-600 font-semibold tracking-wide cursor-pointer ml-2 underline"
              >
                Reset
              </p>
            </div>
          </div> */}
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row items-start justify-start">
            <ExpenseTable
              list={expenseList}
              editExpense={(item) => {
                setItem(item);
                setShowForm(true);
              }}
              deleteExpense={(id) => onDelete(id)}
            />

            <div className="flex flex-col items-center justify-center">
              <div class="rounded-xl items-center justify-center flex flex-row ml-20 p-6 bg-indigo-600 my-4">
                <div class="text-center">
                  <span class="text-white text-2xl font-bold my-5">
                    Total Expenditure
                  </span>
                  <h1 class="text-4xl font-bold text-white">$ {sum}</h1>
                </div>
              </div>
              <div class="rounded-xl items-center justify-center flex flex-row ml-20 p-6 bg-indigo-600 my-4">
                <div class="text-center">
                  <h2 className="text-2xl text-white">
                    Amount owed by each person
                  </h2>
                  <h4 class="text-2xl font-bold text-white">
                    {" "}
                    $ {sum / users.length}
                  </h4>
                </div>
              </div>
              {/* <div className="border-2 border-gray-600 p-5 m-5">
                <h2 className="text-2xl text-grey-800">
                  Amount owed by each person
                </h2>
                <h4 class="text-2xl font-bold text-indigo">
                  {" "}
                  $ {sum / users.length}
                </h4>
              </div> */}
            </div>
          </div>

          <div class="p-10">
            <h2 class="text-2xl font-bold text-indigo-800 m-5 my-10 text-center">
              Expenditure Stats
            </h2>
            <div class="flex flex-col items-center justify-center">
              <div>
                <h2 class="text-lg font-bold text-grey-800 m-5 my-10 text-center">
                  Person Wise
                </h2>
                <div class="border-2 border-indigo-600 m-3 p-5 rounded-lg">
                  <DonutChart data={outputArray} width={"650"} height={"450"} />
                </div>
              </div>
              <div>
                <h2 class="text-lg font-bold text-grey-800 m-5 my-10 text-center">
                  Expense Wise
                </h2>
                <div class="border-2 border-indigo-600 m-3 p-5 rounded-lg">
                  <DonutChart
                    data={expenseArray}
                    width={"650"}
                    height={"450"}
                  />
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#7988d2", "#5c6dc9", "#3f54be", "#2f41a7", "#27379b"]}
            />
          )}
        </div>
      </div>

      {showForm && <ExpenseForm close={() => setShowForm(false)} item={item} />}
    </div>
  );
};

export default ExpenseTracker;
