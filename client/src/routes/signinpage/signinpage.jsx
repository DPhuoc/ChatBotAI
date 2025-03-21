import './signinpage.css'


const Signinpage = () => {
  return (
    <div className='signinpage'>
      <div class="login-container">
        <h2>Login to CelebAI</h2>
        <form>
            <input type="text" placeholder="Username" required/>
            <input type="password" placeholder="Password" required/>
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Signinpage