import { useState, useEffect } from "react";

import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ShoppingCartIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import UserNavBar from "../../components/UserNavbar/UserNavBar";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../api/context";
import { apiAuth, apiUsers } from "../../api";

const actions = [
  {
    title: "Chore Chart",
    href: "/chorechart",
    icon: ClockIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
    descrption:
      "Assign specific tasks to individual housemates on a rotating basis",
  },
  {
    title: "Shopping List",
    href: "/shopping",
    icon: ShoppingCartIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    descrption:
      " The application has a shared shopping list that allows housemates to add, edit, and delete items",
  },
  {
    title: "To-Do List",
    href: "/todolist",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
    descrption: "Manage their daily tasks and responsibilities efficiently.",
  },
  // {
  //   title: "Events",
  //   href: "#",
  //   icon: BanknotesIcon,
  //   iconForeground: "text-yellow-700",
  //   iconBackground: "bg-yellow-50",
  //   descrption:
  //     "Allows housemates to stay informed about upcoming community events, activities, and meetings.",
  // },
  {
    title: "Announcements",
    href: "/announcements",
    icon: ReceiptRefundIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
    descrption:
      "Communicate important information quickly and efficiently. It provides a central platform for sharing updates, news, and announcements with all members of the House.",
  },
  {
    title: "Expense Tracker",
    href: "/expenseTracker",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
    descrption:
      "Allows housemates to track expenses related to rent, utilities, groceries, and other household expenses. It enables housemates to split bills, track payments, and view expense reports.",
  },
  {
    title: "House Members",
    href: "/members",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
    descrption:
      "Allows housemates to track expenses related to rent, utilities, groceries, and other household expenses. It enables housemates to split bills, track payments, and view expense reports.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const history = useNavigate();
  const [house, setHouse] = useState({});
  const [state, setState] = useState({
    user: null,
  });

  // const { auth, setAuth } = useAuth();
  // useEffect(() => {
  //   if (auth?.user) {
  //     setState({ ...state, user: auth.user });
  //   } else {
  //     apiUsers
  //       .getProfile()
  //       .then((res) => {
  //         if (res.data._id) {
  //           // For local read/update/delete
  //           setState({ ...state, user: res.data });
  //           // For local auth context
  //           // setAuth({ ...auth, user: res.data });
  //           //For persistent auth
  //           //    apiAuth.setAuth({ ...auth, user: res.data });
  //         }
  //       })
  //       .catch((err) => {
  //         // Choose your error notification
  //         // console.log("err", err);
  //       });
  //   }
  //   console.log(state.user);
  // }, []);
  // if (apiAuth.isAuth === false) {
  //   //  history("/login")
  // }
  function logoutHandler() {
    apiAuth.logout();
  }
  // useEffect(() => {
  //   if (state.user) {
  //     console.log(state);
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };

  //     fetch(
  //       `http://localhost:9000/api/v1/users/${state.user._id}/house`,
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((result) => setHouse(result))
  //       .catch((error) => console.log("error", error));
  //   }

  //   console.log(house.isMember);
  // }, [state.user]);
  // if (house.isMember === false) {
  //   return <Navigate to="/dashboard/new"></Navigate>;
  // }
  // if (house.isMember === true) {
  // console.log("yes memeber");

  let token = localStorage.getItem("authentication");

  return (
    <>
      {token ? (
        <div className="bg-indigo-200 h-screen">
          <UserNavBar logoutHandler={logoutHandler}></UserNavBar>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 item-center justify-center">
              {actions.map((action, actionIdx) => (
                <div
                  key={action.title}
                  className={classNames(
                    actionIdx === 0
                      ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                      : "",
                    actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                    actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                    actionIdx === actions.length - 1
                      ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                      : "",
                    "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                  )}
                >
                  <div>
                    <span
                      className={classNames(
                        action.iconBackground,
                        action.iconForeground,
                        "rounded-lg inline-flex p-3 ring-4 ring-white"
                      )}
                    >
                      <action.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <a href={action.href} className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        {action.title}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {action.descrption}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/Login"} />
      )}
    </>
  );
}
// }
