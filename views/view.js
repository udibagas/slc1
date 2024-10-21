class View {
  static showBanks(banks) {
    console.log(banks);
  }

  static printError(error) {
    console.log(error.message);
  }

  static successAddBank(newBank) {
    console.log(`Bank ${newBank.name} added successfully`);
  }

  static successDeleteBank(bank) {
    console.log(`Bank ${bank.name} deleted successfully`);
  }

  static successAddCustomer(newCustomer) {
    console.log(`Customer ${newCustomer.name} added successfully`);
  }

  static successDeleteCustomer(customer) {
    console.log(`Customer ${customer.name} deleted successfully`);
  }

  static showCustomers(customers) {
    customers = customers.map((el) => {
      return {
        Name: el.name,
        KTP: el.ktp,
        "Deposit Amount": el.depositAmountInRupiah,
      };
    });

    console.table(customers);
  }
}

module.exports = View;
