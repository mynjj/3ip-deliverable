import {randomElement} from './manip';

export const brands = [
    'Vuffeli',
    'Pedigree',
    'Olivers',
    'Royal Canin'
];

export const types = [
    'Toy',
    'Food',
    'Clothes',
    'Accesories'
];

const FREE_P = 0.5;
const MAX_PRICE = 100;
export function FakeProduct() {
    this.brand = randomElement(brands);
    this.type = randomElement(types);
    this.price = Math.random()<=FREE_P?0:Math.random()*MAX_PRICE;
}
