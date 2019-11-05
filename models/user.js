//model for creating and storing users in the database.
var bcrypt = require("bcryptjs");

module.exports = function (sequelize, Datatypes) {
    var User = sequelize.define("User", {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // username: {
        //     type: Datatypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         len: [1, 75],
        //         notContains: [
        //             "fuck", "shit", "bitch", "ass", "phuk", "fuk", "sheit", "sheeeit", "shat", "schit", "shitt", "biiiiitch", "betch", "bich"
        //         ]
        //     }
        // },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [1]
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 16],
                notContains: [
                    "fuck", "shit", "bitch", "ass", "phuk", "fuk", "sheit", "sheeeit", "shat", "schit", "shitt", "biiiiitch", "betch", "bich"
                ],
            }
        },
        user_identifier: {
            type: Datatypes.BIGINT,
            allowNull: false,
            validate: {
                isInt: true,
                len: [8, 12]
            }
        }
    });


    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    //       // Hooks are automatic methods that run during various phases of the User Model lifecycle
    //       // In this case, before a User is created, we will automatically hash their password

    //   User.hook("beforeCreate", function(user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    //   });
    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
 
    return User;
};

// Requiring bcrypt for password hashing. Using the bcryptjs version as 
//the regular bcrypt module sometimes causes errors on Windows machines
// var bcrypt = require("bcryptjs");
// //
// // Creating our User model
// //Set it as export because we will need it required on the server
// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//     
//   // Creating a custom method for our User model. 
//   //This will check if an unhashed password entered by the 
//   //user can be compared to the hashed password stored in our database
//   User.prototype.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
//   };
//   // Hooks are automatic methods that run during various phases of the User Model lifecycle
//   // In this case, before a User is created, we will automatically hash their password

//   User.hook("beforeCreate", function(user) {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
//   });
//   return User;
// };