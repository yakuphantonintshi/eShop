import express from "express";
import path from "path";
import { connection as db } from "./config/index.js";
import { createToken } from "./middleware/AuthenticateUser.js";
import { hash, compare } from "bcrypt";
import bodyParser from "body-parser";

import { userRouter } from "./controller/UserController.js";

import { productRouter } from "./controller/ProductController.js";
// Create an express app
const app = express();
const port = +process.env.PORT || 4000;
const router = express.Router();

// Middleware
app.use(
  router,
  express.static("./static"),
  express.json(),
  express.urlencoded({
    extended: true,
  })
);

router.use(bodyParser.json());

// Endpoint
router.get("^/$|/eShop", (req, res) => {
  res.status(200).sendFile(path.resolve("./static/html/index.html"));
});

// Getting all the users
// router.get("/users", (req, res) => {
//   try {
//     const strQry = `
//         SELECT userID, firstName, lastName, age, emailAdd, pwd, userRole, profileURL
//         FROM Users;
//         `;
//     db.query(strQry, (err, results) => {
//       if (err) throw new Error(`Unable to fetch all users`);
//       res.json({
//         status: res.statusCode,
//         results,
//       });
//     });
//   } catch (e) {
//     res.json({
//       status: 404,
//       msg: e.message,
//     });
//   }
// });

// // Getting a single user
// router.get("/user/:id", (req, res) => {
//   try {
//     const strQry = `SELECT userID, firstName, lastName, age, emailAdd, pwd, userRole, profileURL
//         FROM Users
//         WHERE userID = ${req.params.id};`;

//     db.query(strQry, (err, result) => {
//       if (err) throw new Error(" Unable to fetch the user");
//       res.json({
//         status: res.statusCode,
//         result: result[0],
//       });
//     });
//   } catch (e) {
//     res.json({
//       status: 404,
//       msg: e.message,
//     });
//   }
// });

// //  registering a user
// router.post("/register", async (req, res) => {
//   try {
//     let data = req.body;
//     data.pwd = await hash(data.pwd, 12);
//     // Payload
//     let user = {
//     emailAdd: data.emailAdd,
//       pwd: data.pwd,
//     };
//     let strQry = `INSERT INTO Users 
//                 SET ?`;

//     db.query(strQry, [data], (err) => {
//       if (err) {
//         res.json({
//           status: 400,
//           msg: 'Unable to register a user',
//         });
//       } else {
//         const token = createToken(user);
//         res.json({
//           token,
//           msg: "Successfully registered",
//         });
//       }
//     });
//   } catch (e) {
//     console.errow(e);
//     res.status(500).json({
//       msg: "An error occured during registration",
//     });
//   }
// });

// //  updating a user
// router.patch("/user/:id", async (req, res) => {
//   try {
//     let data = req.body;
//     if (data.pwd) {
//       data.pwd = await hash(data.pwd, 12);
//     }
//     const strQry = `
//         UPDATE Users 
//         SET ?
//         WHERE userID = ${req.params.id}
//         `;
//     db.query(strQry, [data], (err) => {
//       if (err) throw new Error("Unable to update a user");
//       res.json({
//         status: res.statusCode,
//         msg: "The user record was updated",
//       });
//     });
//   } catch (e) {
//     res.json({
//       status: 400,
//       msg: e.message,
//     });
//   }
// });

// // delete user
// router.delete('/user/:id', (req,res) => {
//     try {
//         const strQry = `
//         DELETE FROM Users
//         WHERE userID = ${req.params.id}
        
//         `
//         db.query(strQry, (err) => {
//             if (err) throw Error('Unable to delete the user')
//                 res.json({
//                     status: res.statusCode,
//                     msg: 'A user\'s information was removed.'
//                 })
//         })
//     }catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// })

// // login
// router.post('/login', (req,res) => {
//     try {
//         const { emailAdd, pwd} = req.body
//         const strQry = `
//         SELECT userID, firstName, lastName, age, emailAdd, pwd, userRole, profileURL
//         FROM Users
//         WHERE emailAdd = '${emailAdd}';
//         `
//         db.query(strQry, async (err, result) => {
//             if (err) throw new Error ('Invalid login details')
//                 if (!result?.length) {
//                     res.json({
//                         status: 401,
//                         msg: 'You provided a wrong email'
//                     })
//                 } else {
//                     const isValidPass = await compare(pwd, result[0].pwd)
//                     if (isValidPass) {
//                         const token = createToken({
//                             emailAdd,
//                             pwd
//                         })
//                         res.json({
//                             status: res.statusCode, 
//                             token,
//                             result: result[0]
//                         })
//                     } else {
//                         res.json({
//                             status: 401,
//                             msg: 'Invalid password or you have not registered'
//                         })
//                     }
//                 }
//         })
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// })

// router.get("*", (req, res) => {
//   res.json({
//     status: 404,
//     msg: "Resource not found",
//   });
// });

app.use('/Users', userRouter )
app.use('/Products', productRouter)


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
