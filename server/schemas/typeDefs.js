//there are users and books
const typeDefs = `
    #objects
    type User {
        _id : ID
        username : String
        email : String
        password : String
        savedBooks : [Book]
    }

    type Book { 
        _id : ID
        authors : String
        description : String
        image : String
        link : String
        title : String
    }

    #Queries and mutations
    type Query {
        users : [User]
        getMe(id: String!): User
    }
        
    type Mutation {
        saveBook(id: String!, title: String!): Book
        createUser(
            id: String!,
            username : String!,
            email : String!,
            password : String!,
        )
        loginUser(id: String!, password: String!): User
        deleteBook(id: String!, title: String!): Book
    }

`;

// router.route('/').post(createUser).put(authMiddleware, saveBook);
//2 mutations, 1 for create user 1 for save book
// router.route('/login').post(login);
// 1 mutation to log in
// router.route('/me').get(authMiddleware, getSingleUser);
// 1 query to get data on current user
// router.route('/books/:bookId').delete(authMiddleware, deleteBook);
// 1 mutation to delete books from save
// 4 mutations 1 query

module.exports = typeDefs;