export const useSaveState = (key) => {

    const saveState = (obj) => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    const loadState = () => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    }

    const deleteState = () => {
        localStorage.removeItem(key);
    }

    return {
        saveState,
        loadState,
        deleteState
    }
}
