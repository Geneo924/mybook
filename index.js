const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { gql } = require('graphql-tag')

let users = [
    {
        name: "John Smith",
        phone: "555-233-4532",
        email: "johns@gmail.com",
        membership: "premium"
    },
    {
        name: "Bobby Johnson",
        phone: "324-623-6632",
        email: "bobby@gmail.com",
        membership: "gold"
    },
    
    {
        name: "Carol Lewis",
        phone: "111-244-6242",
        email: "carol@gmail.com",
        membership: "trial"
    },
    
    {
        name: "Billy Waters",
        phone: "734-232-7382",
        email: "billy@gmail.com",
        membership: "gold"
    },
]
    
const typeDefs = gql`
    type User {
    name: String!
    phone: String
    email: String!
    membership: String!
}

    type Query {
    UserCount: Int!
    findUser(name: String!): User
    allUsers: [User!]!
}
`

const resolvers = {
    Query: {
        UserCount: () => users.length,
        allUsers: () => users,
        findUser: (root, args) => 
            users.find(user => user.name == args.name)
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})


startStandaloneServer(server, {
    listen: {port: 4000},
}).then(({ url }) => {
    console.log(`Server ready at ${ url }`)
})






