import React, { useState, useEffect } from "react";

export default function Countdown() {
    const targetDate = new Date("2023-09-20T00:00:00Z");

    const calculateTimeRemaining = () => {
        const currentTime = new Date();
        const timeRemaining = targetDate.getTime() - currentTime.getTime();

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const formatTimeUnit = (unit: number, label: string) => {
        return `${unit} ${label}${unit !== 1 ? '' : ''}`;
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <button className="btnMain4">
                {formatTimeUnit(timeRemaining.days, 'Jours')}, {formatTimeUnit(timeRemaining.hours, 'heures')}, {formatTimeUnit(timeRemaining.minutes, 'minutes')}, {formatTimeUnit(timeRemaining.seconds, 'secondes')}
            </button>
        </div>
    );
}
