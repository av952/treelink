import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {import.meta.env.VITE_SALUDO}
      <h1 className='logo'>Welcome To TreeLink</h1>
      <Link className='link' to='treelink/login'>Login</Link>
    </div>
  )
}

export default App
