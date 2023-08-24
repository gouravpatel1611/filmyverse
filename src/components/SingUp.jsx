import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { getAuth, RecaptchaVerifier , signInWithPhoneNumber} from 'firebase/auth';
import swal from "sweetalert";
import { Password } from "@mui/icons-material";
import { usersRef } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const auth = getAuth();
auth.languageCode = 'it';


const SingUp = () => {
  const navigate = useNavigate();
  const [from, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();

      }
    });
  }

  

  const requestOtp = () => {
      setLoading(true);
      generateRecaptha();
      let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${from.mobile}`, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          swal({
            text: "OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtp(true);
          setLoading(false);
        }).catch((error) => {
          swal({
            text: error,
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        })
  }

  const verifyOTP = async ()=>{
    try{
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) =>{
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon : "success",
          button: false,
          timer: 3000,
        })
        setLoading(false);
        navigate('/login')
      })
    }catch(err){
      swal({
        text: err.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
  }

const uploadData = async ()=>{
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(from.password,salt);
    await addDoc(usersRef,{
      name: from.name,
      password : hash,
      mobile : from.mobile,
    });
}

  return (
    <section class="text-gray-400 bg-gray-900 body-font relative ">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Sing Up
          </h1>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            { otp? 
            <>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-400">
                  Enter OTP
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <button onClick={verifyOTP} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
              </button>
            </div>
            </> 
            :<>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-400">
                  Name
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={from.name}
                  onChange={(e) => setForm({ ...from, name: e.target.value })}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div class="p-2 w-full">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-400">
                  Mobile No.
                </label>
                <input
                  type={Number}
                  id="name"
                  name="name"
                  value={from.mobile}
                  onChange={(e) => setForm({ ...from, mobile: e.target.value })}
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
                  type= {'password'}
                  id="password"
                  name="Password"
                  value={from.password}
                  onChange={(e) =>
                    setForm({ ...from, password: e.target.value })
                  }
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <button onClick={requestOtp} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
              </button>
            </div>
            </>}
            <div className="w-full flex justify-center items-center mt-5">
              <p>
                {" "}
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span className="text-blue-600 cursor-pointer"> Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id='recaptcha-container' ></div>
    </section>
  );
};

export default SingUp;
