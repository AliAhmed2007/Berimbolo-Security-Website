import PropTypes from 'prop-types';

function FAQAccordian({question, answer, id}) {

  return (
    <div className="accordion-item my-1 border-0">
    <h2 className="accordion-header">
      <button className="accordion-button fs-5" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="true" aria-controls="collapseOne">
        {question}
      </button>
    </h2>
    <div id={id} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div className="accordion-body">
        {answer}
      </div>
    </div>
  </div>
  )
}

FAQAccordian.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default FAQAccordian