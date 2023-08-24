import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import {query , where, getDoc, getDocs} from 'firebase/firestore';
import { usersRef} from '../firebase/firebase';
import bcrypt from 'bcryptjs';
import {Appstate } from '../App';
import { useContext } from 'react';
import swal from 'sweetalert';



const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
    const [from, setForm] = useState({
        mobile : "",
        password: ""

    });
    const [loading, setLoading] = useState(false);

    const login = async () =>{
      setLoading(true);
      try{
        const qur = query(usersRef, where('mobile','==',from.mobile))
        const querySnapshot = await getDocs(qur);
        var isUser = false;
        querySnapshot.forEach((doc)=>{
          const _data = doc.data();
          isUser = bcrypt.compareSync(from.password,_data.password);
          if(isUser){
            useAppstate.setLogin(true);
            useAppstate.setUname(_data.name);
            swal({
              title: "Logged IN",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            navigate('/');
          }
        })
        if(!isUser){
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
        
      }catch(err){
        swal({
          title: err.message ,
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }
      setLoading(false);
    }

  return (
    <section class="text-gray-400 bg-gray-900 body-font relative ">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Login
          </h1>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-full">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-400">
                  Mobile No.
                </label>
                <input
                  type= {Number}
                  id="name"
                  name="name"
                  value={from.mobile}
                  onChange = {(e)=> setForm({...from, mobile: e.target.value})}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
           
            <div class="p-2 w-full">
              <div class="relative">
                <label for="password" class="leading-7 text-sm text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="Password" 
                  value={from.password}
                  onChange = {(e)=> setForm({...from, password: e.target.value})}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <button onClick={login} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                { loading ? <TailSpin height={25} color="white" /> :"Login"}
              </button>
            </div>
            
            <div className='w-full flex justify-center items-center mt-5'>
            <p>Do not have account? <Link to={'/singup'}><span className='text-blue-600 cursor-pointer'> Sing Up</span></Link></p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Login