import { Outlet, useNavigate } from 'react-router-dom'
import './dashboardlayout.css'
import Chatlist from '../../components/Chatlist/Chatlist';

const Dashboardlayout = () => {

  return (
    <div className='dashboardlayout'>
        <div className='menu'><Chatlist/></div>
        <div className='content'>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboardlayout