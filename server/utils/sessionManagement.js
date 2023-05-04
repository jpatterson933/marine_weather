const db = require("../models");

module.exports = { 
    async checkSessionExpiration(req, res, next) {
        const currentTime = new Date().getTime();
        console.log(`Session ${req.sessionID} current time: ${currentTime}, token_expiration: ${req.session.token_expiration}`);

        if (req.session.token_expiration && currentTime > req.session.token_expiration) {
            if(req.session.logged_in) {
                req.session.logged_in = false;
            }
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Session ${req.sessionID} has expired`);
                }
            });
        }
        next(); // if session is valid, this will continue to process any client side request to the server
    }

 };