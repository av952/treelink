import { Link } from "react-router-dom"
import style from '../routes/css/dashboarwrapper.module.css'

export const DashboardWraper = ({children,currentuser}) => {
  return (
    <div>
        <nav className={style.nav}>
            <div className={style.logo}>TreeLink</div>
            <Link to='/dashboard'>Links</Link>
            <Link to='/dashboard/profile'>Profile</Link>
            <Link to='/singout'>Singout</Link>
            <Link to={`/u/${currentuser}`} >Public profile</Link>
        </nav>

        <div className='main-container'>{children}</div>
        
    </div>
  )
}
