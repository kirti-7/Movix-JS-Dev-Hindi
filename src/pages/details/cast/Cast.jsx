import { useSelector } from 'react-redux';

import { ContentWrapper, Img } from '../../../components';
import avatar from "../../../assets/avatar.png";

import './cast.scss';

function Cast({ data, loading }) {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        
        <div className="cast">
            {data?.results !== undefined && data?.results?.length > 0 &&
                <ContentWrapper>
                    <div className="sectionHeading">Top Cast</div>
                    {!loading ? (
                        <div className="listItems">
                            {data?.map((item) => {
                                let imgUrl = item.profile_path
                                    ? url.profile + item.profile_path
                                    : avatar;
                                return (
                                    <div key={item.id} className="listItem">
                                        <div className="profileImg">
                                            <Img src={imgUrl} />
                                        </div>
                                        <div className="name">{item.name}</div>
                                        <div className="character">
                                            {item.character}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="castSkeleton">
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                    )}
                </ContentWrapper>
            }
        </div>
    );
}

export default Cast;