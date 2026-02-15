export const useArray = () => {

    const createBatchGenerator = (originalArray, batchSize = 20) => {
        let pool = shuffle([...originalArray]);

        return function getNextBatch() {
            if (pool.length < batchSize) {
                pool = shuffle([...originalArray]);
            }

            const batch = pool.slice(0, batchSize);
            pool = pool.slice(batchSize);

            return batch;
        };
    }

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return {
        createBatchGenerator,
        shuffle
    }
}
