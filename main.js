const express = require('express');
const app = express();

app.use(express.json()); 

const users = []

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body; 
    
    if(!username){
        return res.status(400).json({ error: 'Username is required' });
    } else {
        const existingUser = users.find(user => user.username === username);
        
        if(existingUser){
            return res.status(400).json({ error: 'Username already exists' });
        } else {
            const newUser = { username, password };
            users.push(newUser);
            return res.status(201).json({message: 'User created successfully'});
        }
    }
}); 

app.get('/login', (req, res) => {
    const { username, password} = req.body;

    if(username && password) {
        const user = users.find(user => user.username === username && user.password === password);
        if(user) {
            return res.status(200).json({ message: 'Login successful' });
        }
    } else {
        return res.status(400).json({ error: 'Username and password are required' });
    }
}); 

app.put('/changePassword', (req, res) => {
   const { username,currentPassword, newPassword } = req.body; 
   const user = users.find((user) => {
    return user.username === username && user.password === currentPassword
   }); 
   if(user){
    user.password =  newPassword;
    return res.status(200).json({ message: 'Password changed successfully' });
   } else {
    return res.status(400).json({ message: 'Invalid current password.' });
   } 
});

app.delete('/deleteUser', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => {
       return user.username = username && user.password === password
    });
    if(user){
        const index = users.indexOf(user);
        users.splice(index, 1);
        return res.status(200).json({ message: 'User deleted successfully' });
    } else {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }
})
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

