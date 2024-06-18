import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";


import { fetchDataFromAPI } from '../../utils/api';
import { ContentWrapper, MovieCard, Spinner } from '../../components';

import './searchResult.scss';


function SearchResult() {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();


  // console.log(data);

  const fetchInitialData = async () => {
    setLoading(true);
    const response = await fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`);
    console.log(response?.results);
    try {
      if (response) {
        setData(response);
        setPageNum(prev => prev + 1);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchNextPageData = async () => {
    setLoading(true);
    const response = await fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`);
    // console.log(response.results);
    try {
      if (response) {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...response.results] });
        }
        else{
          setData(response);
        }
        setPageNum(prev => prev + 1);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className='searchResult'>
      {loading  && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                { `Search ${data?.total_results > 1 ? "results":"result"} of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner/>}
              >

              {data?.results?.map((item, index) => {
                if (item.media_type === "person") {
                  return
                }
                return <MovieCard key={index} data={item} fromSearch={true} />
                })}

              {/* load more app */}
              {/* {!loading && (data?.total_results>data?.results?.length)  && (
                <button className="loadMore" onClick={fetchNextPageData}>Load More</button>
                )} */}
              {/* {loading && pageNum > 1 && <Spinner />} */}
                </InfiniteScroll>
            </>
          ) : (
              <span className='resultNotFound'>Sorry, results not found</span>
          )}
        </ContentWrapper>
      ) }
    </div>
  );
}

export default SearchResult;