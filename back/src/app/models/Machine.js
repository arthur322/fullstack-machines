const Status = require("./Status");

module.exports = (sequelize, DataTypes) => {
  const Machine = sequelize.define("Machine", {
    name: DataTypes.STRING,
    lastStatus: {
      type: DataTypes.VIRTUAL,
      async get() {
        return await this.getStatuses({
          order: [["created_at", "desc"]]
        });
      }
    }
  });

  Machine.associate = models => {
    Machine.belongsToMany(models.Status, {
      through: "status_history",
      as: "statuses",
      foreignKey: "machine_id"
    });
  };

  Machine.prototype.getLastStatus = async function () {
    return await this.getStatuses({
      order: [["created_at", "desc"]]
    });
  }

  return Machine;
};
