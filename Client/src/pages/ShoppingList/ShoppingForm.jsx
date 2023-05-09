import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editShoppinglist,
  postShoppinglist,
} from "../../Utils/shoppinglist-api";

const ShoppingItemForm = ({ close, item }) => {
  const [name, setName] = useState(item === "" ? "" : item.itemName);
  const [quantity, setQuantity] = useState(item === "" ? "" : item.quantity);
  const [unit, setUnit] = useState(item === "" ? "" : item.unit);
  const [category, setCategory] = useState(item === "" ? "" : item.category);
  const [checked, setChecked] = useState(item.checked);

  let dispatch = useDispatch();

  const onSubmit = () => {
    console.log("fields", name, quantity, category);
    if (name !== "" && quantity !== "") {
      const body = {
        itemName: name,
        quantity: quantity,
        unit,
        category,
      };
      dispatch(postShoppinglist(body));
      close();
    } else {
      alert("Invalid fields");
    }
  };

  const onEdit = () => {
    console.log("fields", name, quantity, category);
    if (name !== "" && quantity !== "") {
      const body = {
        ...item,
        itemName: name,
        quantity: quantity,
        unit,
        category,
        checked,
      };
      dispatch(editShoppinglist(body));
      close();
    } else {
      alert("Invalid fields");
    }
  };

  const categories = [
    { category: "Produce", id: "1" },
    { category: "Dairy", id: "2" },
    { category: "Snacks", id: "3" },
    { category: "Pantry", id: "4" },
    { category: "Meat", id: "5" },
    { category: "Desserts", id: "6" },
    { category: "Misc", id: "7" },
  ];

  return (
    <div
      class="fixed block inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div class="relative top-20 mx-auto p-10 border w-2/5 shadow-2xl rounded-xl bg-white flex flex-col items-center justify-center">
        <p class="text-2xl text-gray-800 font-extrabold "></p>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Item Name:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Item Quantity:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Unit:</label>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
            type="text"
            name="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start justify-start w-full my-2">
          <label class="text-sm py-2">Categories:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 sm:text-sm"
          >
            {categories.map((item) => (
              <option key={item.id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
        {item !== "" && (
          <div class="flex flex-row items-center justify-start w-full my-2">
            <label class="text-xl py-2">bought?</label>
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
            {item === "" ? "Add Item" : "Edit Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingItemForm;
