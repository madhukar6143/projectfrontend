import { useForm } from "react-hook-form";
import "./login.css";
import axios from "axios";
import { URL } from "../App";
import { useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import handleErrors from '../errorComponent'
import { useAuth } from "../Auth/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Login = () => {
  const { addToast } = useToasts();
  const auth =useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate =useNavigate();
  
  const location = useLocation();
  const { email, password } = location.state || {};

  
  const onSubmit = async(data) => {
    try{
      let response= await axios.post(`${URL}/user/login`,data)
      addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
      const role = response.data.role;
      const user = response.data.username;
       auth.login(role,user)
      const token = response.data.token;
      localStorage.setItem('jwt', token);
      navigate('/',{replace:true})

      }catch (error) 
      {
        handleErrors(error, addToast);
        }
  };

 

  return (
    <div>
 
    <div className="login-page">

      <div className="form-box  border border-warning back bg-light">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email",
             { 
                required: true,
                pattern: 
                {
                    value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message:"Invalid Format"
             }
             })}
            type="email"
            name="email"
            defaultValue={email} 
            placeholder="Email"
            autoComplete="off" 
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
          <input
            {...register("password", 
            { 
                required: true ,
                pattern: {
                    value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and have a minimum length of 8 and maximum length of 16 characters",
                  }
            })}
            type="password"
            name="password"
            defaultValue={password} 
            autoComplete="off" 
            placeholder="Password"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <button type="submit">Login</button>
        </form>

      </div>
      <div className="row">
      <div className="col-2 ">
        </div>
        <div className="col-10 ">
          <h4>admin credentials</h4>
          <p>admin@gmail.com</p>
          <p>Admin@1234</p>
        </div>
        

      </div>
    </div>
    </div>
  );
};

export default Login;
