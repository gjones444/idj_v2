module.exports = function (sequelize, DataTypes) {
	var Rooms = sequelize.define('Rooms', {
    Room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
			autoIncrement: true
    },
		Room_Name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		users: {
			type: DataTypes.STRING,
			unique: true
		}
	}, {
		classMethods: {
      		associate: function(models) {
						Rooms.hasMany(users, {
							foreignKey: {
								name: 'user_id'
							}
						})
      		},
		},
		instanceMethods: {
		}
	});
	return Rooms;
};
