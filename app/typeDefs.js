//type definitions - schemas (operation and data strcutures)

const typeDefs = `
    type Query {
        getOrders(limit: Int, pageNumber: Int,sort : String,orders_status_id : Int):[Post!]!
        getOrder(query: String):[Post!]
    }
    type Post{
        orders_id:ID!
        user_id: Int!
        orders_status_id: Int!
        customers_name:String!
        customers_company:String!
        customers_telephone:String!
        delivery_address_id: Int!
        billing_address_id: Int!
    }
    type Mutation{
        updateOrder(
            orders_id: ID! 
            orders_status_id: Int!
        ): Post!
        deleteOrder(orders_id: ID!): Post!
        createOrder(
            user_id: Int!
            orders_status_id: Int!
            customers_name:String!
            customers_company:String!
            customers_telephone:String!
            delivery_address_id: Int!
            billing_address_id: Int!
        ): Post!
    }
    type Subscription {
        post: PostSubscriptionPayload!
    }

    type PostSubscriptionPayload {
        mutation: String!
        data: Post!
    }
`;

export default typeDefs;
