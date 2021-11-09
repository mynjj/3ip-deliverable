import faker from 'faker';
import _ from 'lodash/fp';
import {FakeProduct} from './products';
import {FakeDog} from './dogs';
import {randomElement} from './manip';

const N_USERS=40;
const currentUserCoordinates = [55.707782, 12.562532];

const descriptions = [
    ({name, dog: {name: dogName}})=>`Hi! I'm ${name}, my doggy ${dogName} and I love to take long walks along the beach, would love to meet more friends.`,
    ({dog: {name: dogName}})=>`${dogName} is super excited to meet more dogs to play with, message us if you're up for a walk near us :)`,
    ({dog: {name: dogName}})=>`VuffWufffVuffffffWuffff - ${dogName}`,
    ({name, dog: {name: dogName}})=>`I'm ${dogName}, my owner ${name} is busy on the weeks, but maybe someone could help me play more? Would love some friends!! Vuff!`
];

export function FakeUser(){
    this.name = faker.name.findName();
    this.email = faker.internet.email();
    this.coordinates = faker.address.nearbyGPSCoordinate(currentUserCoordinates, Math.random()*9, true).map(x=>parseFloat(x));

    const nProducts = Math.floor(Math.random()*4);
    this.products = _.times(()=>new FakeProduct(), nProducts);
    this.dog = new FakeDog();
    this.description = randomElement(descriptions)(this);
};

let currentUser = new FakeUser();
currentUser.name = 'Nick Brown';
currentUser.email =  'nicky-b@hotmail.com';
currentUser.coordinates = currentUserCoordinates;
currentUser.products = [];

export const sampleUsers = [currentUser, ..._.times(()=>new FakeUser(), N_USERS)];
