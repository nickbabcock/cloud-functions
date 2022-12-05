declare module "jomini/slim" {
  export * from "jomini";
}

declare module "*.wasm" {
  const content: WebAssembly.Module;
  export default content;
}
