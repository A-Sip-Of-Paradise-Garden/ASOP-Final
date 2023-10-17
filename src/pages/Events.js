import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [];

const EventsPage = () => {
  const [selectedStartTime, setSelectedStartTime] = useState('12:00');
  const [selectedEndTime, setSelectedEndTime] = useState('12:00');

  const [allEvents, setAllEvents] = useState(events);
  const [formVisible, setFormVisible] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    capacity: 0,
    startDate: "",
    endDate: "",
    startTime: selectedStartTime,
    endTime: selectedEndTime,
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate || !newEvent.startTime || !newEvent.endTime) {
      return;
    } else {
      const adjustedEndDate = addDays(newEvent.endDate, 1);
      setAllEvents([...allEvents, { ...newEvent, endDate: adjustedEndDate }]);
      clearEventData();
    }
  }

  const handleCancel = () => {
    clearEventData();
    setFormVisible(false);
  }

  const clearEventData = () => {
    setNewEvent({
      title: "",
      description: "",
      capacity: 0,
      startDate: "",
      endDate: "",
      startTime: "12:00",
      endTime: "12:00"
    });
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hh = parseInt(hours, 10);
    const mm = parseInt(minutes, 10);

    let ampm = 'AM';
    if (hh >= 12) {
      ampm = 'PM';
    }

    const formattedHours = hh % 12 || 12;
    return `${formattedHours}:${mm < 10 ? '0' : ''}${mm} ${ampm}`;
  };

  return (
    <div className="events-calendar-page">
      <div className="title-calendar">
        <h1 className="calendar-title">Events</h1>
      </div>
      <div className="title-and-inputs">
        <div className="title-and-button">
          {!formVisible && (
            <button className="add-event-button" onClick={() => setFormVisible(true)}>Add Event</button>
          )}
        </div>
        {formVisible && (
          <div className="create-new-event">
            <div>
              <input
                className="add-event-input"
                type="text"
                placeholder="Add event title..."
                value={newEvent.title}
                onChange={(e) => setNewEvent({
                  ...newEvent,
                  title: e.target.value
                })}
              />
            </div>
            <div>
              <input
                className="add-event-description"
                type="text"
                placeholder="Add event description..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({
                  ...newEvent,
                  description: e.target.value 
                })}
              />
            </div>
            <div className="start-div">
              <DatePicker
                className="add-event-startdate"
                placeholderText="Start date..."
                selected={newEvent.startDate}
                onChange={(startDate) => setNewEvent({
                  ...newEvent,
                  startDate: startDate
                })}
              />
              <TimePicker
                className="add-event-starttime"
                value={selectedStartTime}
                onChange={(startTime) => {
                  setSelectedStartTime(startTime);
                  setNewEvent({
                    ...newEvent,
                    startTime: startTime,
                  });
                }}
              />
            </div>
            <div className="end-div">
              <DatePicker
                className="add-event-enddate"
                placeholderText="End date..."
                selected={newEvent.endDate}
                onChange={(endDate) => setNewEvent({
                  ...newEvent,
                  endDate: endDate
                })}
              />
              <TimePicker
                className="add-event-endtime"
                value={selectedEndTime}
                onChange={(endTime) => {
                  setSelectedEndTime(endTime);
                  setNewEvent({
                    ...newEvent,
                    endTime: endTime,
                  });
                }}
              />
            </div>
            <div className="event-buttons">
              <button className="add-button" onClick={handleAddEvent}>Add</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: 600, margin: "15px" }}
        views={["month", "agenda"]}
        eventPropGetter={() => {
          return {
            style: {
              backgroundColor: "#38d49c",
              color: "black"
            },
          };
        }}
        components={{
          event: ({ event }) => {
            const handleDeleteEvent = () => {
              const updatedEvents = allEvents.filter((e) => e !== event);
              setAllEvents(updatedEvents);
            }
            return (
              <div className="calender-event-returns">
                {/* <div onClick={() => handleEventClick(event)}><span style={{ fontWeight: 'bold' }}>{event.title}</span></div> */}
                <Popup contentStyle={{ width: '40%' }} trigger={<button><span style={{ fontWeight: 'bold' }}>{event.title}</span></button>}>
                  <div><span style={{ fontWeight: 'bold' }}>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span></div>
                  <div>{event.description}</div>
                  <button className="events-delete-button" onClick={handleDeleteEvent}>Delete</button>
                </Popup>
                <div>{event.description}</div>
                {/* <div>{formatTime(event.startTime)} - {formatTime(event.endTime)}</div> */}
                <button className="events-delete-button" onClick={handleDeleteEvent}>Delete</button>
              </div>
            );
          },
          agenda: {
            time: ({ event }) => {
              return (
                <div>{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
              );
            },
          },
        }}
      />
    </div>
  );
}

export default EventsPage;
