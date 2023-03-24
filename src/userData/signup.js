import React from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import axios from "axios";
import { URL } from "../App";
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';

import handleErrors from '../errorComponent'

const Signup = () => {
  const navigate = useNavigate();
  
  const { addToast } = useToasts();
  const {register,handleSubmit,reset,formState: { errors }} = useForm();

  const onSubmit = async(data) => {
    try{
      let response= await axios.post(`${URL}/user/signup`,data)
      addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
      reset();
      navigate('/login', { state: { email: data.email, password: data.password } });
      }catch (error) 
      {
        handleErrors(error, addToast);
        }
      
  };

  return (
    <div className="signup-page">
      <div className="form-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", {
              required: true,
              minLength: 8,
              maxLength: 16,
            })}
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off" 
          />

          {errors.username && errors.username.type === "required" && (
            <span className="error">Username is required</span>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <span className="error">
              Username must be at least 8 characters
            </span>
          )}
          {errors.username && errors.username.type === "maxLength" && (
            <span className="error">
              Username must be no more than 16 characters
            </span>
          )}

          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Format",
              },
            })}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off" 
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <input
            {...register("password", {
              required: true,
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one special character, and have a minimum length of 8 and maximum length of 16 characters",
              },
            })}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off" 
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
