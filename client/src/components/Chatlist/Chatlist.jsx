import './Chatlist.css'
import {Link} from 'react-router-dom'

const Chatlist = () => {
  return (
    <div className='chatlist'>
      <span className='title'>Dashboard</span>
      <Link to="/dashboard">new</Link>
      <Link to="/">haha</Link>
      <Link to="/">haha</Link>
      <hr/>
      <span className='title'>RECENT CHAT</span>
      <div className='list'>
        <Link to="/">wtf</Link>
        <Link to="/">wtf</Link>
        
      </div>
      <hr/>
      <div className='upgrade'>
        <img src="/logo.png" alt="" />
        <div className='texts'>
          <span>Upgrade wtf</span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Chatlist