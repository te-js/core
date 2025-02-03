import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  console.log("Server started");
  // Creiamo un'istanza di Vite in modalità SSR
  const vite = await createViteServer({});

  app.use(vite.middlewares);

  // app.get("*", async (req, res) => {
  //   console.log(req.url);
  //   try {
  //     // Importiamo l'entry server dinamicamente
  //     const { render } = await vite.ssrLoadModule("/src/entry-server.ts");

  //     const appHtml = await render();
  //     const html = `
  //     <!DOCTYPE html>
  //     <html lang="it">
  //     <head>
  //       <meta charset="UTF-8">
  //       <title>My SSR Framework</title>
  //     </head>
  //     <body>
  //       <div id="app">${appHtml}</div>
  //       <script type="module" src="/src/entry-client.ts"></script>
  //     </body>
  //     </html>
  //     `;

  //     res.status(200).set({ "Content-Type": "text/html" }).send(html);
  //   } catch (error) {
  //     vite.ssrFixStacktrace(error);
  //     res.status(500).send(error.stack);
  //   }
  // });

  app.listen(3000, () =>
    console.log("Server in ascolto su http://localhost:3000")
  );
}

startServer();
