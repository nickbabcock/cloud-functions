let passThroughWasmPlugin = {
  name: "pass-through-wasm",
  setup(build) {
    const path = require("path");
    const fs = require("fs/promises");
    const opts = build.initialOptions;
    const outdir = opts.outfile ? path.dirname(opts.outfile) : opts.outdir;

    // Whenever esbuild encounters a `import x from "abc/foo.wasm"`
    build.onResolve({ filter: /\.wasm$/ }, async (args) => {
      // Copy "abc/foo.wasm" into the output directory
      const pathDir = path.dirname(args.path);
      await fs.mkdir(path.resolve(outdir, pathDir), { recursive: true });
      await fs.copyFile(
        require.resolve(args.path),
        path.join(outdir, args.path)
      );

      // Mark the path as external so that esbuild preserves the import
      return { path: args.path, external: true };
    });
  },
};

require("esbuild")
  .build({
    entryPoints: ["./src/index.ts"],
    format: "esm",
    bundle: true,
    minify: process.env.NODE_ENV === "production",
    outfile: "dist/index.mjs",
    plugins: [passThroughWasmPlugin],
  })
  .catch(() => process.exit(1));
