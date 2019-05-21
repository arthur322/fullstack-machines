const cron = require("node-cron");
const MachineController = require("../Controllers/MachineController");

class CronService {
  constructor(changeStatus) {
    this.cronTask = null;
    this.action = changeStatus;
  }

  start(time = "* * * * * *") {
    this.cronTask = cron.schedule(time, () => {
      console.log(`Cron rodando em ${time}`);
      this.action();
    });
  }

  stop() {
    if (this.cronTask !== null) {
      this.cronTask.stop();
    }
    console.log("Cron fechado");
  }

  checkStatus() {
    if (this.cronTask !== null) {
      return true;
    }
    return false;
  }
}

module.exports = CronService;
