/* This example requires Tailwind CSS v3.0+ */
import { useMutation, QueryClient } from "@tanstack/react-query";
import { createHouse } from "../../api/house/house";
import { apiAuth, apiUsers } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../api/context";

export default function CreateHouse() {
  const nav = useNavigate();
  const { mutate, isLoading } = useMutation(
    (data) => {
      createHouse(data);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        const message = "success";
        alert(message);
      },
      onError: () => {
        alert("there was an error");
      },
      onSettled: () => {
        nav("/dashboard");
      },
    }
  );
  const [state, setState] = useState({
    user: null,
  });

  const { auth, setAuth } = useAuth();
  useEffect(() => {
    if (auth?.user) {
      setState({ ...state, user: auth.user });
    } else {
      apiUsers
        .getProfile()
        .then((res) => {
          if (res.data._id) {
            // For local read/update/delete
            setState({ ...state, user: res.data });
            // For local auth context
            // setAuth({ ...auth, user: res.data });
            //For persistent auth
        //    apiAuth.setAuth({ ...auth, user: res.data });
          }
        })
        .catch((err) => {
          // Choose your error notification
          // console.log("err", err);
        });
    }
    console.log(state.user);
  }, []);
  const handleSubmit = (event) => {
    const user  = state.user

    event.preventDefault();
    console.log(user);
    var raw = JSON.stringify({
      name: event.target.houseName.value,
      users: [
        {
          user: user._id,
        },
      ],
    });
    mutate(raw);
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white">
            Welcome to Uuke 🏠
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Create a New House
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div>
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                {" "}
                <label
                  htmlFor="email"
                  className="block text-x font-medium text-white"
                >
                  House Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="houseName"
                    id="houseName"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="13Perry"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create House
                </button>
              </form>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient
                id="827591b1-ce8c-4110-b064-7cb85a0b1217"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
