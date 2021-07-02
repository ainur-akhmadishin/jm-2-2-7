import React from 'react';
import './ItemList.scss';
import PropTypes from 'prop-types';

const ItemList = ({ title, dataRelease, posterUrl, overview }) => {
  ItemList.defaultProps = {
    title: '',
    dataRelease: '',
    posterUrl: '',
    overview: '',
  };

  const String = (str) => {
    if (str.length < 240) return `${str}...`;

    const shortText = str.slice(0, 240);
    const lastSpace = shortText.lastIndexOf(' ');
    return `${shortText.slice(0, lastSpace)}...`;
  };

  const imgUrl = `https://image.tmdb.org/t/p/w500${posterUrl}`;

  return (
    <div className="div">
      <img className="img" src={imgUrl} alt={title} />
      <div className="info">
        <h3>{title}</h3>
        <span>{dataRelease}</span>
        <ul>
          <li>Action</li>
          <li>Drama</li>
        </ul>
        <div className="text">
          <p>{String(overview)}</p>
        </div>
      </div>
    </div>
  );
};

ItemList.propTypes = {
  title: PropTypes.string,
  dataRelease: PropTypes.string,
  posterUrl: PropTypes.string,
  overview: PropTypes.string,
};

export default ItemList;
