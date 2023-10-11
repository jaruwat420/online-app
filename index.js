import  express  from "express";
import { engine } from 'express-handlebars';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Config Port
const port = 3000;

// Handlebars
app.engine('handlebars', engine(
    {defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {
        title: "Home Page",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum!",
        condition: false
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: "About Page",
        description: "lorem1000000"
    });
})



app.listen(port, ()=>{
    console.log(`Server Running On Port ${port}`);
});