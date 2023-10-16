import  express  from "express";
import bodyParser from "body-parser";
import { engine} from 'express-handlebars';
import  hbs from 'hbs';
import path from "path";
import { fileURLToPath } from 'url';
import homeRoutes from "./routes/home.routes.js";
import authRoutes from "./routes/auth.routes.js";
import backendRoutes from "./routes/user.routes.js";
import  dotenv  from "dotenv";

dotenv.config({path: './.env'});

const __filename = fileURLToPath(import.meta.url);

// Setting path file
const __dirname = path.dirname(__filename);

// Config Port
const app = express();
const port = 3000;

// Handlebars
app.engine('hbs', engine({
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir:[
        path.join(__dirname, 'views', 'partials'),
        path.join(__dirname, 'views', 'auth', 'partials'),
        path.join(__dirname, 'views', 'backend', 'partials')
    ]
}));

// Setting
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static("public"));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use(homeRoutes);

// Routes, auth
app.use("/auth", authRoutes);
app.use("/backend", backendRoutes);

export default app;