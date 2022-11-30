import Image from 'next/image';

const MyImage = (props) => {
  if (props.optimize == 'disable') {
    return <img {...props} />;
  }

  return (
    <Image placeholder="blur" blurDataURL="/assets/img/loader.png" {...props} />
  );
};

MyImage.defaultProps = {
  optimize: 'enable',
};

export default MyImage;
