import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push, remove } from "../../../redux/features/opentabs";
import {
  CountryMaster, PageMaster, StateMaster, CityMaster,
  DepartmentMaster, EmployeeCategoryMaster, FinYearMaster, UserAndRolesMaster, PageGroupMaster,
  AccountSettings, ControlPanel, EmployeeMaster
} from "../../components";


import { HeadingCategoriesMaster, LeadCategoriesMaster, LeadImportForm ,LeadImportTamil,AllocationForm,CallLog} from '../../../CRM/Components'

import { CLOSE_ICON } from "../../../icons";
import CompanyMaster from "../CompanyMaster";

const ActiveTabList = () => {
  const openTabs = useSelector((state) => state.openTabs);
  const dispatch = useDispatch();

  const tabs = {
    "PAGE MASTER": <PageMaster />,
    "PAGE GROUP MASTER": <PageGroupMaster/>,
    "COUNTRY MASTER": <CountryMaster />,
    "STATE MASTER": <StateMaster />,
    "CITY MASTER": <CityMaster />,
    "DEPARTMENT MASTER": <DepartmentMaster />,
    "EMPLOYEE CATEGORY MASTER": <EmployeeCategoryMaster />,
    "FIN YEAR MASTER": <FinYearMaster />,
    "USERS & ROLES": <UserAndRolesMaster />,
    "ACCOUNT SETTINGS": <AccountSettings />,
    "CONTROL PANEL": <ControlPanel />,
    "EMPLOYEE MASTER": <EmployeeMaster />,
    "COMPANY MASTER": <CompanyMaster />,
    "LEAD CATEGORIES MASTER": <LeadCategoriesMaster />,
    "HEADING MASTER":<HeadingCategoriesMaster />,
    "LEAD IMPORT FORM": <LeadImportForm/>,
    "LEAD IMPORT FORM TAMIL": <LeadImportTamil/>,
    "ALLOCATION FORM" : <AllocationForm />,
    "CALL LOG": <CallLog />
  };
  return (
    <div className="">
      <div className="flex gap-2">
        {openTabs.tabs.map((tab, index) => (
          <div
            key={index}
            className={`p-1 rounded-t-md text-[10px] flex justify-center gap-1 ${tab.active ? "bg-red-300" : "bg-gray-300"
              }`}
          >
            <button
              onClick={() => {
                dispatch(push({ id: tab.id }));
              }}
            >
              {tab.name}
            </button>
            <button className="hover:bg-red-400 px-1 rounded-xs transition"
              onClick={() => {
                dispatch(remove({ id: tab.id }));
              }}
            >
              {CLOSE_ICON}
            </button>
          </div>
        ))}
      </div>
      {openTabs.tabs.map((tab, index) => (
        <div key={index} className={`${tab.active ? "block" : "hidden"}`}>
          {tabs[tab.name]}
        </div>
      ))}
    </div>
  );
};

export default ActiveTabList;
