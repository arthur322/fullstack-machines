module.exports = (sequelize, DataTypes) => {
  const Machine = sequelize.define("Machine", {
    name: DataTypes.STRING,
    lastStatus: DataTypes.VIRTUAL,
    statusHistory: DataTypes.VIRTUAL
  });

  Machine.associate = models => {
    Machine.belongsToMany(models.Status, {
      through: "status_history",
      as: "statuses",
      foreignKey: "machine_id"
    });
  };

  Machine.prototype.getLastStatus = async function() {
    return await this.getStatuses({
      limit: 1,
      order: [["created_at", "asc"]]
    });
  };

  Machine.prototype.getStatusHistory = async function() {
    return await this.getStatuses({
      limit: 20,
      through: { attributes: [] },
      order: [["created_at", "asc"]]
    });
  };

  return Machine;
};
