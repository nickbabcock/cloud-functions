declare module "jomini/slim" {
  export const Jomini: typeof import("jomini").Jomini;
}

declare module "*.wasm" {
  const content: WebAssembly.Module;
  export default content;
}
