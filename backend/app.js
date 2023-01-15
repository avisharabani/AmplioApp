require('dotenv').config();                       
require('express-async-errors');                    

//express
const express = require('express');
const app = express();

//add response info in development
const morgan = require('morgan');                       

//documentation
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


//security packages
const helmet = require('helmet');                       //secure HTTP headers
const xss = require('xss-clean');                       //clean code injection attack
const cors = require('cors');                           //secure cross-origin HTTP requests
const mongoSanitize = require('express-mongo-sanitize');//remove any keys that starts with '$'


//database
const connectDB = require('./db/connect');

//routers
const questionRouter = require('./routes/questionRoutes');
const choiceRouter = require('./routes/choiceRoutes'); 
const voteRouter = require('./routes/voteRoutes'); 

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//get access to req.ip, req.protocol
app.set('trust proxy', 1);                             

//invoke packages
app.use(cors(
    {
        origin: "http://localhost:4200",
        credentials: true,
    }
));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan('tiny'));                               
app.use(express.json());

//defined routers
app.get('/', (req, res) => {
    res.send('<h1>amplio polls</h1><a href="/api-docs">Documentation</a>')
})
//documentation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//app routers
app.use('/api/v1/questions', questionRouter)
app.use('/api/v1/choices', choiceRouter) 
app.use('/api/v1/votes', voteRouter) 

//middleware end of req res cycle
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

//database connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })

    } catch (error) {
        console.log(error);
    }
}

start();