const htmlRoutes = require("./routes/htmlRoutes");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3011;

require("./routes/apiRoutes")(app);

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});
