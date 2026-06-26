const customerService = require('../services/customer.service');

async function listCustomers(req, res, next) {
  try {
    const customers =
      await customerService.listCustomers();

    res.json(customers);
  } catch (error) {
    next(error);
  }
}

async function getCustomer(req, res, next) {
  try {
    const customer =
      await customerService.getCustomerById(
        Number(req.params.id)
      );

    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function createCustomer(req, res, next) {
  try {
    const customer =
      await customerService.createCustomer(
        req.body
      );

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
}

async function updateCustomer(req, res, next) {
  try {
    const customer =
      await customerService.updateCustomer(
        Number(req.params.id),
        req.body
      );

    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function deleteCustomer(req, res, next) {
  try {
    await customerService.deleteCustomer(
      Number(req.params.id)
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
};