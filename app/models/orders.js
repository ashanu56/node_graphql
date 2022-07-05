import con from '../config/db_connection.js'


function getOrder(orderId) {

    var query = "SELECT * FROM orders where orders_id = " + orderId;

    return new Promise((resolve, reject) => {
        con.query(query, (err, value) => {
            if (err) reject(err);
            resolve(value);
        });
    });
};
function getOrders(limit, pageNumber,sort,orders_status_id) {
    
    var setLimit = "";
    var setSort = " order by orders_id ";
    var setWhere = " where 1 ";

    if(limit && pageNumber){
        var from = (pageNumber - 1) * limit;
        if(pageNumber <= 1){
            from = 0;
        }
        setLimit += " limit "+from+", "+ limit;
    }
    if(limit && !pageNumber){
        setLimit += " limit 0, "+ limit;
    }
    if(orders_status_id){
        setWhere += " AND orders_status_id = "+orders_status_id;
    }
    setSort += sort == 'D'? 'desc' : 'asc';
    
    var query = "SELECT * FROM orders " + setWhere + setSort + setLimit ;
    console.log(query)
    return new Promise((resolve, reject) => {
        con.query(query, (err, value) => {
            if (err) reject(err);
            resolve(value);
        });
    });
};
function updateOrders(orders_id, orders_status_id) {
    var query = "Update orders set `orders_status_id` = "+orders_status_id +" where `orders_id` = " + orders_id;
    return new Promise((resolve, reject) => {
        con.query(query, function (err, result) {
            if (err) reject(err);
            resolve('update successfully');
        });
    });
};
function deleteOrder(orders_id) {
    var query = "Delete from orders where `orders_id` = " + orders_id;
    return new Promise((resolve, reject) => {
        con.query(query, function (err, result) {
            if (err) reject(err);
            resolve("Number of records deleted: " + result.affectedRows);
        });
    });
};
function createOrder(orderData) {
    var query = "INSERT INTO orders (user_id, orders_status_id, customers_name, customers_company, customers_telephone, delivery_address_id, billing_address_id) VALUES ("+ orderData.user_id + "," + orderData.orders_status_id + ", '"+ orderData.customers_name + "', '" + orderData.customers_company + "', '" + orderData.customers_telephone + "', "+orderData.delivery_address_id+","+ orderData.billing_address_id+")";
    return new Promise((resolve, reject) => {
        con.query(query, function (err, result) {
            if (err) reject(err);
            resolve(result.insertId);
          });
    });
};


export default  { getOrder ,getOrders, updateOrders, deleteOrder, createOrder }