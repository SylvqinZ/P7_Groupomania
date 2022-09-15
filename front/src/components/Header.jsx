import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/signin">Signin</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  )
}

export default Header