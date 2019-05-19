module.exports = (sequelize, DataTypes) => {
  const StatusHistory = sequelize.define(
    "StatusHistory",
    {
      machine_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER
    },
    {
      tableName: "status_history"
    }
  );

  return StatusHistory;
};
