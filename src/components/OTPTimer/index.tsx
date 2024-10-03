import React, { useState, useEffect } from 'react';

const OTP_TIMER_DURATION = 60; // Duration in seconds

interface OTPTimerProps {
  startTimer: boolean;
  resetTimer: boolean;
  onComplete: () => void;
}

const OTPTimer: React.FC<OTPTimerProps> = ({ startTimer, resetTimer, onComplete }) => {
  const [seconds, setSeconds] = useState<number>(OTP_TIMER_DURATION);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      if (interval) clearInterval(interval);
      onComplete(); // Call the completion function
      setIsActive(false); // Stop the timer
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onComplete]);

  useEffect(() => {
    if (startTimer) {
      setIsActive(true);
    }
    else{
      setIsActive(false);
    }
  }, [startTimer]);

  useEffect(() => {
    if (resetTimer) {
      setSeconds(OTP_TIMER_DURATION);
      setIsActive(false);
    }
  }, [resetTimer]);

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      {isActive && <p>You will receive an OTP in <strong>{formatTime(seconds)}</strong> Seconds.</p>}
      {/* {isActive && <p>Timer is active</p>} */}
    </div>
  );
};

export default OTPTimer;
