const express = require("express");
const app = express();
const cykelRouter = require('./routers/cykelData');
var cors = require("cors");


const port = 8000;
app.use(cors());
app.use(express.json());
app.use('/',cykelRouter);

// get driver connection

app.listen(port, () => console.log(`Server Port: ${port}`));