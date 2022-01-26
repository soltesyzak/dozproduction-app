import { Component } from 'react';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Client from './components/Client';
import ClientsList from './components/ClientsList';
import AddClient from './components/AddClient';
import Footer from './components/Footer';
import { 
    Routes,
    Route,
    BrowserRouter as Router
} from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.min.css';


class App extends Component {
    constructor( props: {} ) {
        super(props);
    }

    // Render function
    public render() {
        return (
            
            <div className="">
            {/* <div className="has-text-white has-background-black"> */}
                    <Navigation />
                    <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<LandingPage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/clients" element={<ClientsList />} />
                        <Route path="/clients/:id" element={<Client />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/clients/add" element={<AddClient/>} />
                    </Routes> 
                    </Router>
                    <Footer />
            </div>
            
        )
    }
}

export default App;
