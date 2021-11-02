export const swap = ([x,y])=>[y, x];

export const randomElement = array => {
    const i = Math.floor(Math.random()*array.length);
    return array[i];
};
