declare module "highwayhasher/slim" {
  export * from "highwayhasher";
}

declare module "*.wasm" {
  const content: WebAssembly.Module;
  export default content;
}
