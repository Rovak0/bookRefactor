// //there isn't any documentation on how to do this on apollo's website
//   //or if it exists, it is buried under apollo's how to include middleware
// const { GraphQLError } = require('graphql');

// const jwt = require('jsonwebtoken');

// // set token secret and expiration date
// const secret = 'mysecretsshhhhh';
// const expiration = '2h';

// module.exports = {
//   // function for our authenticated routes
//   authMiddleware: {
//     AuthenticationError: new GraphQLError('Could not authenticate user.', {
//       extensions: {
//         code: 'UNAUTHENTICATED',
//       },
//     }),
//   // function (req, res, next) {
//   //   // allows token to be sent via  req.query or headers
//   //   let token = req.query.token || req.headers.authorization;

//   //   // ["Bearer", "<tokenvalue>"]
//   //   if (req.headers.authorization) {
//   //     token = token.split(' ').pop().trim();
//   //   }

//   //   if (!token) {
//   //     return res.status(400).json({ message: 'You have no token!' });
//   //   }

//   //   // verify token and get user data out of it
//   //   try {
//   //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
//   //     req.user = data;
//   //   } catch {
//   //     console.log('Invalid token');
//   //     return res.status(400).json({ message: 'invalid token!' });
//   //   }

//   //   // send to next endpoint
//   //   next();
//   },
// //   signToken: function ({ username, email, _id }) {
// //     const payload = { username, email, _id };

// //     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
// //   },
// // };
//   signToken: function ({ email, username, _id }) {
//     const payload = { email, username, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
// },
// };
//manage the jwt token here

//do testing on this and make sure it works

const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    // console.log("StringToken", token);

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      // console.log(req.user, "UserToken");
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};