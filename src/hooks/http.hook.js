import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async ({
            baseUrl,
            path, 
            method = 'GET', 
            body = null, 
            // headers = {'Content-Type': 'application/json'},
            queryParams = {}
        }) => {
            setLoading(true);
            try {
                const url = `${baseUrl}${path}?${new URLSearchParams(queryParams).toString()}`;
                console.log(url);
                const response = await fetch(url, {
                    method, body 
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch resource ${url}. Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setLoading(false);
                return data;
            } catch(e) {
                setLoading(false);
                setError(e.message);
                throw e;
            }
    }, []);

    const clearError = useCallback(() => setError(null), []);
    return {loading, request, error, clearError}
}