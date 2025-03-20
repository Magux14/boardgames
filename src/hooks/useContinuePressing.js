export const useContinuePressing = (onStart, onEnd) => {

    const pressing = () => {
        console.log('onTouchStart');
        onStart();
    }

    const stopPressing = () => {
        console.log('onTouchEnd');
        onEnd();
    }

    return {
        onTouchStart: pressing,
        onMouseDown: pressing,
        onTouchMove: stopPressing,
        onTouchEnd: stopPressing,
        onTouchCancel: stopPressing,
        onMouseLeave: stopPressing,
        onMouseUp: stopPressing
    };
};