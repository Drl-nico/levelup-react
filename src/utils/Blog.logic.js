window.blogLogic = {
  // Retorna la cantidad total de posts definidos
  getPostCount(posts) {
    return posts.length;
  },

  // Verifica si un post contiene los campos obligatorios
  isValidPost(post) {
    return !!(
      post.id &&
      post.title &&
      post.img &&
      post.href &&
      post.excerpt &&
      typeof post.title === "string"
    );
  },

  // Busca un post por ID
  findPostById(posts, id) {
    return posts.find((p) => p.id === id);
  },
};
