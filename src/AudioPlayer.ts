import { allSounds } from "./shared";

// Set-up Audio player
export const AUDIO_KEYS = {
    CORRECT: '_correct',
    FLIP: '_flip'
};

class AudioPlayer {
    private audioMap: Map<string, HTMLAudioElement>;
    constructor(sounds: string[]){
        this.audioMap = new Map(sounds.map(s => [s, new Audio(require(`./assets/alphabet_sounds/${s}.mp3`))]));
        this.audioMap.set(AUDIO_KEYS.CORRECT, new Audio(require('./assets/game_sounds/correct.wav')));
        this.audioMap.set(AUDIO_KEYS.FLIP, new Audio(require('./assets/game_sounds/flip.wav')));
    }
    playFlip(sound?: string): void {
        const flipAudio = this.audioMap.get(AUDIO_KEYS.FLIP) as HTMLAudioElement;
        if (!sound) {
            flipAudio.onended = null;
        }
        else {
            const audio = this.audioMap.get(sound);
            if (!audio) {
                console.error('Could not find audio for key: ' + sound);
            } else {
                flipAudio.onended = () => { audio.play().catch(r => console.error('Could not play audio: ' + r)) };
            }
        }
        flipAudio
            .play()
            .catch((r) => console.error('Could not play audio: ' + r));
    }
    play(sound: string){
        const audio = this.audioMap.get(sound);
        if (!audio) {
            console.error('Could not find audio for key: ' + sound);
        } else {
            audio.play().catch(r => console.error('Could not play audio: ' + r));
        }
    }
}
const audioPlayer = new AudioPlayer(allSounds);
export default audioPlayer;