import React from 'react';
import './keaOfferModal.css';

function KeaOfferModal({
    onAccept,
    onDecline,
}) {
    return (
        <div className="kea-offer-overlay">
            <div className="kea-offer-modal">
                <h2 id="kea-offer-title">
                    Let Kea roll your die this turn?
                </h2>

                <div className="kea-offer-buttons">
                    <button onClick={onAccept}>
                        Accept
                    </button>
                    <button onClick={onDecline}>
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}

export default KeaOfferModal;