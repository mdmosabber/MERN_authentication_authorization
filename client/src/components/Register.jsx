import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e)=> {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name] : value
        })
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!data.name || !data.email || !data.password) { 
            toast.error('Please fill in all the fields');
            return;
        };

        const userData = {
            name: data.name,
            email: data.email,
            password: data.password   
        };

        try {
            const {data} = await axios.post('/api/v1/register/', userData);

            if (data.status === 'success') {
                toast.success("Register Successfully");
        
                // Clear input field data
                setData({
                    name: '',
                    email: '',
                    password: '',  
                });

                navigate('/');
        
            } else {
                toast.error("Register Failed.");
            }
            
        } catch (error) {
            console.error('Error Register in:', error);
            toast.error("Register Fail, Please try again!");
        }

    }



  return (
    <>
        <div className='circle-form'>
            <div className='form-wrapper'>
                <div className='circle'>
                    <form onSubmit={handleSubmit}>

                        <p className='sign-title'>Sign Up</p>
                        <input type='text' onChange={handleChange} value={data.name} className='user' name='name' placeholder='Enter Your Name'/>
                        <input type='email' onChange={handleChange} value={data.email}  className='user' name='email' placeholder='Enter Your Email'/>
                        <input type='password' onChange={handleChange} value={data.password}  className='pass' name='password' placeholder='Enter Your Password' />

                        <input type="submit" class="btn" value="Sign Up" />
        
                        <p className="dont"> Already have an account                 
                            <NavLink to="/" className='px-2'> Sign In </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register