// NOTE: Remove qu
const consonantsReduced = [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "z"
];
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
const allSounds = consonantsReduced.concat(vowels);

function isiOS(){
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const _iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/);
    return iOS || _iOSDevice;
}
export {consonantsReduced, vowels, allSounds, isiOS};