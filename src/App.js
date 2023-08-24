import Header from './components/Header';
import Cards from './components/Cards';
import AddMovie from './components/AddMovie';
import Detail from './components/Detail';
import Login from './components/Login';
import SingUp from './components/SingUp';
import { Route, Routes } from 'react-router-dom';
import { createContext, useState} from 'react';


const Appstate = createContext();

function App() {
  const [login,setLogin] = useState(false);
  const [uname,setUname] = useState("");
  return (
    <Appstate.Provider value={{login,uname , setLogin , setUname}}>
    <div className="App relative">
        <Header/>
        <Routes>
            <Route path="/" element = { <Cards/>} />
            <Route path="/addmovie" element = { <AddMovie/>} />
            <Route path="/detail/:id" element = { <Detail/>} />
            <Route path="/login" element = { <Login/>} />
            <Route path="/singup" element = { <SingUp/>} />
        </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
