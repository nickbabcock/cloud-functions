import { Jomini } from "jomini/slim";
import wasm from "jomini/jomini.wasm";

const fetch: ExportedHandlerFetchHandler = async (req) => {
  const jomini = await Jomini.initialize({ wasm });

  const data = new Uint8Array(await req.arrayBuffer());
  const out = jomini.parseText(data, {}, (q) => q.json());
  return new Response(out, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {
  fetch,
};
