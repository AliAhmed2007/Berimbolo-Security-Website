import { useEffect, useState } from 'react';

function GoUpBtn() {
  // State to control the visibility of the button
  const [visible, setVisible] = useState(false);

  // Detect when the user has scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={buttonStyles}
        aria-label="Scroll to top"
      >
        <i className='bi bi-arrow-up fs-5'></i>
      </button>
    )
  );
}

const buttonStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  padding: '10px 15px',
  fontSize: '18px',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s',
};

export default GoUpBtn;
