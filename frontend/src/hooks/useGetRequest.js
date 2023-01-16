import loadingStatus from "../helpers/loadingStatus"
import { useState, useCallback } from "react";


const useGetRequest = (url) => {
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading)

    const get = useCallback(async () => {
        setLoadingState(loadingStatus.isLoading)
        try {
            const response = await fetch(url, { mode: 'cors' });
            const data = await response.json();
            setLoadingState(loadingStatus.loaded);
            return data;
        } catch (error) {
            setLoadingState(loadingStatus.hasErrored);
            return {};
        }
    }, [url])

    return { get, loadingState }
}

export default useGetRequest;