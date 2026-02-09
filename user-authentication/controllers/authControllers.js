const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER USER

exports.register = async (req, res) => {
    const {name, email, password} = req.body;

    try{
         const userExists = await User.findOne({email});
         if ( userExists ){
            return res.status(400).json({ message: "User already exists"});
         }
         
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         await User.create({
            name,
            email,
            password: hashedPassword
         });

         res.status(200).json({ message: "User registerred sucessfully"})
    } catch(e){
        res.status(500).json({ error: e.message});
    }
};


// LOGIN USER

exports.login = async (req, res) => {
    const { email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if ( !user ){
            return res.status(400).json({ message: "User does not exist. Please register the user."})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if( !isMatch ){
            return res.status(400).json({ message: "Invalid password. Please enter vaild password"});
        }

        const token = await jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.json({
            token,
            message: "login successfully"
        });
    } catch(e){
        res.status(500).json({ error: e.message });
    }
};
