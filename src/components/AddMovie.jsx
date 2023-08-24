import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import {addDoc} from "firebase/firestore"
import { async } from "@firebase/util";
import { moviesRef } from "../firebase/firebase";
import swal from 'sweetalert';
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";


function AddMovie() {
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [from, setForm] = useState({
        title : "",
        year: "",
        desc: "",
        link : "",
        rated:0,
        rating: 0,
    });

    const [loading, setLoading] = useState(false);

    const addMovie = async (e)=>{
      try{
        if(useAppstate.login){
              setLoading(true);
            await addDoc(moviesRef,{
              name: from.title,
              link: from.link,
              desc: from.desc,
              year: from.year
            });
            setLoading(false);
            swal({
              title: "Sucsessfull adeed",
              icon: "success",
              buttons: false,
              timer: 3000
            })
            setForm({
              title: "",
              link: "",
              desc: "",
              year: ""

            });}else{
              navigate('/login');
            }
          } catch(err){
            swal({
              title: err,
              icon: "error",
              buttons: false,
              timer: 3000
            })
          }



          }

  return (
    <section class="text-gray-400 bg-gray-900 body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Add Movie
          </h1>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-400">
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={from.title}
                  onChange = {(e)=> setForm({...from, title: e.target.value})}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-400">
                  Year
                </label>
                <input
                  type="email"
                  id="email"
                  name="email" 
                  value={from.year}
                  onChange = {(e)=> setForm({...from, year: e.target.value})}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="link" class="leading-7 text-sm text-gray-400">
                  Link
                </label>
                <input
                  type="link"
                  id="link"
                  name="Link" 
                  value={from.link}
                  onChange = {(e)=> setForm({...from, link: e.target.value})}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-400">
                  Description
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={from.desc}
                  onChange = {(e)=> setForm({...from, desc: e.target.value})}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div class="p-2 w-full">
              <button onClick={addMovie} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                { loading ? <TailSpin height={25} color="white" /> :"Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddMovie;
