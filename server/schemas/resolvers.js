const { User} = require('../models');
// const {signToken} = require('../utils/auth')
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query : {
        //only 1 query, getMe
        getMe: async () => {
            console.log("Hello");
            // console.log("Hello");
            const user = await User.findOne({ _id: context.user._id });
            // const token = signToken(user);
            return user;
        }
    },

    Mutation: {
        saveBook: async (parent, {id, bookId}) => { //it seems like the books is to be passed in it entirety
            //id is the user is
            //title is the book title
            //go into users, find the user, pull their book array, add the book
            // const user= await User.findOne({_id : id});
            //find 1 and update is still a thing
            console.log("Saving");
            const user = await User.findOneAndUpdate(
                {_id : id},
                { $addToSet: { savedBooks: bookId } },
                { new: true, runValidators: true }
            );
            return user;
        },
        deleteBook: async (parent, {id, bookId}) => {
            //id is the user is
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
        createUser: async (parent, {username, email, password}) => {
            //the password runs through bycrypt automatically
            console.log("here");
            // console.log(username, email, password);
            try{
                const newUser = await User.create({username, email, password, savedBooks: []});
                const token = signToken(newUser);
                // console.log(token)
                return {token, newUser};
            }
            catch(err){
                console.log(err);
            }
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