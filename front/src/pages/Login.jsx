function login() {
  return (
    <main>
      <h1>Se connecter</h1>
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
          <button className="btn" mat-raised-button color="primary">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

export default login;
