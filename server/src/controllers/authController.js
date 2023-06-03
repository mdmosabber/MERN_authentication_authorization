const User = require('../models/User');
const {hash, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');



// Route for user registration
exports.register = async (req,res)=> {

    const { name, email, password } = req.body;

    try {
        if(!name.trim()){
            return res.json({error: 'Name is required'});
         }
 
         if(!email){
             return res.json({error: 'Email is required'});
         }
 
         if(!password || password.length < 6){
             return res.json({error: 'Password must be at least 6 character'});
         }
 
         // User Exists  
         const userExists = await User.findOne({email});
 
         if(userExists){
             return res.json({error: 'This email already used'})
         }

         const hashPassword = await hash(password);

         const user = await new User({
              name,
              email,
              password: hashPassword
         }).save();
  
         const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

         res.json({
              status: 'success', 
              user: {
                  name: user.name,
                  email: user.email      
              },
              token
         })



    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' })
    }
}



// Route for user login
exports.login = async (req, res)=> {
    const { email, password } = req.body;
  try {
        if(!email){
            return res.json({error: 'Email is missing'})
        }
        if(!password || password.length < 6 ){
            return res.json({error: 'Password must be at least 6 characters'})
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await comparePassword(password, user.password);

        if (isPasswordValid) {

            // Generate a JWT
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

            // Send the token in the response
            return res.json({ token, status: 'success' });

        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
}



//Update Profile
exports.updateProfile = async (req, res) => {

    const { name, password } = req.body;
    try {
        // Find the user by ID
        const user = await User.findById(req.userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if(password && password.length < 6){
            return res.json({
                error: 'Password id required and should be min 6 character long'
            })
        };

        // Update user profile
        const hashedPassword = password ? await hash(password) : undefined;

        user.name = name || user.name;
        user.password = hashedPassword  || user.password;             

        await user.save();

        res.json({user: user, message: 'Profile updated successfully' });

    } catch (error) {
        console.error('Error update profile in:', error);
        res.status(500).json({ error: 'Error update profile' });
    }
}