StarRating = (props) => {
  const rating = props.rating;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars;
  const emptyStars = 5 - fullStars - Math.ceil(halfStar);

  return (
    <span>
      { _.range(fullStars).map((i) => <i className="fa fa-star" key={i} />) }
      { halfStar ? <i className="fa fa-star-half-o"/> : '' }
      { _.range(emptyStars).map((i) => <i className="fa fa-star-o" key={i} />) }
    </span>
  );
};