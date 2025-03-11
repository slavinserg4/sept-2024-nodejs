const {read, write} = require("../services/fs.service");

class UserRepository {
    async getAll() {
        return read()
    }
    async getByName(name){
        const users = await read()
        const usersForReturn = []
        usersForReturn.push(users.filter(user=>user.name.includes(name)))
        return usersForReturn
    }
    async create(user) {
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: user.name,
            age: user.age
        }
        users.push(newUser)
        await write(users)
        return newUser
    }
    async getById(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        return users[index]
    }
    async updateById(id, userData) {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        users[index] = {
            ...users[index],
            ...userData,
            id: users[index].id
        }
        await write(users);
        return users[index];
    }
    async deleteById(id) {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        users.splice(index,1);
        await write(users)
        return users
    }
}

const userRepository = new UserRepository();

module.exports = {
    userRepository
}