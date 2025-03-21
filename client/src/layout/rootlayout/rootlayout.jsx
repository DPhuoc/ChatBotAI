import { Link, Outlet } from 'react-router-dom'
import './rootlayout.css'



const Rootlayout = () => {
  return (
    
      <div className='rootlayout'>
          <header>
              <Link to="/" className='logo'>
                  <img src = "/skadi.gif" alt="" />
                  <span>CelebAI</span>
              </Link>
              <div className='user'>
              </div>
          </header>
          <main>
              <Outlet/>
          </main>
      </div>
  );
};

export default Rootlayout