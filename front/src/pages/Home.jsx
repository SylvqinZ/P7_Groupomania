import Post from "../components/Post";
import logo from "../logo/15.png";
import React, { useEffect, useState } from "react";

const Home = () => {
  return (
    <main>
      <h1>Accueil</h1>

      <section className="posts">
        <Post
          userId=""
          avatar=""
          title="Mon titre 1"
          userName="@moi1"
          date="2022.09.19, 13:22:31"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?"
          image={logo}
        />
        <Post
          userId=""
          avatar=""
          title="Mon titre 2"
          id="2"
          userName="@moi2"
          date="2022.09.19, 13:22:31"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?"
          image={logo}
        />
        <Post
          userId=""
          avatar=""
          title="Mon titre 3"
          id="3"
          userName="@moi3"
          date="2022.09.19, 13:22:31"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?"
          image=""
        />
        <Post
          userId=""
          avatar=""
          title="Mon titre 4"
          id="4"
          userName="@moi4"
          date="2022.09.19, 13:22:31"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?"
          image=""
        />
        <Post
          userId=""
          avatar=""
          title="Mon titre 5"
          id="5"
          userName="@moi5"
          date="2022.09.19, 13:22:31"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio corporis quis vero
          deleniti provident quas atque numquam dignissimos cupiditate laborum a iusto autem
          voluptatibus, incidunt beatae animi repudiandae dolorum id?"
          image=""
        />
      </section>
    </main>
  );
};

export default Home;
