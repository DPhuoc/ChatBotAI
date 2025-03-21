import './dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='texts'>
        <div className='logo'>
          <img src="/logo.png" alt="" />
          <h1>CelebAI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Skibidi</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>dopdop</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>yesyes</span>
          </div>
        </div>
      </div>
      <div className='formContainer'>
        <form>
          <input type ="text" placeholder='pickle ball' />
          <button>
            <img src="arrow.png" alt = "" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard