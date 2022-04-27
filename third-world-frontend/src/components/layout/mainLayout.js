import Footer from "../main/footer";
import NavBar from "../main/navBar";

const MainLayout = (props) => {

  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
}

export default MainLayout