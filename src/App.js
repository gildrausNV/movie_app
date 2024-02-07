import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <div className="page">
        <Login/>
        {/* <Register/> */}
      </div>
    </div>
  );
}

export default App;
