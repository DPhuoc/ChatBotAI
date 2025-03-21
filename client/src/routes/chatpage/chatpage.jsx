import Newprompt from '../../components/Newprompt/Newprompt';
import './chatpage.css'
import {useEffect, useRef} from "react";

const Chatpage = () => {

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior : "smooth"});
  },[]);

  return (
    <div className='chatpage'>
      <div className='wrapper'>
        <div className='chat'>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <div className='message user'>Test</div>
          <div className='message'>Test</div>
          <Newprompt/>
          <div ref={endRef}/>
        </div>
      </div>
    </div>
  )
}

export default Chatpage