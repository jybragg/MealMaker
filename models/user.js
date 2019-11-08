//model for creating and storing users in the database.
var bcrypt = require("bcryptjs");
var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, Datatypes) {
    var User = sequelize.define("User", {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        }      
    });

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    
    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
 
    return User;
};

