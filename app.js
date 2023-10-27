
import express from "express";
import bodyParser from "body-parser";
import { engine } from 'express-handlebars';
import path from "path";
import { fileURLToPath } from 'url';
import homeRoutes from "./routes/home.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import hbs from "hbs";
import cookieParser from "cookie-parser";
import  handlebars  from "express-hbs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Uploads
// form.uploadDir = path.join(__dirname, '/uploads');

hbs.registerPartials(path.join(__dirname,'views/partials'))


//----------------------------------Handlebars--------------------------------------------//
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
        path.join(__dirname, 'views', 'partials')
    ]
}));


//----------------------------------Setting--------------------------------------------//
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

//---------------------------------- Middleware--------------------------------------------//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())

//----------------------------------Routes--------------------------------------------//
app.use(homeRoutes);

//----------------------------------Routes Middleware--------------------------------------------//
app.use("/dashboard", dashboardRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/categories", categoriesRoutes);

//----------------------------------Listen--------------------------------------------//
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app; 