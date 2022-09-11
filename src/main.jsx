import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import { LoginView } from './routes/LoginView'
import {DashboarView} from './routes/DashboarView'
import {EditProfileView} from './routes/EditProfileView'
import {SingOutView} from './routes/SingOutView'
import {PublicProfileView} from './routes/PublicProfileView'
import {ChooseUserNameView} from './routes/ChooseUserNameView'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='login' element={<LoginView/>}/>
      <Route path='dashboard' element={<DashboarView/>}/>
      <Route path='dashboard/profile' element={<EditProfileView/>}/>
      <Route path='singout' element={<SingOutView/>}/>
      <Route path='u/:username' element={<PublicProfileView/>}/>
      <Route path='choose-username' element={<ChooseUserNameView/>}/>
    </Routes>
  </BrowserRouter>
)
