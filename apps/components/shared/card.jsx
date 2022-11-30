function Card(props) {
  return (
    <div
      className={`card shadow-sm rounded${
        props.classCard && ` ${props.classCard}`
      }`}
    >
      <div
        className={`card-body${
          props.classCardBody && ` ${props.classCardBody}`
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

Card.defaultProps = {
  classCard: '',
  classCardBody: '',
};

export default Card;
