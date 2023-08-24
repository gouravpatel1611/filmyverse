import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { db, moviesRef } from '../firebase/firebase'
import { doc, getDoc }  from 'firebase/firestore'
import { ThreeCircles } from 'react-loader-spinner';
import Reviews from './Reviews';
const Detail = () => {
    const [loading, setLoding] = useState(false);
    const {id} = useParams();
    const [data, setdata]  = useState({
        title :"",
        year: "",
        link: "",
        desc : "",
        rating: 0,
        rated: 0,
    })
    useEffect(()=>{
        async function getData(){
            setLoding(true);
            const _doc = doc(db,"movies",id);
            const _data = await getDoc(_doc);
            setLoding(false);
            setdata(_data.data())
        }
        getData();
    },[])
  return (
    <div className='p-4 flex md:flex-row flex-col justify-center w-full '>
        { loading ? <div className='h-96 flex justify-center items-center'><ThreeCircles height={30} color="white" /></div> : 
        <>
        <img className='md:h-80   m-4' src={data.link} alt={data.link} srcset="" />
        <div className="md:w-1/2  w-full ml-4">
            <h1 className='text-3xl font-bold text-gray-400'>{data.name} <span className='text-xl'>({data.year})</span></h1>
            <ReactStars size={20} half={true} value = {data.rating/data.rated} edit = {false}   /> 
            <p className='mt-2'>{data.desc}</p>
            <Reviews id={id} prerating= {data.rating}  userno={data.rated} />
        </div>
        </>}
    </div>
  )
}

export default Detail