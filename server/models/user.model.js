const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const database = require("../config/database.config");

// Defining model
const User = database.define(
  "users",
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: sequelize.STRING,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    hooks: {
      async beforeCreate(user) {
        const password = user.getDataValue("password");
        const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS || 11);
        const hash = await bcrypt.hash(password, salt);
        user.setDataValue("password", hash);
      },
    },
  }
);

// Custom model method
User.findByCredentials = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw { statusCode: 400, message: "Invalid credentials" };
  const isValid = await bcrypt.compare(password, user.getDataValue("password"));
  if (!isValid) throw { statusCode: 400, message: "Invalid credentials" };
  return user;
};

// Overriding toJSON()
User.prototype.toJSON = function () {
  const user = this;
  delete user.dataValues.password;
  return user.dataValues;
};

database
  .sync()
  .then(() => {
    console.log("users table created successfully.");
  })
  .catch((error) => {
    console.log("Unable to create users table : ", error);
  });

module.exports = User;
