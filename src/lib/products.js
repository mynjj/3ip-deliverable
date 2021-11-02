import {randomElement} from './manip';

export const brands = [
    'Vuffeli',
    'Doggiriux'
];

export const types = [
    'Toy',
    'Food',
    'Clothes',
    'Accesories'
];

export function FakeProduct() {
    this.brand = randomElement(brands);
    this.type = randomElement(types);
}
