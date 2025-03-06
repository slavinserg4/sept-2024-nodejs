const express = require('express')
const {userService} = require("./services/user.service");
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/users', async (req, res)=>{
    const data = await userService.getAll();
    res.json(data)
})
app.get('/users/:id', async (req, res)=>{
    const id = req.params.id;
    const data = await userService.getById(id);
    res.json(data)
})
app.post('/users', async (req, res)=>{
    const user = req.body;
    const data = await userService.create(user);
    res.json(data)
})
app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const userData = req.body;
        const updatedUser = await userService.updateById(id, userData);
        res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;
        const users = await userService.deleteById(id);
        res.json(users);
});



app.listen(5000, ()=>{
    console.log('server running on 5000 port');
})