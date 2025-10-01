import init, { BrotliCompressor } from "../crate/pkg/crate";
import wasm from "../crate/pkg/crate_bg.wasm";

const fetch: ExportedHandlerFetchHandler = async (req) => {
  await init(wasm);

  const compressor = new BrotliCompressor();
  const reader = req.body?.getReader();
  while (reader) {
    let { value, done } = await reader?.read();
    if (!done) {
      compressor.append(value);
    } else {
      break;
    }
  }

  // finish will consume the compressor so we shouldn't call free
  const output = compressor.finish();
  return new Response(output, {
    status: 200,
    headers: {
      ...req.headers,
      "Content-Encoding": "br",
    },
    encodeBody: "manual",
  });
}

export default {
  fetch,
};
