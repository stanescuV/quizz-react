import Hero from "../components/Hero";
import NavbarShad from "../components/NavbarShad";
import MiddleSection from "../components/MiddleSection";
import CarouselFront from "../components/CarouselFront";
import TextAndDiscoverButton from "../components/TextAndDiscoverButton";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import { JoinRoom } from "../components/JoinRoom";
type Props = {};

function Home({}: Props) {
    return (
        <div className="flex flex-col">
            <NavbarShad />
            <JoinRoom/> 
            <Hero />
            <MiddleSection />
            <CarouselFront />
            <TextAndDiscoverButton />
            <RegisterForm />
            <Footer/>
        </div>
    );
}

export default Home;
