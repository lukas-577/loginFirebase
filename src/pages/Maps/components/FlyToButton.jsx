// FlyToButton.js
import React from 'react';

const FlyToButton = ({ onClick }) => {
    return (
        <div className="absolute bottom-20 right-4 z-50">
            <button
                onClick={onClick}
                className="btn btn-success"
            >
                📍 mi ubicación
            </button>
        </div>
    );
};

export default FlyToButton;
