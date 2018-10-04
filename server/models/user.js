var bcrypt = require('bcryptjs');
var cryptojs = require('crypto-js');
var SequelizeTokenify = require('sequelize-tokenify');

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		salt: {
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7, 100]
			},
			set: function (value) {
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword);
			}
		},
		recovery_token: {
            type: DataTypes.STRING,
            unique: true
        }
	}, {
		classMethods: {
      		associate: function(models) {
      		},
		},
		instanceMethods: {
		},
	});
	SequelizeTokenify.tokenify(User, {
        field: 'recovery_token'
    });
	return User;
};
