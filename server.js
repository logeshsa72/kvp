import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  employees, states, countries, cities,
  departments, companies, branches, users, pages, roles, subscriptions, finYear,
  employeeCategories, pageGroup,
  // erpservices
  partyCategories, currency, party, contentMaster, counts, yarnType,
  hsn, yarnBlend, yarn, fabricType, fabric, accessoryGroup, accessoryItem,
  accessory, color, unitOfMeasurement, payTerm, taxTerm, taxTemplate, po, gsm, looplength, design, gauge, dia, purchaseInwardOrReturn, size,allocation,
  leadCategories, heading, leadMaster,calllog
} from './src/routes/index.js';

import { socketMain } from './src/sockets/socket.js';

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors())

BigInt.prototype['toJSON'] = function () {
  return parseInt(this.toString());
};


app.use("/employees", employees);
app.use("/countries", countries);
app.use("/states", states);
app.use("/cities", cities);
app.use("/departments", departments);
app.use("/companies", companies);
app.use("/branches", branches);
app.use("/users", users);
app.use("/pages", pages);
app.use("/pageGroup", pageGroup);
app.use("/roles", roles);
app.use("/subscriptions", subscriptions);
app.use("/finYear", finYear);
app.use("/employeeCategories", employeeCategories);

app.use("/partyCategories", partyCategories);
app.use("/currency", currency);
app.use("/party", party);
app.use("/content", contentMaster);
app.use("/counts", counts);
app.use("/yarnType", yarnType);
app.use("/hsn", hsn);
app.use("/yarnBlend", yarnBlend);
app.use("/yarn", yarn);
app.use("/fabricType", fabricType);
app.use("/fabric", fabric);
app.use("/accessoryGroup", accessoryGroup);
app.use("/accessoryItem", accessoryItem);
app.use("/accessory", accessory);
app.use("/color", color);
app.use("/unitOfMeasurement", unitOfMeasurement);
app.use("/payTerm", payTerm);
app.use("/taxTerm", taxTerm);
app.use("/taxTemplate", taxTemplate);
app.use("/po", po)
app.use("/dia", dia)
app.use("/design", design)
app.use("/looplength", looplength)
app.use("/gsm", gsm)
app.use("/gauge", gauge)
app.use("/purchaseInwardOrReturn", purchaseInwardOrReturn)
app.use("/size", size)

app.use("/leadCategories", leadCategories)
app.use("/heading", heading)
app.use("/leadMaster", leadMaster)
app.use("/allocation",allocation)
app.use("/calllog",calllog)


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socketMain);

const PORT = process.env.PORT || 8081;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

