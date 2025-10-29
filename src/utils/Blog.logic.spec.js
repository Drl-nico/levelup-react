describe("blogLogic", function () {
  const { getPostCount, isValidPost, findPostById } = window.blogLogic;

  const mockPosts = [
    {
      id: 1,
      title: "La PS5 sigue liderando las ventas en 2025",
      img: "ps5.webp",
      href: "/DetalleBlog2",
      excerpt: "La consola de Sony mantiene su popularidad...",
    },
    {
      id: 2,
      title: "Level-Up Gamer organiza un torneo nacional",
      img: "evento.jpg",
      href: "/DetalleBlog1",
      excerpt: "La comunidad gamer se reúne este mes en Santiago...",
    },
  ];

  it("debe contar correctamente el número de publicaciones", function () {
    const count = getPostCount(mockPosts);
    expect(count).toBe(2);
  });

  it("debe validar que un post contiene todos los campos requeridos", function () {
    const valid = isValidPost(mockPosts[0]);
    expect(valid).toBeTrue();
  });

  it("debe devolver false si un post no contiene todos los campos", function () {
    const invalidPost = { id: 3, title: "Post incompleto" };
    const valid = isValidPost(invalidPost);
    expect(valid).toBeFalse();
  });

  it("debe encontrar un post por su ID", function () {
    const post = findPostById(mockPosts, 2);
    expect(post.title).toContain("torneo nacional");
  });

  it("debe devolver undefined si el ID no existe", function () {
    const post = findPostById(mockPosts, 99);
    expect(post).toBeUndefined();
  });
});
