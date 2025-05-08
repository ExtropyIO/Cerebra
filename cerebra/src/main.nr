use dep::std::hash::poseidon;

// struct Dataset {
//     data: Field,
// }

fn main(x: Field, y: Field) {
    assert(x == y);

    // comment out for now. hash is for mpc only
    // poseidon::bn254::hash_2([x, y])
}

#[test]
fn test_main() {
    main(1, 1);
}
