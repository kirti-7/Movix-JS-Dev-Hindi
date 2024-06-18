import React from 'react'
import { Carousel } from '../../../components';
import useFetch from '../../../hooks/useFetch';

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    let title = "Recommendations";

    if (error) {
        // Handle error state here, e.g., display an error message or log the error
        console.error("Error fetching recommendation:", error);
        title = "Error fetching recommendatio.";
    }

    if (data?.results === undefined || data?.results?.length <= 0) {
        title = "No content found to be recommended.";
    }


    return (
        <>
            {loading && <div>Loading...</div>}
            {data?.results !== undefined && data?.results?.length > 0 &&
                (<Carousel
                    title={title}
                    data={data?.results}
                    loading={loading}
                    endpoint={mediaType}
                />)}
        </>
    );
}

export default Recommendation