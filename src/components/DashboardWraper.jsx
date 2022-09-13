import { Link } from "react-router-dom"
import style from '../routes/css/dashboarwrapper.module.css'

export const DashboardWraper = ({children}) => {
  return (
    <div>
        <nav className={style.nav}>
            <div className={style.logo}>Logotipo</div>
            <Link to='/dashboard'>Links</Link>
            <Link to='/dashboard/profile'>Profile</Link>
            <Link to='/singout'>Singout</Link>
        </nav>

        <div className='main-container'>{children}</div>
        
    </div>
  )
}
