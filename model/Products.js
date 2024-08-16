// import { connection as db } from '../config/index.js';

// class Products {
//     fetchProducts(req, res) {
//         try {
//             const strQry = `
//                 SELECT productID, prodName, category, prodDescri, amount
//                 FROM Products;
//                 `;
//             db.query(strQry, (err, results) => {
//               if (err) throw new Error(`Unable to fetch all products`);
//               res.json({
//                 status: res.statusCode,
//                 results,
//               });
//             });
//           } catch (e) {
//             res.json({
//               status: 404,
//               msg: e.message,
//             });
//           }
//     }
// } export {
//     Products
// }
