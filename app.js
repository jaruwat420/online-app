import  express  from "express";
import bodyParser from "body-parser";
import { engine} from 'express-handlebars';
import  hbs from 'express-handlebars';
import path from "path";
import { fileURLToPath } from 'url';
import homeRoutes from "./routes/home.routes.js";
import authRoutes from "./routes/auth.routes.js";
import  dotenv  from "dotenv";

dotenv.config({path: './.env'});

const __filename = fileURLToPath(import.meta.url);

// Setting path file
const __dirname = path.dirname(__filename);

// Config Port
const app = express();
const port = 3000;

// Handlebars
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine({
    defaultLayout: 'layout', 
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')

}));


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use(homeRoutes);

// Routes, auth
app.use("/auth", authRoutes);

export default app;