import { useEffect, useState } from "react";

export const usePaginatedResults = (url, onResult) => {
    const [currPage, setCurrPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getPaginatedResults(url) {
            try {
                if (currPage === 0) {
                    return;
                }

                setIsLoading(true);

                const response = await axios.get(url, {
                    params: {
                        page: currPage
                    }
                });

                setIsLoading(false);

                onResult(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getPaginatedResults(url);
    }, [currPage]);

    return { currPage, setCurrPage, isLoading };
};