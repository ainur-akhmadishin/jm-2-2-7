import React from 'react';
import PropTypes from 'prop-types';
import ItemList from '../item-list';
import './List.scss';

const List = ({ data }) => {
  List.defaultProps = {
    data: {},
  };

  console.log(data);

  const elemets = data.results.map((el) => {
    const { title, id, overview } = el;
    const dataRelease = el.release_date;
    const posterUrl = el.poster_path;

    return <ItemList title={title} dataRelease={dataRelease} posterUrl={posterUrl} overview={overview} key={id} />;
  });

  return <div className="list">{elemets}</div>;
};
export default List;

List.propTypes = {
  data: PropTypes.instanceOf(Object),
};
