import { Link } from "react-router-dom"
import style from '../routes/css/dashboarwrapper.module.css'

export const DashboardWraper = ({children,currentuser}) => {
  return (
    <div>
        <nav className={style.nav}>
            <div className={style.logo}>TreeLink</div>
            <Link to='/treelink/dashboard'>Links</Link>
            <Link to='/treelink/dashboard/profile'>Profile</Link>
            <Link to='/treelink/singout'>Singout</Link>
            <Link to={`/treelink/u/${currentuser}`} >Public profile</Link>
        </nav>

        <div className='main-container'>{children}</div>
        
    </div>
  )
}
