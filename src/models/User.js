const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            ip: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = User;