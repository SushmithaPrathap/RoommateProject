import React from "react";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const ExpenseTable = ({ list, editExpense, deleteExpense }) => {
  return (
    <>
      <table class="w-3/4 border-2 rounded-lg">
        <thead>
          <tr>
            <th class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
              Name
            </th>
            <th class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
              Expense
            </th>
            <th class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
              Created On
            </th>
            <th class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
              Amount
            </th>
            <th class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left"></th>
            <th class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left"></th>
          </tr>
        </thead>
        <tbody>
          {list.length !== 0 ? (
            <>
              {list.map((item) => (
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div>
                        <p class="text-gray-900 whitespace-no-wrap">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {item.expenseName}
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {moment(item.createdDate).format("l")}
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {item.amount}
                    </p>
                  </td>
                  <td
                    onClick={() => editExpense(item)}
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
                  >
                    <FiEdit class="text-gray-800 text-lg ml-3 cursor-pointer" />
                  </td>
                  <td
                    onClick={() => deleteExpense(item.id)}
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
                  >
                    <RiDeleteBin6Line class="text-gray-800 text-lg ml-3 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              <tr>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap text-center">
                    Empty List
                  </p>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ExpenseTable;
