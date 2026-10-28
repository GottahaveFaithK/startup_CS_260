import { useState } from 'react';

export default function useKeaEvent() {
    const [showKeaDiceOffer, setShowKeaDiceOffer] = useState(false);
    const [keaOfferPending, setKeaOfferPending] = useState(false);
    const [keaRollAccepted, setKeaRollAccepted] = useState(false);

    function rollKeaDie() {
        const roll = Math.random() * 100;

        if (roll < 12) return 1;
        if (roll < 26) return 2;
        if (roll < 42) return 3;
        if (roll < 60) return 4;
        if (roll < 80) return 5;

        return 6;
    }

    return {
        showKeaDiceOffer,
        setShowKeaDiceOffer,
        keaOfferPending,
        setKeaOfferPending,
        keaRollAccepted,
        setKeaRollAccepted,
        rollKeaDie,
        shouldTriggerKeaEvent
    };

    function shouldTriggerKeaEvent(opponentId) {
        return opponentId === 'kea' && Math.random() < 1 / 100;
    }
}