import './styles/shop.css'
import './styles/profile.css';
import './styles/upp123.css';
import './styles/mid123.css';
import './styles/items.css';
import './styles/end123.css';
import './styles/enter123.css';
import './styles/cart.css';
import Firstpage from './components/Firstpage';
import Enter from './components/Enter';
import Registrarion from './components/Registarion';
import UserPage from './components/UserPage';
import Shop from './components/Shop';
import Cart from './components/Cart';
import { BrowserRouter as Router, Route, Switch, Redirect, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">
    <Routes>
        <Route path = '/' Component={Firstpage}/>
        <Route path='/enter' Component={Enter}/>
        <Route path='/reg' Component={Registrarion}/>
        <Route path='/:login' Component={UserPage}/>
        <Route path='/:login/items' Component={Shop}/>
        <Route path='/:login/cart' Component={Cart}/>
      </Routes>
    </div>
    </Router>
  )
}

export default App;
