import React, { useEffect } from 'react';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      once: true,     // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-up">
        <div className="hero-text">
          <h1>BOOK YOUR AIR TICKET EASY & FAST</h1>
          <p>Stop searching. Start traveling. The airline that's different and better.</p>
          <div className="hero-buttons">
            <Link to={'/searchflights'}>
              <button className="btn-primary">Book Now</button>
            </Link>
            <button className="btn-secondary">Explore More</button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="features">
        <div className="feature" data-aos="fade-left">
          <h3>Fast & Easy Booking</h3>
          <p>Search for a flight, pick the seats, complete the payment. It's that easy!</p>
        </div>
        <div className="feature" data-aos="fade-right">
          <h3>Any Time, Anywhere</h3>
          <p>Taking you to destinations all around the globe, every day. Where are you going?</p>
        </div>
        <div className="feature" data-aos="fade-left">
          <h3>24/7 Support</h3>
          <p>We're here for you around the clock. More than just flying!</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-us" data-aos="fade-up">
        <h2>We Are JetSetGo Airways</h2>
        <p>
          JetSetGo Airways is one of the fastest-growing airlines in the world. We began flying in 2024 
          and have grown to more than 150 destinations across the globe. We pride ourselves on 
          offering top-notch services for an unparalleled flying experience.
        </p>
        <button className="btn-primary">Discover More</button>
      </section>

      {/* Upcoming Flights Section */}
      <section className="upcoming-flights" data-aos="fade-up">
        <h2>Upcoming Flights</h2>
        <div className="flight-cards">
          <div className="flight-card">
            <img src="flightsima.jpeg" alt="Flight" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" data-aos="fade-up">
        <h2>Our Happy Passengers</h2>
        <p>Are you a registered customer? We are happy to hear your feedback. Add your review below.</p>
      </section>
    </div>
  );
}

export default HomePage;
