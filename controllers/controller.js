const Model = require("../models/model");
const View = require("../views/view");

class Controller {
  static async list() {
    try {
      const banks = await Model.readBank();
      View.showBanks(banks);
    } catch (error) {
      View.printError(error);
    }
  }

  static async addBank(name, type) {
    try {
      const newBank = await Model.createBank(name, type);
      View.successAddBank(newBank);
    } catch (error) {
      View.printError(error);
    }
  }

  static async deleteBank(id) {
    try {
      const deletedBank = await Model.deleteBankById(id);
      View.successDeleteBank(deletedBank);
    } catch (error) {
      View.printError(error);
    }
  }

  static async addCustomer(idBank, name, ktp, depositAmount) {
    try {
      const newCustomer = await Model.createCustomer(
        idBank,
        name,
        ktp,
        depositAmount
      );
      View.successAddCustomer(newCustomer);
    } catch (error) {
      View.printError(error);
    }
  }

  static async deleteCustomer(idBank, ktp) {
    try {
      const deletedCustomer = await Model.deleteCustomerByKtp(idBank, ktp);
      View.successDeleteCustomer(deletedCustomer);
    } catch (error) {
      View.printError(error);
    }
  }

  static async detail(idBank) {
    try {
      const customers = await Model.readCustomerByBankId(idBank);
      View.showCustomers(customers);
    } catch (error) {
      View.printError(error);
    }
  }
}

module.exports = Controller;
