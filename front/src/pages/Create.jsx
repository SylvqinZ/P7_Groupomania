function create() {
  return (
    <main>
      <h1>Creér un post</h1>
      <form className="create">
        <input
          className="create__title"
          placeholder="Votre Titre"
          type="text"
        />
        <textarea
          className="create__text"
          placeholder="Quoi de neuf ?"
          type="text"
        />

        <input className="create__image" type="file" />
        <div className="create__btn">
          <input className="btn" value="Publier" type="submit" />
        </div>
      </form>
    </main>
  );
}

export default create;
