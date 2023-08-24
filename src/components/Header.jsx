import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/base';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';




const Header = () => {
    const useAppstate = useContext(Appstate);

  return (
    <div className='sticky top-0 z-10 bg-gray-600 text-3xl text-red-500 font-bold p-3 border-b-2 border-gray-500 flex justify-between'>
        <Link to={'/'}>
        <span> Filmy<span className='text-white'>Verse</span></span>
        </Link>
        { useAppstate.login ? 
        <Link to={'/addmovie'}>
        <h1 className='text-lg font-extrabold cursor-pointer'>
            <Button><AddIcon className='mr-1 text-xl' color='inherit' /> <span className='text-white'>Add New</span></Button>
        </h1>
        </Link>
        :
        <Link to={'/login'}>
        <h1 className='text-lg  bg-green-500 hover:bg-green-600 pl-2 pr-2 p-1 font-extrabold cursor-pointer'>
            <Button><span className='text-white'>LOGIN</span></Button>
        </h1>
        </Link>
  }
    </div>
  )
}

export default Header