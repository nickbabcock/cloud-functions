import { HighwayHash } from "highwayhasher/slim";
import wasm from "../../../node_modules/highwayhasher/dist/highwayhasher_wasm_simd_bg.wasm"

const fetch: ExportedHandlerFetchHandler = async (req) => {
  const module = await HighwayHash.loadModule({ wasm });

  const hasher = module.create();
  const reader = req.body?.getReader();
  while (reader) {
    let { value, done } = await reader?.read();
    if (!done) {
      hasher.append(value);
    } else {
      break;
    }
  }

  const output = hasher.finalize64();
  const hexbody = [...output]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");

  return new Response(hexbody + "\n", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export default {
  fetch,
};
