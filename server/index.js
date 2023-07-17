// setup db connection
const db = require('./config/connection');
const app = require('./app');

const PORT = process.env.PORT || 3001;

// error catching for db connection
db.on("error", (error) => {
    console.log(error, "Error with database connection");
});

// open the data base
db.once("open", () => {
    app.on("session.destroy", (sessionId) => {
        console.log(`Session ${sessionId} has expired!`);
    });

    //app running, not getting
    app.listen(PORT, function () {
        console.log(`🌎  ==> API Server now listening on http://localhost:${PORT}`, "SERVER LIVE");
    });
});