import express from 'express'

const app = express();

app.use(express.json());
app.use(userRouters);

app.listen(3000, () =>{
    console.log(`Server is running in port 3000`);
});