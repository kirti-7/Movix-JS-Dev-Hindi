import React, { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../utils/api';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading("loading...");
            setData(null);
            setError(null);
    
            try {
                const response = await fetchDataFromAPI(url);
                setData(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        
    }, [url]);


    return { data, loading, error };
}

export default useFetch;