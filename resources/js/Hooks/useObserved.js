import { useCallback, useEffect, useState, useRef } from 'react';

export const useObserved = (refObserved) => {
    const refObserver = useRef();

    const [isObserved, setIsObserved] = useState(false);

    const startObserving = () => refObserver.current.observe(refObserved.current);
    const stopObserving = () => {
        refObserver.current.unobserve(refObserved.current);
        setIsObserved(false);
    }

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