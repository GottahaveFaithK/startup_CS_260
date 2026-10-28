import { useCallback, useEffect, useRef, useState } from 'react';
import {
    getDialogue,
    selectDialogueTrigger
} from '../../opponents/dialogue/getDialogue';

export default function useOpponentDialogue(opponentDialogue) {
    const [currentDialogue, setCurrentDialogue] = useState('');
    const [avatarAnimation, setAvatarAnimation] = useState('idle');
    const [blinkRequested, setBlinkRequested] = useState(false);

    const animationReturnTimer = useRef(null);
    const currentDialogueRef = useRef(currentDialogue);

    useEffect(() => {
        currentDialogueRef.current = currentDialogue;
    }, [currentDialogue]);

    const triggerDialogue = useCallback((trigger) => {
        const line = getDialogue(
            opponentDialogue,
            trigger,
            currentDialogueRef.current
        );

        if (line === null) return;

        clearTimeout(animationReturnTimer.current);

        setCurrentDialogue(line);
        setBlinkRequested(false);
        setAvatarAnimation(
            opponentDialogue[trigger]?.animation ?? 'talk'
        );
    }, [opponentDialogue]);

    const triggerPriorityDialogue = useCallback((events) => {
        const selectedTrigger = selectDialogueTrigger(events);

        if (selectedTrigger !== null) {
            triggerDialogue(selectedTrigger);
        }
    }, [triggerDialogue]);

    useEffect(() => {
        if (avatarAnimation !== 'idle') return;

        const delay = 8000 + Math.random() * 4000;

        const timer = setTimeout(() => {
            setBlinkRequested(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [avatarAnimation]);

    const handleDialogueAnimationComplete = useCallback(() => {
        clearTimeout(animationReturnTimer.current);

        animationReturnTimer.current = setTimeout(() => {
            setAvatarAnimation('idle');
            animationReturnTimer.current = null;
        }, 250);
    }, []);

    useEffect(() => {
        return () => clearTimeout(animationReturnTimer.current);
    }, []);

    return {
        currentDialogue,
        avatarAnimation,
        blinkRequested,
        setBlinkRequested,
        setAvatarAnimation,
        triggerDialogue,
        triggerPriorityDialogue,
        handleDialogueAnimationComplete
    };
}