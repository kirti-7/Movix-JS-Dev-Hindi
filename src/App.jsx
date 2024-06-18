import { useEffect } from 'react'
import { fetchDataFromAPI } from './utils/api'

import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import { getApiConfiguration, getGenres } from './store/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import {Details, Explore, Home, PageNotFound, SearchResult} from './pages';
import Layout from './Layout';

function App() {

  const dispatch = useDispatch();
  const { url } = useSelector(state => state.home);

  // console.log(url)
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])
  

  const fetchApiConfig = () => {
    fetchDataFromAPI('/configuration')
      .then((res) => {
        // console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      });
  };


  const genresCall = async () => {
    let promises = [];
    let endPoints = ["movie","tv"];
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);
    // console.log(data);
    
    data.map(({ genres }) => {
      return genres.map((item)=>(allGenres[item.id]=item))
    })

    dispatch(getGenres(allGenres));
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/:mediaType/:id',
          element: <Details />,
        },
        {
          path: '/search/:query',
          element: <SearchResult />,
        },
        {
          path: '/explore/:mediaType',
          element: <Explore />,
        },
        {
          path: '*',
          element: <PageNotFound />,
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
