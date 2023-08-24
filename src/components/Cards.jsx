import React, {useEffect, useState} from 'react';
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import {getDocs} from 'firebase/firestore';
import {moviesRef} from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
    const [data,setData] = useState([]);
    const [loading, setLoding] = useState(false);

    useEffect(()=>{
        async function getdata(){
            setLoding(true);
            const _data = await getDocs(moviesRef);
            _data.forEach((doc)=>{
                setData((pre) => [...pre, {...(doc.data()),id:doc.id }]);
            })
            
            setLoding(false);
        }
        getdata();
    },[])
  return (
    <div className='flex flex-wrap justify-around p-3 mt-2'>
        { loading ? <div className='w-full flex justify-center items-center h-96'> <ThreeDots height={40} color="white"/></div>:
            data.map((e,i) => {
                return(
                 <Link to={`/detail/${e.id}`}>   
                    <div key={i} className='card shadow-lg p-2 mt-5 mx-3 hover:-translate-y-3 cursor-pointer font-bold  transition-all duration-500'>
                        <img className='h-72' src={e.link} alt={e.link} />
                        <h1> <span className='text-green-500 mr-2'>Name :</span>{e.name}</h1>
                        <h1 className='flex items-center '>
                            <span className='text-green-500 mr-2'>Rating :</span>
                        <ReactStars
                            size={20}
                            half={true}
                            value = {e.rating/e.rated}
                            edit = {false}
                        />
                        </h1>
                        <h1><span className='text-green-500 mr-2'>Year :</span>{e.year}</h1>
                    </div>
                </Link>
               )})}



    </div>
  )
}

export default Cards