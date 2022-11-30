import Header from '@/layout/header';
import Footer from '@/layout/footer';

function Main(props) {
  return (
    <>
      <Header />
      <div className="container my-3">{props.children}</div>
      <Footer />
    </>
  );
}

export default Main;
