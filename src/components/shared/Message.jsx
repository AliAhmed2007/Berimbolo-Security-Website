import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Message = ({ message, state }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const handleDismiss = () => {
        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    const getMessageStyle = () => {
        switch (state) {
            case "error":
                return "bg-danger text-light";
            case "success":
                return "bg-success text-light";
            case "info":
                return "bg-info text-light";
            default:
                return "bg-secondary text-light";
        }
    };

    return (
        <div
            className={`position-fixed m-3 p-3 rounded shadow-lg ${getMessageStyle()}`}
            style={{
                top: "150px",
                right: "20px",
                zIndex: 1050,
                cursor: "pointer",
                transition: "transform 5s ease-in-out, opacity 5s ease-in-out",
                transform: visible ? "translateX(0)" : "translateX(100%)",
                opacity: visible ? 1 : 0,
            }}
            onClick={handleDismiss}
        >
            {message} <i className="bi bi-x text-white ms-auto"></i>
        </div>
    );

};

Message.propTypes = {
    message: PropTypes.string.isRequired,
    state: PropTypes.oneOf(["error", "success", "info"]).isRequired,
};

export default Message;
