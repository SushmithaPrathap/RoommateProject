import React, { useEffect, useState } from "react";
import ShoppingCategories from "./ShoppingCategories";
import { Dairy, Pantry, produce, Snacks } from "./data.js";
import UserNavBar from "../../components/UserNavbar/UserNavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteShoppinglist,
  editShoppinglist,
  fetchShoppinglist,
} from "../../Utils/shoppinglist-api";
import ShoppingItemForm from "./ShoppingForm";
import { ColorRing } from "react-loader-spinner";

const ShoppingList = () => {
  let dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");

  //fetch data from the redux store
  let itemState = useSelector((store) => {
    return store["shoppinglist"];
  });

  let { loading, shoppingList, error } = itemState;

  useEffect(() => {
    dispatch(fetchShoppinglist()); //dispatch the action to call the api
    // renderFunc();
  }, [dispatch]);

  console.log("list", shoppingList);

  let obj = {};
  shoppingList.forEach((item) => {
    if (item.category in obj) {
      obj[item.category].push(item);
    } else {
      obj[item.category] = [item];
    }
  });
  console.log("obj", obj);

  const onDelete = (id) => {
    dispatch(deleteShoppinglist(id));
    alert("Successful delete");
    refreshList();
  };

  const refreshList = () => {
    dispatch(fetchShoppinglist());
  };

  const handleCheck = (item, flag) => {
    const body = {
      ...item,
      checked: flag,
    };
    dispatch(editShoppinglist(body));
  };

  return (
    <div>
      <UserNavBar text={"Shopping List"} path={"shopping"} />
      <div class="flex flex-row items-center justify-center mt-10">
        <button
          onClick={() => {
            setItem("");
            setShow(true);
          }}
          class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-2"
        >
          New Item
        </button>
      </div>
      <div className="p-10 rounded-lg m-5 flex flex-row items-start justify-center flex-wrap">
        {Object.keys(obj).map((key) => (
          <ShoppingCategories
            name={key}
            list={obj[key]}
            edit={(item) => {
              setItem(item);
              setShow(true);
            }}
            deleteFunc={(id) => onDelete(id)}
            check={(item, flag) => handleCheck(item, flag)}
          />
        ))}
      </div>

      {show && <ShoppingItemForm close={() => setShow(false)} item={item} />}

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
  );
};

export default ShoppingList;
