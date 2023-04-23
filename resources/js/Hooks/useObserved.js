import { useCallback, useEffect, useState, useRef } from 'react';

export const useObserved = (refObserved, threshold = 500) => {
    const refObserver = useRef();
    const canObserve = useRef(true);
    const observeWhenAvailable = useRef(false);

    const [isObserved, setIsObserved] = useState(false);

    const startObserving = () => {
        if (canObserve.current) {
            refObserver.current.observe(refObserved.current);
            canObserve.current = false;

            setTimeout(() => {
                canObserve.current = true;

                if (observeWhenAvailable.current) {
                    observeWhenAvailable.current = false;
                    startObserving();
                }
            }, threshold);
        } else {
            observeWhenAvailable.current = true;
        }
    };

    const stopObserving = () => {
        refObserver.current.unobserve(refObserved.current);
        setIsObserved(false);
    };

    useEffect(() => {
        refObserver.current = new IntersectionObserver(handleObserved);
    }, [refObserved]);

    useEffect(() => {
        startObserving();

        return () => {
            refObserver.current.disconnect();
        };
    }, [refObserved]);

    const handleObserved = useCallback((entries) => {
        entries.forEach(
            e => {
                if (e.isIntersecting) {
                    setIsObserved(true);
                }
            }
        );
    }, []);

    return { isObserved, startObserving, stopObserving };
};