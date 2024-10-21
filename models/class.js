"use strict";
class Bank {
  constructor(id, name, type, limit, customers = []) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.limit = limit;
    this.customers = customers;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      customers: this.customers,
    };
  }
}

class LocalBank extends Bank {
  constructor(id, name, customers) {
    super(id, name, "LocalBank", 3, customers);
  }
}

class NationalBank extends Bank {
  constructor(id, name, customers) {
    super(id, name, "NationalBank", 5, customers);
  }
}

class Customer {
  #ktp;
  #depositAmount;

  constructor(name, ktp, depositAmount) {
    this.name = name;
    this.#ktp = ktp;
    this.#depositAmount = depositAmount;
  }

  toJSON() {
    return {
      name: this.name,
      ktp: this.#ktp,
      depositAmount: this.#depositAmount,
    };
  }

  get ktp() {
    return this.#ktp;
  }

  get depositAmount() {
    return this.#depositAmount;
  }

  get depositAmountInRupiah() {
    return this.#depositAmount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }
}

class BankFactory {
  static createBanks(data) {
    return data.map((el) => this.createBank(el));
  }

  static createBank(bank) {
    const customers = this.createCustomers(bank.customers);

    if (bank.type == "LocalBank") {
      return new LocalBank(bank.id, bank.name, customers);
    }

    if (bank.type == "NationalBank") {
      return new NationalBank(bank.id, bank.name, customers);
    }
  }

  static createCustomers(customers) {
    return customers.map((el) => this.createCustomer(el));
  }

  static createCustomer(data) {
    return new Customer(data.name, data.ktp, data.depositAmount);
  }
}

module.exports = {
  Bank,
  LocalBank,
  NationalBank,
  Customer,
  BankFactory,
};
