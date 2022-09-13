import { Link } from "react-router-dom"

export const DashboardWraper = ({children}) => {
  return (
    <div>
        <nav>
            <div>Logotipo</div>
            <Link to='/dashboard'>Links</Link>
            <Link to='/dashboard/profile'>Profile</Link>
            <Link to='/singout'>Singout</Link>
        </nav>

        <div>{children}</div>
        
    </div>
  )
}
