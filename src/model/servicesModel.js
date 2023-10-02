const dbPool = require('../config/database');

const getAllServices = () => {
    const SQLQuery = `SELECT * FROM services`;
    return dbPool.execute(SQLQuery);
}

const createNewService = (body) => {
    const SQLQuery = `INSERT INTO services (name, description, currency, price)
                     VALUES (?, ?, ?, ?)`;
    const values = [body.name, body.description, body.currency, body.price];
    return dbPool.query(SQLQuery, values);
}

const updateService = (body, id) => {
    const SQLQuery = `UPDATE services
                      SET name=?, description=?, currency=?, price=?
                      WHERE id=?`;
    const values = [body.name, body.description, body.currency, body.price, id];
    return dbPool.query(SQLQuery, values);
}

const deleteService = (id) => {
    const SQLQuery = `DELETE FROM services WHERE id=?`;
    const values = [id];
    return dbPool.query(SQLQuery, values);
}

module.exports = {
    getAllServices,
    createNewService,
    updateService,
    deleteService
}