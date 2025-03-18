import { useRef } from 'react';

export const useLongPress = (onStart, onEnd, delay = 500) => {
    const timeoutRef = useRef(null);
    const isPressingRef = useRef(false); // Controla si el usuario sigue presionando

    const startPress = () => {
        isPressingRef.current = true;
        timeoutRef.current = setTimeout(() => {
            if (isPressingRef.current) {
                onStart();
            }
        }, delay);
    };

    const stopPress = () => {
        isPressingRef.current = false; // Se asegura de que deje de estar presionado
        clearTimeout(timeoutRef.current);
        onEnd(); // Oculta el contenido cuando se suelta
    };

    return {
        onMouseDown: startPress,
        onMouseUp: stopPress,
        onMouseLeave: stopPress,
        onTouchStart: startPress,
        onTouchEnd: stopPress,
    };
};