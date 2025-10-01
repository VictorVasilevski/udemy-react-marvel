import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(
        async ({
            baseUrl,
            path, 
            method = 'GET', 
            body = null, 
            // headers = {'Content-Type': 'application/json'},
            queryParams = {}
        }) => {
            setProcess('loading');
            try {
                const url = `${baseUrl}${path}?${new URLSearchParams(queryParams).toString()}`;
                const response = await fetch(url, {
                    method, body 
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch resource ${url}. Status: ${response.status}`);
                }
                const data = await response.json();
                if (data.error) {
                    throw new Error(`Failed to fetch resource ${url}. Error: ${data.error}`);
                }
                console.log(data);
                return data;
            } catch(e) {
                setProcess('error');
                throw e;
            }
    }, []);

    const clearError = useCallback(() => {
        setProcess('waiting');
    }, []);
    return {request, clearError, process, setProcess}
}