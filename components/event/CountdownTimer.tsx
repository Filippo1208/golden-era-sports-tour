"use client";

import { useEffect, useState } from "react";

import type { TourEvent } from "@/types/content";

type CountdownTimerProps = {
  event: TourEvent;
};

type TimeUnit = {
  label: string;
  value: string;
};

function getEventEndTime(event: TourEvent) {
  const finalDate = event.endDate ?? event.startDate;

  return new Date(`${finalDate}T23:59:59`).getTime();
}

function getUnits(milliseconds: number): TimeUnit[] {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "Days", value: String(days).padStart(2, "0") },
    { label: "Hours", value: String(hours).padStart(2, "0") },
    { label: "Minutes", value: String(minutes).padStart(2, "0") },
    { label: "Seconds", value: String(seconds).padStart(2, "0") },
  ];
}

function LoadingUnits() {
  return (
    <div className="countdown-timer" aria-label="Countdown preparing">
      {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
        <div className="countdown-timer__unit" key={label}>
          <strong>--</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function CountdownTimer({ event }: CountdownTimerProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(Date.now());

    updateNow();
    const timer = window.setInterval(updateNow, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (!event.countdownTarget) {
    return <p className="countdown-state">NEXT STAGE TO BE ANNOUNCED</p>;
  }

  if (now === null) {
    return <LoadingUnits />;
  }

  const targetTime = new Date(event.countdownTarget).getTime();
  const endTime = getEventEndTime(event);

  if (now >= targetTime && now <= endTime) {
    return <p className="countdown-state">EVENT IN PROGRESS</p>;
  }

  if (now > endTime) {
    return <p className="countdown-state">NEXT STAGE TO BE ANNOUNCED</p>;
  }

  const units = getUnits(targetTime - now);

  return (
    <div className="countdown-timer" aria-label={`Countdown to ${event.city}`}>
      {units.map((unit) => (
        <div className="countdown-timer__unit" key={unit.label}>
          <strong>{unit.value}</strong>
          <span>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
