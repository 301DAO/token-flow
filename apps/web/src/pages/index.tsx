import type { NextPage } from 'next';
import Container from '../components/container/Container';
import Mezzanine from '../components/navbar/Mezzanine';

const Home: NextPage = () => {
    return (
        <main className="h-screen flex flex-col">
            <Mezzanine />
            <Container />
        </main>
    );
};

export default Home;
