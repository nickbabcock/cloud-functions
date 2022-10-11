use highway::{HighwayHash, HighwayHasher};
use std::io::Read;

fn main() {
    let mut stdin_lock = std::io::stdin().lock();
    let mut buffer = [0u8; 0x8000];

    let key = highway::Key::default();
    let mut hasher = HighwayHasher::new(key);

    loop {
        match stdin_lock.read(&mut buffer) {
            Ok(read) => {
                if read == 0 {
                    println!("{:#0x}", hasher.finalize64());
                    break;
                }

                hasher.append(&buffer[..read]);
            }
            Err(e) => {
                println!("error: {}", e);
                break;
            }
        }
    }
}
