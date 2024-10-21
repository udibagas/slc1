const Controller = require("./controllers/controller");
const [command, ...params] = process.argv.slice(2);

switch (command) {
  case "list":
    Controller.list();
    break;

  case "addBank":
    const [name, type] = params;
    Controller.addBank(name, type);
    break;

  case "deleteBank":
    const [id] = params;
    Controller.deleteBank(id);
    break;

  case "addCustomer":
    {
      const [idBank, name, ktp, depositAmount] = params;
      Controller.addCustomer(idBank, name, ktp, +depositAmount);
    }
    break;

  case "deleteCustomer":
    const [idBank, ktp] = params;
    Controller.deleteCustomer(idBank, ktp);
    break;

  case "detail":
    {
      const [idBank] = params;
      Controller.detail(idBank);
    }
    break;

  default:
    break;
}
