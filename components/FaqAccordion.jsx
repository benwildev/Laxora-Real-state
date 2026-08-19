'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    id: "01",
    title: "How do I schedule a private tour?",
    content:
      "You can easily schedule a private VIP viewing by clicking 'Schedule a Private Tour' or contacting our advisory desk directly at +1 (800) 123-4567. We provide private in-person chauffeur-accompanied viewings as well as ultra-high-definition 4K interactive virtual walkthroughs.",
  },
  {
    id: "02",
    title: "What are the payment & financing options?",
    content:
      "We facilitate seamless transactions through institutional escrow services, direct international wire transfers, private banking mortgage syndication, and multi-currency global settlement desks.",
  },
  {
    id: "03",
    title: "Can you assist with international purchases?",
    content:
      "Yes, Luxora Properties maintains cross-border legal, taxation, and title advisory desks in over 23 countries to facilitate smooth global acquisition for international buyers and cross-border investors.",
  },
  {
    id: "04",
    title: "Do you offer property management?",
    content:
      "Yes, our bespoke estate concierge division provides comprehensive luxury asset management, tenant vetting, maintenance, and seasonal estate supervision for high-net-worth property owners.",
  },
  {
    id: "05",
    title: "What is an exclusive off-market listing?",
    content:
      "Off-market properties are ultra-luxury estates sold privately outside public MLS databases to preserve seller confidentiality and buyer discretion. Access is granted exclusively to vetted private clients.",
  },
  {
    id: "06",
    title: "How do you evaluate investment potential?",
    content:
      "Our research group conducts proprietary yield forecasts, neighborhood appreciation analytics, and historical capital growth models to ensure optimum portfolio performance and capital preservation.",
  },
];

export default function FaqAccordion() {
  const [activeId, setActiveId] = useState("01");

  const toggleItem = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="section-container">
        {/* Header Badge */}
        <div className="faq-header-center">
          <div className="section-header-badge">
            <i className="fa-solid fa-circle-question gold-icon"></i>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
        </div>

        {/* Accordion 05 Design Container */}
        <div className="faq-accordion-05-wrapper glass-card">
          <div className="accordion-05-list">
            {FAQ_ITEMS.map((item) => {
              const isOpen = activeId === item.id;
              return (
                <div
                  key={item.id}
                  className={`accordion-05-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="accordion-05-trigger"
                    aria-expanded={isOpen}
                  >
                    <div className="accordion-05-trigger-content">
                      <span className="accordion-05-num">{item.id}</span>
                      <h3 className="accordion-05-title">{item.title}</h3>
                    </div>
                    <span className="accordion-05-icon-pill">
                      <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </button>

                  <div className="accordion-05-body">
                    <div className="accordion-05-content-inner">
                      <p>{item.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
