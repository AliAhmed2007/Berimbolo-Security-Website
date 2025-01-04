import FAQAccordian from "./FAQAccordianItem"
import FaqsSections from "../../utils/FAQs";
import { useState } from "react";
function FAQ() {
  const [currentFaqSection, setCurrentFaqSection] = useState('aboutCompany')

  function getSiblings(element) {
    const parent = element.parentElement; // Get the parent element
    if (!parent) return []; // If there's no parent, return an empty array

    // Filter out the element itself from the parent's children
    return Array.from(parent.children).filter(child => child !== element);
  }

  function handleCurrentFaq(event, faqSection) {
    const siblings = getSiblings(event.currentTarget)
    siblings.forEach(sibling => {
      sibling.classList.replace('btn-dark', 'btn-warning')
    })
    setCurrentFaqSection(faqSection)
    event.currentTarget.classList.replace('btn-warning', 'btn-dark')
  }
  const FAQs = FaqsSections[currentFaqSection]
  return (
    <>
      <div className="faq-header text-center">
        <h1>Frequently Asked Questions (FAQ)</h1>
        <p >Find Your Quieries Here</p>
        <div className="faqs-options my-4 d-flex flex-wrap justify-content-center align-items-center gap-4">
          <button className="btn btn-dark fs-5" onClick={(e) => handleCurrentFaq(e, 'aboutCompany')}>About Company</button>
          <button className="btn btn-warning fs-5" onClick={(e) => handleCurrentFaq(e, 'ourProducts')}>Our Products</button>
          <button className="btn btn-warning fs-5" onClick={(e) => handleCurrentFaq(e, 'servicesAndPackages')}>Services & Packages</button>
          <button className="btn btn-warning fs-5" onClick={(e) => handleCurrentFaq(e, 'more')}>More</button>
        </div>
      </div>
      <div className="faq-body accordion" id="faqAccordion">
        {FAQs.map((faq) => {
          return <FAQAccordian key={faq.id} {...faq} />
        })}
      </div>
    </>
  )
}

export default FAQ