import '../styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
    return (
        <Component {...pageProps} />
        // <div style={{
        //   backgroundColor: "black",
        //   height: "1000px"
        // }}>

        // </div>
    )
    // return <div>
    //   <Mezzanine />
    //   <Container />
    // </div>
}

export default App;
