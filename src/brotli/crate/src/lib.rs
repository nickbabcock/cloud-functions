use std::io::Write;
use wasm_bindgen::prelude::*;

fn new_brotli<W: Write>(writer: W) -> brotli::CompressorWriter<W> {
    brotli::CompressorWriter::new(writer, 4096, 6, 22)
}

#[wasm_bindgen]
pub struct BrotliCompressor {
    writer_ptr: *mut brotli::CompressorWriter<Vec<u8>>,
}

#[wasm_bindgen]
impl BrotliCompressor {
    #[wasm_bindgen(constructor)]
    pub fn new() -> BrotliCompressor {
        let sink = Vec::new();
        let writer = new_brotli(sink);
        let writer_ptr = Box::into_raw(Box::new(writer));
        BrotliCompressor { writer_ptr }
    }

    #[wasm_bindgen]
    pub fn append(&mut self, data: &[u8]) {
        let mut writer = unsafe { Box::from_raw(self.writer_ptr) };
        let mut reader = std::io::Cursor::new(data);
        std::io::copy(&mut reader, &mut writer).unwrap();
        std::mem::forget(writer);
    }

    #[wasm_bindgen]
    pub fn finish(self) -> Vec<u8> {
        let writer = unsafe { Box::from_raw(self.writer_ptr) };
        writer.into_inner()
    }
}
