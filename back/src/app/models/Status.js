module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define("Status", {
    code: DataTypes.STRING,
    status: DataTypes.STRING
  });

  Status.associate = models => {
    Status.belongsToMany(models.Machine, {
      through: "status_history",
      as: "machines",
      foreignKey: "status_id"
    });
  };

  return Status;
};
