class MachineController {
  constructor() {
    this.machines = [
      { id: 1, name: "Machine 1" },
      { id: 2, name: "Machine 2" },
      { id: 3, name: "Machine 3" }
    ];
    this.all.bind(this);
  }

  all(req, res) {
    return res.json(this.machines);
  }
}

module.exports = new MachineController();
