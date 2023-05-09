import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const ShoppingCategories = ({ list, name, edit, deleteFunc, check }) => {
  return (
    <div class="bg-white rounded-lg w-auto m-5">
      <p class="text-lg text-white text-center bg-indigo-600 rounded-t-lg p-2">
        {name}
      </p>
      <table class="p-3 rounded-b-lg border-2">
        <thead>
          <tr>
            <th class="p-5 bg-white text-sm text-left">Item</th>
            <th class="p-5 bg-white text-sm text-left">Quantity</th>
            <th class="p-5 bg-white text-sm text-left">Bought?</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr>
              <td class="p-5 bg-white text-sm bg-indigo-200">
                {item.itemName}
              </td>
              <td class="p-5 bg-white text-sm bg-indigo-200">
                {item.quantity} {item.unit}
              </td>
              <td class="p-5 bg-white text-sm bg-indigo-200">
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
              </td>
              <td class="p-5 bg-white text-sm bg-indigo-200">
                <FiEdit
                  onClick={() => edit(item)}
                  class="text-gray-800 text-lg ml-3 cursor-pointer"
                />
              </td>
              <td class="p-5 bg-white text-sm bg-indigo-200">
                <RiDeleteBin6Line
                  onClick={() => deleteFunc(item.id)}
                  class="text-gray-800 text-lg ml-3 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingCategories;
