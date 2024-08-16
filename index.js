import { userRouter, express } from "./controller/UserController.js";
import { productRouter } from "./controller/ProductController.js";
import path from "path";


// Create an express app
const app = express();
const port = +process.env.PORT || 4000;

// Middleware
app.use(
  express.static("./static"),
  express.json(),
  express.urlencoded({
    extended: true,
  })
);

// Endpoint
app.get("^/$|/eShop", (req, res) => {
  res.status(200).sendFile(path.resolve("./static/html/index.html"));
});

app.use('/Users', userRouter )
app.use('/Products', productRouter)

app.get("*", (req, res) => {
  res.json({
    status: 404,
    msg: "Resource not found",
  });
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
