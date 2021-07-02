const { Model, DataTypes } = require('sequelize');

class Key extends Model {
    static init(sequelize){
        super.init({
            key_text: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = Key;