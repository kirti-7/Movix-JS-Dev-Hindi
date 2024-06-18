import React from 'react'

import { Carousel } from '../../../components';
import useFetch from '../../../hooks/useFetch';

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    let title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    if (error) {
        // Handle error state here, e.g., display an error message or log the error
        console.error("Error fetching similar content:", error);
        title = "Error fetching similar content.";
    }

    if (data?.results === undefined || data?.results?.length <= 0) {
        title = "No similar content found.";
    }



    
    return (
        <div>
            {loading && <div>Loading...</div>}
            {data?.results!==undefined && data?.results?.length>0 &&
                (<Carousel
                title={title}
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
            />)}
       </div>
    );
}

export default Similar