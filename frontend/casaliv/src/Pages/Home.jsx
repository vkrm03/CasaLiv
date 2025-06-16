import { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import '../../public/Home.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="home">
      <section id="hero" className="hero-banner" data-aos="fade-up">
        <div className="hero-text">
          <h1>Find Your Perfect Stay</h1>
          <p>CasaLiv brings you handpicked homes, just a click away.</p>
           <Link to={'/listings'}><button className="explore-btn">Explore Listings</button></Link>
        </div>
      </section>

      <section id="features" className="features" data-aos="fade-up">
        <h2>Explore Our Unique Features</h2>
        <div className="feature-grid">
          <div className="feature-tile" data-aos="fade-up" data-aos-delay="100">
            <i className="fa-solid fa-crown fa-beat fa-2xl m-10"></i>
            <h3>Ultimate Convenience</h3>
            <p>Enjoy seamless booking and Luxury experiences.</p>
          </div>
          <div className="feature-tile" data-aos="fade-up" data-aos-delay="100">
            <i className="fa-solid fa-globe fa-beat fa-2xl m-10"></i>
            <h3>Global Diversity</h3>
            <p>Choose from thousands of curated stays across the globe.</p>
          </div>
          <div className="feature-tile" data-aos="fade-up" data-aos-delay="100">
            <i className="fa-solid fa-headset fa-beat fa-2xl m-10"></i>
            <h3>24/7 Assistance</h3>
            <p>Our team is here to support you anytime, anywhere.</p>
          </div>
        </div>
      </section>

      <section id="destinations" className="destination-section" data-aos="fade-up">
        <h2 className="section-title">Top Destinations</h2>
        <div className="destination-scroll">
          <div className="destination-card" data-aos="zoom-in" data-aos-delay="100">
            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" alt="Paris" />
            <p>Paris</p>
          </div>
          <div className="destination-card" data-aos="zoom-in" data-aos-delay="200">
            <img src="https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=800&q=80" alt="New York" />
            <p>New York</p>
          </div>
          <div className="destination-card" data-aos="zoom-in" data-aos-delay="300">
            <img src="https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80" alt="Tokyo" />
            <p>Tokyo</p>
          </div>
          <div className="destination-card" data-aos="zoom-in" data-aos-delay="400">
            <img src="https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?w=600&auto=format&fit=crop&q=60" alt="Bali" />
            <p>Bali</p>
          </div>
          <div className="destination-card" data-aos="zoom-in" data-aos-delay="500">
            <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80" alt="London" />
            <p>London</p>
          </div>
          <div className="destination-card" data-aos="zoom-in" data-aos-delay="600">
            <img src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80" alt="Dubai" />
            <p>Dubai</p>
          </div>
        </div>
      </section>

      <footer id="footer" className="footer bg-blue-600" data-aos="fade-up">
        <p className="footer-bottom">© 2025 CasaLiv. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
