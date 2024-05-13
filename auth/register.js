const User = require("../models/users");
const bcrypt = require("bcryptjs");

const register = async(req, res) => {
    const { first_name, last_name, email, username, role, password } = req.body

    if(!first_name || !last_name || !email || !username || !role || !password) {
        return res.status(400).send({ error: "Please provide all required fields!!" })
    }

    try {
        const existingUser = await User.findOne({ "email": email });
        if(existingUser) return res.status(400).send({ error: `User with email: ${email} already exists!!` })
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            role: role,
            password: hashedPassword
        });
        await newUser.save();

        if(!newUser) return res.status(400).send({ error: "Something went wrong, user could not be created!!" })
        
        res.send({ newUser }).status(201)

    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    register
}