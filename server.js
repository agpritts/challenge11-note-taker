const routes = require("./routes/routesRouter.js");
const express = require('express');
const PORT = process.env.PORT || 3011;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});
