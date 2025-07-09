import React from "react";
import "../styles/AboutSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AboutSection = () => {
  const testimonials = [
    {
      content:
        "The files and notebooks draw a lot of attention in our workshops. I find them very innovative and they have come up with some very unusual gift items.",
      name: "Aruna Gopakumar",
      title: "Director, Navgati",
    },
    {
      content:
        "We strongly recommend the team at The Giving Tree as a gifting partner for every individual and corporate outfit. This testimonial is our way of showing thanks for all the wonderful service and value delivered.",
      name: "Gita Ramanan",
      title: "COO, Design Café",
    },
    {
      content:
        "Our clients’ eyes filled up with joy when they read the calendars made by The Giving Tree. Thank you for helping me make my clients feel super special.",
      name: "Rajiv Talreja",
      title: "MD, Quantum Leap Learning Solutions",
    },
    {
      content:
        "Mala and the team at The Giving Tree not only have great products they are very professional. They have never missed their timeline till date and always deliver the goods well within timelines.",
      name: "Hemanth Nagaraj",
      title: "FirstHive",
    },
    {
      content:
        "The Giving Tree team is really 'giving' like kalpavriksha. Each of the gifts I have given had a very strong emotional connect.",
      name: "Chetan Patil",
      title: "Rakya Tech",
    },
    {
      content:
        "It has been a delight working with The Giving Tree. The products are good in terms of quality and price. We are very happy with the super service.",
      name: "Maninder Paul",
      title: "Itilite Technologies",
    },
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <h3 className="about-title">About Us</h3>

        <video autoPlay muted loop playsInline className="about-video">
          <source src="/assets/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="about-text">
          At <strong>[MF GLOBAL SERVICES]</strong>, we believe that the right
          gift can do more than just impress — it can build relationships,
          strengthen partnerships, and express appreciation in the most
          meaningful way.
        </p>
        <p className="about-text">
          Specializing in <strong>curated corporate gifts</strong>, we help
          companies celebrate milestones, welcome clients, and show appreciation
          through thoughtful and elegant gifting. Our collection includes luxury
          hampers, branded merchandise, eco-friendly sets, and tech-focused
          packages — all customizable to reflect your brand and message.
        </p>
        <p className="about-text">
          With premium quality, end-to-end order management, and global
          shipping, we make corporate gifting simple, smart, and stress-free.
        </p>

        <div className="about-features">
          <div className="feature-card">
            <h3>Tailored Gifting Solutions</h3>
            <p>Customized gifts that align with your brand and occasion.</p>
          </div>
          <div className="feature-card">
            <h3>Premium Quality & Packaging</h3>
            <p>Elegant presentation that reflects your business standards.</p>
          </div>
          <div className="feature-card">
            <h3>Bulk Orders & Global Shipping</h3>
            <p>Timely delivery to teams and clients around the world.</p>
          </div>
          <div className="feature-card">
            <h3>Dedicated Support</h3>
            <p>A team that’s here to make your gifting experience seamless.</p>
          </div>
        </div>
        {/* ----------------------- */}
        <div className="testimonial-section">
          <h3 className="woodmart-title-container">Our Clients Exprience</h3>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-slide">
                  <div className="stars">★★★★★</div>
                  <p className="testimonial-text">"{testimonial.content}"</p>
                  <footer className="testimonial-footer">
                    <strong>{testimonial.name}</strong> –{" "}
                    <span>{testimonial.title}</span>
                  </footer>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
