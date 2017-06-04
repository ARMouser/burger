module.exports = function(sequelize, Datatypes) {
    var Burger = sequelize.define('Burger', {
        burger_name: Datatypes.STRING,
        burger_type: Datatypes.STRING,
        devoured: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        } 
    }); return Burger;
}