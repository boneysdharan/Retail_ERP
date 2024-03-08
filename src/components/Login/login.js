import React, {useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Dashboard from '../Dashboard/index.js';

const Login = ({ setIsAuthenticated }) => {
  const name=useRef()
  const email=useRef()
  const password=useRef()
  const [showHome,setShowHome]=useState(false)
  const [show,setShow]=useState(false)
  const sessionName=sessionStorage.getItem("name")
  const sessionEmail=sessionStorage.getItem("email")
  const sessionPassword=sessionStorage.getItem("password")

    if (!name || !password || !email) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

   const handleClick=()=>{
    if (!name || !password || !email) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }
      if(name.current.value===sessionName &&email.current.value===sessionEmail &&password.current.value===sessionPassword)
      {
        alert("User Already Present. Directing to Dashboard!")
        localStorage.setItem('is_authenticated', true);
        setIsAuthenticated(true)
      }
      else{
        sessionStorage.setItem("name",name.current.value)
        sessionStorage.setItem("email",email.current.value)
        sessionStorage.setItem("password",password.current.value)
        alert("Account created successfully!!")
        setShow(true)
      }
    }
    const handleSignIn=()=>{
      if (!name || !password || !email) {
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'All fields are required.',
          showConfirmButton: true,
        });
      }
      if(email.current.value===sessionEmail&&password.current.value===sessionPassword){
        setShowHome(true)
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            sessionStorage.setItem('is_authenticated', true);
            setIsAuthenticated(true);
  
            Swal.fire({
              icon: 'success',
              title: 'Successfully logged in!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      }else{
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            sessionStorage.setItem('is_authenticated', false);
            setIsAuthenticated(false);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Incorrect email or password.',
              showConfirmButton: true,
            });
          },
        });
      }
    }

    const handleRegister=()=>{
      handleClick();
    }

    const handleLogin=()=>{
      handleSignIn();
    }

    return(
      <div>
          {showHome?<Dashboard/>:
          (show?
              <div className="samll-container">
                <h1>Hello {sessionName}</h1>
                    <form>
                        <label>Email ID</label>
                        <input
                          placeholder='Email'
                          name="email"
                          type="email"
                          ref={email}
                        />
                        <label>Password</label>
                        <input
                          placeholder='Enter Password'
                          name="password"
                          type="password"
                          ref={password}
                        />
                      <button onClick={handleLogin}>Login</button>
                    </form>
              </div>
              :
              <div className="small-container">
                <h1>Retailer Registration</h1>
                    <form>
                        <label>User Name</label>
                        <input
                          placeholder='Enter Name'
                          name="name"
                          type="text"
                          ref={name}
                        />
                        <label>Email</label>
                        <input
                          placeholder='Enter Email'
                          name="email"
                          type="email"
                          ref={email}
                        />
                        <label>Password</label>
                        <input
                          placeholder='Enter Password'
                          name="password"
                          type="password"
                          ref={password}
                        />
                        <button onClick={handleRegister}>Register</button>
                    </form>
              </div>)
          }
      </div>
  );
};

export default Login;
