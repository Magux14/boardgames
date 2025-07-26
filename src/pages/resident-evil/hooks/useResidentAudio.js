export const useResidentAudio = () => {

    const playAudio = (audioPath) => {
        const audio = new Audio(audioPath);
        audio.volume = 1;
        audio.play().catch(err => {
            console.warn('No se pudo reproducir el audio automáticamente:', err);
        });
    }

    const playOpenInventory = () => {
        const path = `./music/resident evil/open-inventory.mp3`;
        playAudio(path);
    }

    const playCloseInventory = () => {
        const path = `./music/resident evil/close-inventory.mp3`;
        playAudio(path);
    }

    const playIntro = () => {
        const path = `./music/resident evil/intro.mp3`;
        playAudio(path);
    }

    const playItemInteraction = () => {
        const path = `./music/resident evil/falling-bullet.wav`;
        playAudio(path);
    }

    const playFallingBullets = () => {
        const path = `./music/resident evil/falling-bullet.wav`;
        playAudio(path);
    }

    const playReload = () => {
        const path = `./music/resident evil/reload.wav`;
        playAudio(path);
    }

    return {
        playOpenInventory,
        playCloseInventory,
        playIntro,
        playItemInteraction,
        playReload,
        playFallingBullets
    }
}
