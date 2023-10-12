import  express  from "express";
import bodyParser from "body-parser";
import { engine } from 'express-handlebars';
import path from "path";
import { fileURLToPath } from 'url';
import homeRoutes from "./routes/home.routes.js";
import md5 from "md5";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config Port
const app = express();
const port = 3000;

// Handlebars
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')

}));

app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use(homeRoutes);

export default app;