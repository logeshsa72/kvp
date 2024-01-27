import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

import AccountDetailsDropDown from "../AccountDetailsDropdown";
import { APP_NAME } from "../../../Strings";
import { ROLES_API, PAGES_API } from "../../../Api";
import { CloseButtonOnly } from "../../../Buttons";
import { latestExpireDateWithinNDays } from "../../../Utils/helper";
import { GLOBE_ICON } from "../../../icons";
import { useGetPageGroupQuery } from "../../../redux/services/PageGroupMasterServices";
import MultiLevelDropDown from "../../../UiComponents/MultiSelectDropDown";
import logo1 from '../../../assets/icon.png'



const BASE_URL = process.env.REACT_APP_SERVER_URL;

const AppHeader = ({ setIsGlobalOpen, setLogout }) => {
  const [hideNavBar, sethideNavBar] = useState(true);

  const navBatItemsStyle = hideNavBar ? "hidden" : "";

  const [allowedPages, setAllowedPages] = useState([]);

  const { data: pageGroup} = useGetPageGroupQuery({ searchParams: "" })

  const toggleNavMenu = () => {
    sethideNavBar(!hideNavBar);
  };

  // const defaultAdmin = JSON.parse(
  //   secureLocalStorage.getItem(
  //     sessionStorage.getItem("sessionId") + "defaultAdmin"
  //   )
  // );

  const retrieveAllowedPages = useCallback(() => {
    if (
      JSON.parse(
        secureLocalStorage.getItem(
          sessionStorage.getItem("sessionId") + "defaultAdmin"
        )
      )
    ) {
      axios({
        method: "get",
        url: BASE_URL + PAGES_API,
        params: { active: true },
      }).then(
        (result) => {
          console.log("result", result.data.data);
          setAllowedPages(result.data.data);
        },
        (error) => {
          console.log(error);
          toast.error("Server Down", { autoClose: 5000 });
        }
      );
    } else {
      axios({
        method: "get",
        url:
          BASE_URL +
          ROLES_API +
          `/${secureLocalStorage.getItem(
            sessionStorage.getItem("sessionId") + "userRoleId"
          )}`,
      }).then(
        (result) => {
          if (result.status === 200) {
            if (result.data.statusCode === 0) {
              setAllowedPages(
                result.data.data.RoleOnPage.filter(
                  (page) => page.page.active && page.read
                ).map((page) => {
                  return {
                    name: page.page.name,
                    type: page.page.type,
                    link: page.page.link,
                    id: page.page.id,
                    pageGroupId: page.page.pageGroupId
                  };
                })
              );
            }
          } else {
            console.log(result);
          }
        },
        (error) => {
          console.log(error);
          toast.error("Server Down", { autoClose: 5000 });
        }
      );
    }
  }, []);
  useEffect(retrieveAllowedPages, [retrieveAllowedPages]);
  const hideExpireWarning = () => {
    let expireWarningDiv = document.getElementById("expireWarning");
    expireWarningDiv.style.display = "none";
  };
  function findElement(id, arr) {
    if (!arr) return ""
    let data = arr.find(item => parseInt(item.id) === parseInt(id))
    return data ? data.name : ""
  }
  const masters = allowedPages.filter((page) => page.type === "Masters")
  const mastersGroup = [...new Set(masters.map(page => page.pageGroupId))].map(pageId => { return { id: pageId, name: findElement(pageId, pageGroup?.data) } })
  const transactions = allowedPages.filter((page) => page.type === "Transactions")
  const transactionsGroup = [...new Set(transactions.map(page => page.pageGroupId))].map(pageId => { return { id: pageId, name: findElement(pageId, pageGroup?.data) } })
  return (
    <div className="relative">
      <nav className="nav-bar bg-sky-700 flex md:items-center flex-wrap ">
        <div className="logo-heading flex flex-shrink-0 mr-6 break-words">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="flex font-semibold break-words">{APP_NAME} </span>
        </div>
        <div className="block lg:hidden justify-items-start">
          <button
            onClick={toggleNavMenu}
            className="flex items-center px-3 py-2 button-border"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title className="text-white">Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="flex-grow flex items-center lg:w-auto">
          <div className="nav-item flex-grow">
            <div
              className={`block mt-4 lg:inline-block lg:mt-0  mr-4 ${navBatItemsStyle}`}
            >
              <MultiLevelDropDown heading={"Masters"} groups={mastersGroup} pages={masters} />
            </div>
            <div
              className={`block mt-4 lg:inline-block lg:mt-0  mr-4 ${navBatItemsStyle}`}
            >
              <MultiLevelDropDown heading={"Transactions"} groups={transactionsGroup} pages={transactions} />
            </div>
          </div>
          <div className="nav-item flex justify-between gap-3 items-center">
          <img src={logo1} class="w-7 h-7" alt= "logo"/>

            <div
              className="text-lg hover:text-sky-400 transition"
              onClick={() => { setIsGlobalOpen(true) }}>
              {GLOBE_ICON}
            </div>
            <div className="flex items-center">
              {" "}
              <p className="">WELCOME</p> &nbsp;{" "}
              <pre>
                {" "}
                {secureLocalStorage.getItem(
                  sessionStorage.getItem("sessionId") + "username"
                )}
              </pre>
            </div>
            <AccountDetailsDropDown setLogout={setLogout}
              items={allowedPages.filter((page) => page.type === "AdminAccess")}
            />
          </div>
        </div>
      </nav>
      <div
        id="expireWarning"
        className={
          latestExpireDateWithinNDays()
            ? "bg-yellow-600 justify-center  text-black gap-1 items-center block"
            : "bg-yellow-600 justify-center  text-black gap-1 items-center hidden"
        }
      >
        <p>
          {" "}
          Your Subscription Plan will Expire on{" "}
          {secureLocalStorage.getItem(
            sessionStorage.getItem("sessionId") + "latestActivePlanExpireDate"
          )}
          .{" "}
        </p>
        <span className="">
          <CloseButtonOnly onClick={hideExpireWarning} />
        </span>
      </div>
    </div>
  );
};

export default AppHeader;
