const cron = require("node-cron");

class CronService {
  constructor() {
    this.cronTask = null;
  }

  start(time = "* * * * * *") {
    this.cronTask = cron.schedule(time, () => {
      console.log(`Cron rodando em ${time}`);
    });
  }

  stop(req, res) {
    this.cronTask.stop();
    console.log("Cron fechado");
  }
}

module.exports = new CronService();
