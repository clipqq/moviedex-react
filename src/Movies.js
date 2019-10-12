import React from 'react';
// import moment from 'moment';

export default function Movies(props) {
  return (
    <div className="movies">
      <h2>{ props.film_title }</h2>
      {/* <div className="film-title">by { props.film_title }</div> */}
      {/* <div className="book_publisher">
        Published by: { props.publisher }
        on {moment(props.published_date).format('DD MMM YYYY')}
      </div>
      <div className="book_description">{ props.description }</div> */}
      {/* <div className="movies_details">
        Rank {props.rank} this week
      </div> */}
    </div>
  );
}