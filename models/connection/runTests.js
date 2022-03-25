let mongoose = require('mongoose')

let inital_connection = false;

module.exports = (mongoose) => {
    return (tests) => {
        mongoose.connection.on("connected", () => {
            if (!inital_connection) {
                tests();
            }
            inital_connection = true;
        });
    };
};
