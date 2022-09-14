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
      <Route path='/treelink' element={<App/>}/>
      <Route path='/treelink/login' element={<LoginView/>}/>
      <Route path='/treelink/dashboard' element={<DashboarView/>}/>
      <Route path='/treelink/dashboard/profile' element={<EditProfileView/>}/>
      <Route path='/treelink/singout' element={<SingOutView/>}/>
      <Route path='/treelink/u/:username' element={<PublicProfileView/>}/>
      <Route path='/treelink/choose-username' element={<ChooseUserNameView/>}/>
    </Routes>
  </BrowserRouter>
)
