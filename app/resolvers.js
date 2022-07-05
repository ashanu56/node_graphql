
import  orders from "./models/orders.js"
const resolvers = {
    Query: {
        async getOrders(parent,args = []) {
            var limit = args.limit;
            var pageNumber = args.pageNumber;
            var sort = args.sort;
            var orders_status_id = args.orders_status_id;
            var orderData = await orders.getOrders(limit,pageNumber,sort,orders_status_id);
            return orderData;
        },
        async getOrder(parent, args) {
            var orderData = await orders.getOrder(args.query);
            return orderData.filter((post) => {
                const orders_id = post.orders_id;
                return orders_id;
            });
        },
    },

    Mutation: {
        async updateOrder(parent, args, { pubsub }) {
            const orders_id = parseInt(args.orders_id);
            const orders_status_id = parseInt(args.orders_status_id);
            var updateOrder = await orders.updateOrders(orders_id,orders_status_id);
            console.log(updateOrder)
            const updatedPost = {
                ...updateOrder,
                ...args,
            };
            return updatedPost;
        },
        async deleteOrder(parent, args, { pubsub }) {
            const orders_id = parseInt(args.orders_id);
            var deleteOrder = await orders.deleteOrder(orders_id);
            console.log(deleteOrder)
            const deletePost = {
                ...deleteOrder,
                ...args,
            };
            return deletePost;
        },
        async createOrder(parent, args, { pubsub }) {
            var orderData = [];
            orderData.user_id = parseInt(args.user_id);
            orderData.orders_status_id = parseInt(args.orders_status_id) ;
            orderData.customers_name = args.customers_name ;
            orderData.customers_company = args.customers_company ;
            orderData.customers_telephone = args.customers_telephone ;
            orderData.delivery_address_id = parseInt(args.delivery_address_id) ;
            orderData.billing_address_id = parseInt(args.billing_address_id) ;
            var createOrder = await orders.createOrder(orderData);
            console.log(createOrder)
            const createPost = {
                ...createOrder,
                ...args,
            };
            return createPost;
        },
    },
    Subscription: {
        post: {
            subscribe(parent, args, { pubsub }) {
                return pubsub.asyncIterator("post");
            },
        },
    },
};
export default  resolvers;

