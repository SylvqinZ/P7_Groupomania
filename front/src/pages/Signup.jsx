function signup() {
  return (
    <main>
      <h1>S'inscrire</h1>
      <div className="container">
      <form className="form">
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form__email"
            id="email"
            formcontrolname="email"
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form__password"
            id="password"
            formcontrolname="password"
          />
        </div>
        <div className="form__btn">
          <button className="btn" type="submit" color="primary">
            S'inscrire
          </button>
        </div>
      </form>
      </div>
      
    </main>
  )
}

export default signup