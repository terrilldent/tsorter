const port = Number(process.env.PORT || 3000);

const server = Bun.serve({
  port,
  development: true,
  fetch(request) {
    const url = new URL(request.url);
    let path = decodeURIComponent(url.pathname);

    if (path === "/") path = "/README.md";

    const file = Bun.file(`.${path}`);

    return file.exists().then((exists) => {
      if (!exists) return new Response("Not found", { status: 404 });
      return new Response(file);
    });
  }
});

console.log(`Dev server running at http://localhost:${server.port}`);
