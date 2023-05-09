import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/UserNavbar/UserNavBar";
import ChoreForm from "./ChoreForm";
import ChoreTable from "./ChoreTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteChore, fetchChoreList } from "../../utils/chore-api";
import { ColorRing } from "react-loader-spinner";

export default function ChoreChart() {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChoreList());
  }, [dispatch]);

  //fetch data from the redux store
  let itemState = useSelector((store) => {
    return store["chore"];
  });

  let { loading, choreList, error } = itemState;

  const onDelete = (id) => {
    dispatch(deleteChore(id));
    alert("Successful delete");
    refreshList();
  };

  const refreshList = () => {
    dispatch(fetchChoreList());
  };

  return (
    <div>
      <UserNavBar text="Chore Chart" path="chorechart"></UserNavBar>

      <div class="flex flex-row items-center justify-center mt-10">
        <button
          onClick={() => {
            setItem("");
            setShow(true);
          }}
          class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-2"
        >
          Create Chore
        </button>
      </div>
      <div className="flex flex-row items-center justify-center">
        <ChoreTable
          list={choreList}
          editChore={(item) => {
            setItem(item);
            setShow(true);
          }}
          deleteChore={(id) => onDelete(id)}
        />
      </div>

      {show && <ChoreForm close={() => setShow(false)} item={item} />}

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
}
