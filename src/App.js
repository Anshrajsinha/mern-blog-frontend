import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Create } from './pages/Create';
import { Layout } from './layout';
import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { UserContextProvider } from './userContext';
import { Edit } from './pages/Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/create' element={<Create />}/>
            <Route path='/posts/:id' element={<Post />}/>
            <Route path='/edit/:id' element={<Edit />}/>
          </Route>
        </Routes>
       </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
