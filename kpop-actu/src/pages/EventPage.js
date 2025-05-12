import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
dayjs.locale("fr");

const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // de 8h à 19h

function WeeklyCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  const startOfWeek = currentDate.startOf("isoWeek"); // lundi
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  const handleAddEvent = (dayIndex, hour) => {
    const title = prompt("Titre de l'événement :");
    if (title) {
      setEvents([...events, { title, day: dayIndex, hour }]);
    }
  };

  const goToToday = () => {
    setCurrentDate(dayjs());
  };

  const goToPreviousWeek = () => {
    setCurrentDate(prev => prev.subtract(1, "week"));
  };

  const goToNextWeek = () => {
    setCurrentDate(prev => prev.add(1, "week"));
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button onClick={goToPreviousWeek} className="px-4 py-2 border rounded">◀ Semaine prècedente</button>
          <button onClick={goToToday} className="px-4 py-2 border rounded">Aujourd'hui</button>
          <button onClick={goToNextWeek} className="px-4 py-2 border rounded">Semaine suivante ▶</button>
        </div>
        <h2 className="text-xl font-semibold">
          Semaine du {startOfWeek.format("DD MMMM YYYY")}
        </h2>
      </div>

      {/* En-tête des jours */}
      <div className="grid grid-cols-7 border-b font-semibold text-center">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="border p-2 bg-gray-100">
            {day.format("dddd DD/MM")}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 divide-x border h-[720px] bg-white">
        {daysOfWeek.map((_, dayIndex) => (
          <div key={dayIndex} className="flex flex-col border-r">
            {hours.map((hour, hourIndex) => (
              <div
                key={hourIndex}
                className="h-[60px] border-b relative hover:bg-blue-50 cursor-pointer"
                onClick={() => handleAddEvent(dayIndex, hour)}
              >
                {events
                  .filter((e) => e.day === dayIndex && e.hour === hour)
                  .map((event, i) => (
                    <div
                      key={i}
                      className="absolute left-1 right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow"
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyCalendar;
