import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
dayjs.locale("fr");

function EventPage() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState("week");

  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("calendarEvents");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const goToToday = () => setCurrentDate(dayjs());
  const goToPrevious = () => {
    setCurrentDate(prev =>
      view === "month" ? prev.subtract(1, "month") : prev.subtract(1, "week")
    );
  };
  const goToNext = () => {
    setCurrentDate(prev =>
      view === "month" ? prev.add(1, "month") : prev.add(1, "week")
    );
  };

  const addEvent = (date) => {
    const title = prompt("Titre de l'événement :");
    if (title) {
      setEvents([...events, { title, date }]);
    }
  };

  const handleEventClick = (eventToEdit) => {
    const action = prompt(
      `Modifier l'événement :\n- Laisser vide pour supprimer\n- Ou entrer un nouveau titre`,
      eventToEdit.title
    );
    if (action === null) return;

    if (action === "") {
      setEvents(events.filter(ev => !(ev.title === eventToEdit.title && dayjs(ev.date).isSame(eventToEdit.date))));
    } else {
      setEvents(events.map(ev =>
        ev.title === eventToEdit.title && dayjs(ev.date).isSame(eventToEdit.date)
          ? { ...ev, title: action }
          : ev
      ));
    }
  };

  const renderWeekView = () => {
    const startOfWeek = currentDate.startOf("isoWeek");
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, "day")
    );

    return (
      <>
        <div className="grid grid-cols-7 border-b font-semibold text-center">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className="border p-2 bg-gray-100">
              {day.format("dddd DD/MM")}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 divide-x border bg-white">
          {daysOfWeek.map((date, dayIndex) => (
            <div
              key={dayIndex}
              className="border-r p-2 min-h-[120px] hover:bg-blue-50 cursor-pointer"
              onClick={() => addEvent(date)}
            >
              <div className="font-bold text-sm">{date.format("DD/MM")}</div>
              {events
                .filter(e => dayjs(e.date).isSame(date, "day"))
                .map((e, i) => (
                  <div
                    key={i}
                    className="mt-1 text-xs bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                    onClick={(eClick) => {
                      eClick.stopPropagation();
                      handleEventClick(e);
                    }}
                  >
                    {e.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderMonthView = () => {
    const startOfMonth = currentDate.startOf("month");
    const startDate = startOfMonth.startOf("isoWeek");
    const days = Array.from({ length: 42 }, (_, i) => startDate.add(i, "day"));

    return (
      <>
        <div className="grid grid-cols-7 border-b font-semibold text-center">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className="border p-2 bg-gray-100">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 divide-x border bg-white">
          {days.map((date, idx) => {
            const isCurrentMonth = date.month() === currentDate.month();
            return (
              <div
                key={idx}
                className={`border-r p-2 min-h-[120px] hover:bg-blue-50 cursor-pointer ${
                  !isCurrentMonth ? "bg-gray-100 text-gray-400" : ""
                }`}
                onClick={() => addEvent(date)}
              >
                <div className="font-bold text-sm">{date.format("D")}</div>
                {events
                  .filter(e => dayjs(e.date).isSame(date, "day"))
                  .map((e, i) => (
                    <div
                      key={i}
                      className="mt-1 text-xs bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                      onClick={(eClick) => {
                        eClick.stopPropagation();
                        handleEventClick(e);
                      }}
                    >
                      {e.title}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      {/* Barre d’en-tête */}
      <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-md rounded-lg">
        <button onClick={goToPrevious} className="px-4 py-2 border rounded-full">◀</button>
        <button onClick={goToToday} className="px-4 py-2 border rounded-full">Aujourd'hui</button>
        <button onClick={goToNext} className="px-4 py-2 border rounded-full">▶</button>
        <h2 className="text-lg font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="px-4 py-2 border rounded-full"
        >
          <option value="week">Semaine</option>
          <option value="month">Mois</option>
        </select>
      </div>

      {/* Affichage selon la vue */}
      {view === "week" ? renderWeekView() : renderMonthView()}
    </div>
  );
}

export default EventPage;
