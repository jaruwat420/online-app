
import express from "express";
import bodyParser from "body-parser";
import { engine } from 'express-handlebars';
import path from "path";
import { fileURLToPath } from 'url';
import homeRoutes from "./routes/home.routes.js";
import authRoutes from "./routes/auth.routes.js";
import backendRoutes from "./routes/backend.routes.js";
import productRoutes from "./routes/product.routes.js";
import hbs from "hbs";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Uploads
// form.uploadDir = path.join(__dirname, '/uploads');

hbs.registerPartials(path.join(__dirname,'views/partials'))
// Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
        path.join(__dirname, 'views', 'partials')
    ]
}));

// Setting
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())

// Routes
app.use(homeRoutes);

// Routes, auth
app.use("/backend", backendRoutes);
app.use("/auth", authRoutes);
app.use("/redirect", homeRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app; 