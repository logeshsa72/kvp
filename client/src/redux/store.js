import { configureStore } from "@reduxjs/toolkit";
import { openTabs } from "./features";
import {
  countryMasterApi, pageMasterApi, stateMasterApi,
  cityMasterApi, departmentMasterApi, employeeCategoryMasterApi,
  finYearMasterApi, rolesMasterApi, employeeMasterApi, userMasterApi, 
  branchMasterApi, companyMasterApi, pageGroupMasterApi,
} from "./services"

import { LeadCategoriesMasterApi, LeadImportFormApi,HeadingCategoriesMasterApi,AllocationFormApi,UserFormApi,CallLogApi } from './CrmServices'


const commonReducers = {
  openTabs,
  countryMaster: countryMasterApi.reducer,
  pageMaster: pageMasterApi.reducer,
  stateMaster: stateMasterApi.reducer,
  cityMaster: cityMasterApi.reducer,
  departmentMaster: departmentMasterApi.reducer,
  employeeCategoryMaster: employeeCategoryMasterApi.reducer,
  finYearMaster: finYearMasterApi.reducer,
  roleMaster: rolesMasterApi.reducer,
  userMaster: userMasterApi.reducer,
  employeeMaster: employeeMasterApi.reducer,
  branchMaster: branchMasterApi.reducer,
  companyMaster: companyMasterApi.reducer,
  pageGroupMaster: pageGroupMasterApi.reducer,
}
const commonMiddleware = [countryMasterApi.middleware,
pageMasterApi.middleware,
stateMasterApi.middleware,
cityMasterApi.middleware,
departmentMasterApi.middleware,
employeeCategoryMasterApi.middleware,
finYearMasterApi.middleware,
rolesMasterApi.middleware,
userMasterApi.middleware,
employeeMasterApi.middleware,
branchMasterApi.middleware,
companyMasterApi.middleware,
pageGroupMasterApi.middleware,
];

const crmReducers = {
  leadCategoriesMaster: LeadCategoriesMasterApi.reducer,
  leadImportForm: LeadImportFormApi.reducer,
  AllocationForm: AllocationFormApi.reducer,
  UserForm: UserFormApi.reducer,
  CallLog: CallLogApi.reducer,

  [HeadingCategoriesMasterApi.reducerPath]: HeadingCategoriesMasterApi.reducer
}

const crmMiddleware = [
  LeadCategoriesMasterApi.middleware,
  LeadImportFormApi.middleware,
  HeadingCategoriesMasterApi.middleware,
  AllocationFormApi.middleware,
  UserFormApi.middleware,
  CallLogApi.middleware

]

export const store = configureStore({
  reducer: {
    ...commonReducers,...crmReducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(commonMiddleware).concat(crmMiddleware),
});

export default store;