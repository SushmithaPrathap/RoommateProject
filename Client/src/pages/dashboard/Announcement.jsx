import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/UserNavbar/UserNavBar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteAnnouncement,
  fetchAnnouncementList,
} from "../../Utils/announcement-api";
import AnForm from "./AnForm";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Annoucement = () => {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");
  let dispatch = useDispatch();

  let itemState = useSelector((store) => {
    return store["announcements"];
  });

  useEffect(() => {
    dispatch(fetchAnnouncementList()); //dispatch the action to call the api
  }, [dispatch]);

  let { loading, announcementList, error } = itemState;

  console.log("list", announcementList);

  const onDelete = (id) => {
    dispatch(deleteAnnouncement(id));
    alert("Successful delete");
    refreshList();
  };

  const refreshList = () => {
    dispatch(fetchAnnouncementList());
  };

  return (
    <div>
      <UserNavBar text="Announcements" path="announcements"></UserNavBar>
      <div class="flex flex-col items-center justify-center mt-10">
        <button
          onClick={() => {
            setItem("");
            setShow(true);
          }}
          class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-2"
        >
          Create Announcement
        </button>
        <div className="p-10 m-5 rounded-lg flex flex-row items-start justify-start flex-wrap">
          {announcementList.map((item) => (
            <div
              key={item._id}
              className="bg-indigo-200 p-5 rounded-lg m-5 flex flex-col items-start justify-start"
            >
              <div className="flex flex-row items-center justify-center m-3">
                {/* <label class="m-1 text-sm font-semibold text-left">
                  Announcement:{" "}
                </label> */}
                <p class="text-gray-900 m-1 font-semibold text-xl whitespace-no-wrap text-justify">
                  {item.text}
                </p>
              </div>
              <div className="flex flex-row items-center justify-center m-3">
                <label class="m-1 text-sm font-semibold text-left">
                  Created By:{" "}
                </label>
                <p class="text-gray-900 m-1 font-semibold text-xl whitespace-no-wrap ">
                  {item.createdBy}
                </p>
              </div>
              <div className="flex flex-row items-center justify-center m-3">
                <label class="m-1 text-sm font-semibold text-left">
                  Created Date:{" "}
                </label>
                <p class="text-gray-900 m-1 font-semibold text-xl whitespace-no-wrap">
                  {moment(item.createdDate).format("l")}
                </p>
              </div>
              <div className="flex flex-row items-center justify-around m-2">
                <FiEdit
                  onClick={() => {
                    setItem(item);
                    setShow(true);
                  }}
                  class="text-gray-800 text-lg ml-3 cursor-pointer"
                />
                <RiDeleteBin6Line
                  onClick={() => onDelete(item.id)}
                  class="text-gray-800 text-lg ml-3 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        {show && <AnForm close={() => setShow(false)} item={item} />}
      </div>
    </div>
  );
};

export default Annoucement;
