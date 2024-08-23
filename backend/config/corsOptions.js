import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}
export default corsOptions


 
    