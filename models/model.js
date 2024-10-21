const {
  LocalBank,
  NationalBank,
  Customer,
  Bank,
  BankFactory,
} = require("./class");
const { readFile, writeFile } = require("fs").promises;

class Model {
  static async saveJSON(banks) {
    const data = JSON.stringify(banks, null, 2);
    await writeFile("./data.json", data);
  }

  static async readBank() {
    const data = JSON.parse(await readFile("./data.json"));
    return BankFactory.createBanks(data);
  }

  static async createBank(name, type) {
    const banks = await this.readBank();

    let id = 1;

    if (banks.length > 0) {
      id = banks.at(-1).id + 1;
    }

    const bank = {
      id: id,
      name: name,
      type: type,
      customers: [],
    };

    const newBank = BankFactory.createBank(bank);

    // save new data
    banks.push(newBank);
    await this.saveJSON(banks);

    return newBank;
  }

  static async deleteBankById(id) {
    const banks = await this.readBank();
    const indexBank = banks.findIndex((el) => el.id == id);

    if (indexBank == -1) {
      throw new Error(`Bank with id ${id} is not found`);
    }

    const [deletedBank] = banks.splice(indexBank, 1);
    await this.saveJSON(banks);
    return deletedBank;
  }

  static async createCustomer(id, name, ktp, depositAmount) {
    const banks = await this.readBank();
    const indexBank = banks.findIndex((el) => el.id == id);

    if (indexBank == -1) {
      throw new Error(`Bank with id ${id} is not found`);
    }

    // const newCustomer = BankFactory.createCustomer({
    //   name,
    //   ktp,
    //   depositAmount,
    // });

    const bank = banks[indexBank];

    if (bank.customers.length == bank.limit) {
      throw new Error("You can not add more customer to this bank");
    }

    const newCustomer = new Customer(name, ktp, depositAmount);
    bank.customers.push(newCustomer);
    await this.saveJSON(banks);
    return newCustomer;
  }

  static async deleteCustomerByKtp(id, ktp) {
    const banks = await this.readBank();
    const indexBank = banks.findIndex((el) => el.id == id);

    if (indexBank == -1) {
      throw new Error(`Bank with id ${id} is not found`);
    }

    const bank = banks[indexBank];
    console.log(bank);
    const indexCustomer = bank.customers.findIndex((el) => el.ktp == ktp);

    if (indexCustomer == -1) {
      throw new Error(`Customer with ktp ${ktp} is not found`);
    }

    const deletedCustomer = bank.customers.splice(indexCustomer, 1);
    await this.saveJSON(banks);
    return deletedCustomer[0];
  }

  static async readCustomerByBankId(id) {
    const banks = await this.readBank();
    const indexBank = banks.findIndex((el) => el.id == id);

    if (indexBank == -1) {
      throw new Error(`Bank with id ${id} is not found`);
    }

    return banks[indexBank].customers;
  }
}

module.exports = Model;
