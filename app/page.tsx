import Footer from "@/components/footer";
import Header from "@/components/header";
import { MainContainer } from "@/components/main-container";

const HomePage = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      {/* header section */}
      <Header/>
      {/* main container */}
      <MainContainer/>
      </div>
      {/*footer*/}
      <Footer/>
    </>
  );
};

export default HomePage;
