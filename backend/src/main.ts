import { buildServer } from "./server";

async function main() {
  try {
    const server = await buildServer();
    await server.listen({ port: 8080, host: "0.0.0.0" });
    console.clear();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
