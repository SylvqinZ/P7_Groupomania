function login() {
  return (
    <main>
      <h1>Se connecter</h1>
      <div className="container">
        <form className="form">
          <div class="form__group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form__email"
              id="email"
              formControlName="email"
            />
          </div>
          <div class="form__group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form__password"
              id="password"
              formControlName="password"
            />
          </div>
          <div className="form__btn">
            <button
              className="btn"
              type="submit"
              mat-raised-button
              color="primary"
            >
              Se Connecter
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default login;
