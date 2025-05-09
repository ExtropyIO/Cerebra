use dep::std::hash::poseidon;

// struct Dataset {
//     data: Field,
// }

fn main(x: Field, y: Field) -> pub Field {
    poseidon::bn254::hash_2([x, y])
}

#[test]
fn test_main() {
    main(1, 2);
}
