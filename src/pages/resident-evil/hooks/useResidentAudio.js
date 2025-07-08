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

    return {
        playOpenInventory,
        playCloseInventory
    }
}
