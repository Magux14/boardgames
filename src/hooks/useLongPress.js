import { useRef } from 'react';

export const useLongPress = (onLongPress, onClick, delay = 500) => {
    const timerRef = useRef(null);
    const longPressTriggered = useRef(false);

    const start = (e) => {
        longPressTriggered.current = false;

        timerRef.current = setTimeout(() => {
            onLongPress(e);
            longPressTriggered.current = true;
        }, delay);
    };

    const clear = (e) => {
        clearTimeout(timerRef.current);

        if (!longPressTriggered.current && onClick) {
            onClick(e);
        }
    };

    return {
        onMouseDown: start,
        onTouchStart: start,
        onMouseUp: clear,
        onMouseLeave: clear,
        onTouchEnd: clear
    };
}