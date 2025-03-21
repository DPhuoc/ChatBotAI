
import './signuppage.css'

const Signuppage = () => {
  return (
    <div className='signup'>
       <div class="register-container">
        <h2>SignUp for CelebAI</h2>
        <form>
            <input type="text" placeholder="Username" required/>
            <input type="email" placeholder="Email" required/>
            <input type="password" placeholder="Password" required/>
            <input type="password" placeholder="Confirm Password" required/>
            <button type="submit">Register</button>
        </form>
       </div>
    </div>
  )
}

export default Signuppage