declare module "highwayhasher/slim" {
  export const HighwayHash: typeof import("highwayhasher").HighwayHash;
}

declare module "*.wasm" {
  const content: WebAssembly.Module;
  export default content;
}
