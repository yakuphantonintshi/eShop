import { connection as db } from '../config/index.js';

class Products {
    fetchProducts(req, res) {
        try {
            const strQry = `
                SELECT productID, prodName, category, prodDescri, amount
                FROM Products;
                `;
            db.query(strQry, (err, results) => {
              if (err) throw new Error(`Unable to fetch all products`);
              res.json({
                status: res.statusCode,
                results,
              });
            });
          } catch (e) {
            res.json({
              status: 404,
              msg: e.message,
            });
          }
    }

    recentProducts(req, res) {
        try {
              const strQry = `
              SELECT productID, prodName, category, prodDescri, amount
                FROM Products
                ORDERBY productID DESC 
                LIMIT 5;
              `
              db.query(strQry, (err, results) => {
                if (err) throw new Error ('Unable to retrieve recent products')
                    res.json({
                status: res.statusCode,
                results
            
            })
              })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    fetchProduct(req,res) {
        try {
            const strQry = `
            SELECT productID, prodName, category, prodDescri, amount
                FROM Products`
            db.query(strQry, (err, result) => {
                if (err) throw new Error ('Unable to retrieve a product')
                    res.json({
                status: res.statusCode,
                result: result[0]
            })
            })

        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }

    addProduct(req, res) {
        try {
            const strQry = `
            INSERT INTO Products 
            SET ?
            `
            db.query(strQry, [req.body], (err) => {
                if (err) throw new Error ('Unable to add a new product')
                    res.json({
                status: res.statusCode, 
                msg: 'Product is successfully added'
                    })
            })

        }catch (e) {
                res.json({
                    status: 404,
                    msg: e.message
                })
        }
    }

    updateProduct(req, res) {
        try {
            const strQry = `UPDATE Products
            SET ?
            WHERE productID = ${req.parasm.id};`

            db.query(strQry, [req.body], (err) => {
                if (err) throw new Error('Unable to update a product')
                    res.json({
                status: res.statusCode,
                msg: 'Product was updated'
            
            })
            })

        }catch (e) {
                res.json({
                    status: 400,
                    msg: e.message,  
                })
        }
    }

    deleteProduct(req,res) {
        try {
            const strQry = `DELETE FROM Products
            WHERE productID = ${req.params.id}`
            
            db.query(strQry, (err) => {
                if (err) throw new Error ('Unable to delete product')
                    res.json({
                status: res.statusCode, 
                msg: 'Product deleted'
                    })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
} export {
    Products
}
