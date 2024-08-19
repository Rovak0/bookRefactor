const { User} = require('../models');
const {signToken} = require('../utils/auth')

const resolvers = {
    Query : {
        //only 1 query, getMe
        getMe: async (parent, {id}) => {
            return await User.findOne({_id : id});
        }
    },

    Mutation: {
        saveBook: async (parent, {id, body}) => { //it seems like the books is to be passed in it entirety
            //id is the user is
            //title is the book title
            //go into users, find the user, pull their book array, add the book
            // const user= await User.findOne({_id : id});
            //find 1 and update is still a thing
            const user = await User.findOneAndUpdate(
                {_id : id},
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
            return user;
        },
        deleteBook: async (parent, {id, bookId}) => {
            //id is the user is
            //title is the book title
            //go into users, find the user, pull their book array, add the book
            // const user= await User.findOne({_id : id});
            //find 1 and update is still a thing
            const user = await User.findOneAndUpdate(
                {_id : id},
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true, runValidators: true }
            );
            return user;
        },
        createUser: async (parent, {id, username, email, password}) => {
            //the password runs through bycrypt automatically
            const user = await User.create({_id: id, username, email, password});
            const token = signToken(user);
            return user;
        },

        loginUser: async (parent, {id, password}) => {
            const user = await User.findOne({_id : id});
            //user has a built in password checker
            const passwordCheck = user.isCorrectPassword(password);
            if (passwordCheck){
                const token = signToken(user)
                return {token, user};
            }
            return false;
        }
    }
}

module.exports = resolvers;