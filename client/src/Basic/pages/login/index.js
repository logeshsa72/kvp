import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PRODUCT_ADMIN_HOME_PATH } from "../../../Route/urlPaths";
import { LOGIN_API } from "../../../Api";
import Loader from "../../components/Loader";
import { generateSessionId } from "../../../Utils/helper";
import secureLocalStorage from "react-secure-storage";
import Modal from "../../../UiComponents/Modal";
import { BranchAndFinyearForm } from "../../components";
  import logo from '../../../assets/pin.png'


const BASE_URL = process.env.REACT_APP_SERVER_URL;


const Login = () => {
  const [isGlobalOpen, setIsGlobalOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [planExpirationDate, setPlanExpirationDate] = useState("");
  const navigate = useNavigate();

  const data = { username, password };

  const loginUser = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: BASE_URL + LOGIN_API,
      data: data,
    }).then(
      (result) => {
        if (result.status === 200) {
          if (result.data.statusCode === 0) {
            sessionStorage.setItem("sessionId", generateSessionId());
            if (!result.data.userInfo.roleId) {
              secureLocalStorage.setItem(
                sessionStorage.getItem("sessionId") + "userId",
                result.data.userInfo.id
              );
              secureLocalStorage.setItem(
                sessionStorage.getItem("sessionId") + "username",
                result.data.userInfo.username
              );
              secureLocalStorage.setItem(
                sessionStorage.getItem("sessionId") + "superAdmin",
                true
              );
              navigate(PRODUCT_ADMIN_HOME_PATH);
            } else {
              const currentPlanActive =
                result.data.userInfo.role.company.Subscription.some(
                  (sub) => sub.planStatus
                );
              if (currentPlanActive) {
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") + "employeeId",
                  result.data.userInfo.employeeId
                );
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") + "userId",
                  result.data.userInfo.id
                );
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") + "username",
                  result.data.userInfo.username
                );
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") + "userEmail",
                  result.data.userInfo.email
                );
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") + "userCompanyId",
                  result.data.userInfo.role.companyId
                );
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") + "defaultAdmin",
                  JSON.stringify(result.data.userInfo.role.defaultRole)
                );
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") + "userRoleId",
                  result.data.userInfo.roleId
                );
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") +
                    "latestActivePlanExpireDate",
                  new Date(
                    result.data.userInfo.role.company.Subscription[0].expireAt
                  ).toDateString()
                );
                secureLocalStorage.setItem(
                  sessionStorage.getItem("sessionId") + "userRole",
                  result.data.userInfo.role.name
                );
                setIsGlobalOpen(true);
              } else {
                const expireDate = new Date(
                  result.data.userInfo.role.company.Subscription[0].expireAt
                );
                setPlanExpirationDate(expireDate.toDateString());
              }
            }
          } else {
            toast.warning(result.data.message);
            setLoading(false);
          }
        }
        console.log("result", result.data.data);
      },
      (error) => {
        console.log(error);
        toast.error("Server Down", { autoClose: 5000 });
        setLoading(false);
      }
    );
  };

  return (
    <>
      <Modal
        isOpen={isGlobalOpen}
        onClose={() => {
          setIsGlobalOpen(false);
        }}
        widthClass={""}
      >
        <BranchAndFinyearForm setIsGlobalOpen={setIsGlobalOpen}/>
      </Modal>

      <div className="flex justify-start items-center bg-gray-200 flex-col h-screen">
      <img className="absolute w-full h-full" src="https://c.wallhere.com/photos/eb/61/1920x1200_px_Dark_Background_Floral_pattern-571739.jpg!d" alt="Background" />
      <div className="relative w-full h-full">
        <header className="flex justify-end p-4">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </header>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="relative w-full max-w-xs">
                  <div
                    className={
                      planExpirationDate ? "text-center" : "text-center hidden"
                    }
                  >
                    <p className="bg-red-500 text-black">
                      {" "}
                      Your Subscription Plan has been Expired on{" "}
                      {planExpirationDate}
                    </p>
                    <p className="bg-blue-500 text-black">
                      {" "}
                      Contact Email for Subscription: admin@pinnacle.com{" "}
                    </p>
                  </div>
                  <form
                    className="border border-zinc-100 border-2 rounded-2xl p-6 mb-4 font-serif"
                    onSubmit={loginUser}
                  >
                    <div className="mb-4 ">
                      <label
                        className="block text-blue-500 text-md font-bold mb-2"
                        htmfor="username"
                      >
                        Username
                      </label>
                      <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="shadow bg-gray-300 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-blue-500 text-md font-bold mb-2"
                        htmfor="password"
                      >
                        Password
                      </label>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-blue-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Sign In</span>
                    </button>
                      <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-gray-700 ">
                        Forgot Password?
                      </p>
                    </div>
                    <p className="mt-6 text-center text-blue-500 text-xs">
                    &copy;2023 Pinnale Software Solutions All rights reserved.
                  </p>
                  </form>

                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
