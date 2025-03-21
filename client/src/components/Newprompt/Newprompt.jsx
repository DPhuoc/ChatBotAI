import './Newprompt.css'

const Newprompt = () => {
  return (
    <div className='newprompt'>
        <form className='newform'>
            <input type='text' placeholder='skibidi'></input>
            <button>
                <img src="/arrow.png" alt = "" />
            </button>
        </form>
    </div>
  )
}

export default Newprompt