const cron = require("node-cron");

class CronService {
  constructor(changeStatus) {
    this.cronTask = null;
    this.cronRepeater = null;
    this.action = changeStatus;
  }

  start(time, socket) {
    if (time === "") {
      // Tempo padrão: 5 segundos
      time = "*/5 * * * * *";
    }
    this.cronTask = cron.schedule(time, async () => {
      console.log(`Cron rodando em ${time}`);
      const machinesGenerated = await this.action();
      socket.emit("nowStatuses", machinesGenerated);
    });
    this.cronRepeater = cron.schedule("* * * * * *", () => {
      socket.emit("isCroned", true);
    });
  }

  stop() {
    if (this.cronTask !== null) {
      this.cronTask.stop();
      this.cronRepeater.stop();
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
