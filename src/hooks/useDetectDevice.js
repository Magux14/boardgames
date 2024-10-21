import { useState } from "react";
export const useDetectDevice = () => {

    const [isMobile] = useState(window.innerHeight > window.innerWidth);
    return {
        isMobile
    }

}
