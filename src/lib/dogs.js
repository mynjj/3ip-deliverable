import {randomElement} from './manip';
	

export const dogNames = [
    'Timmy',
    'Vaks',
    'Pluto',
    'Sofus',
    'Freja',
    'Loki',
    'Buffy',
    'Marley',
    'Mille',
    'Scooby',
    'Bolt',
    'Lassie',
    'Goofy',
    'Bella'
];

export function FakeDog() {
    this.name = randomElement(dogNames);
}
