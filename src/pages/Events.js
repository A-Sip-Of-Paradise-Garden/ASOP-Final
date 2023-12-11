import React, { useState, useEffect } from 'react';
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
import { db } from "../config/firebase";
import { doc, getDocs, addDoc, deleteDoc, updateDoc, collection } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";


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
const { userProfile } = UserAuth();
const [newEvent, setNewEvent] = useState({
  title: "",
  description: "",
  capacity: 0,
  maxCapacity: 0,
  startDate: "",
  endDate: "",
  startTime: selectedStartTime,
  endTime: selectedEndTime,
  reservedUsers: [],
});
const [rsvpState, setRSVPState] = useState({});


const eventCollectionRef = collection(db, "events");
const isAdminUser = userProfile && userProfile.isAdmin;


 useEffect(() => {
   if (userProfile && userProfile.email) {
     getEventList();
     const storedRSVPState = JSON.parse(localStorage.getItem(`rsvpState_${userProfile.email}`)) || {};
     setRSVPState(storedRSVPState);
   }
 }, [userProfile]);


   // Clear RSVP state when the user logs out
 useEffect(() => {
   return () => {
     setRSVPState({});
   };
 }, []);


const sendEmail = async (eventDetails) => {
  try {
    const response = await fetch('https://www.asop.site/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventDetails }),
    });

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error(error);
  }
};



const getEventList = async () => {
  try {
    const data = await getDocs(eventCollectionRef);
    const filteredData = data.docs.map((doc) => {
      const firestoreData = doc.data();
      const startDate = firestoreData.startDate.toDate();
      const endDate = firestoreData.endDate.toDate();


      return {
        ...firestoreData,
        id: doc.id,
        startDate,
        endDate,
      };
    });
    setAllEvents(filteredData);


  } catch (err) {
    console.error(err);
  }
};


const handleAddEvent = async () => {
  if (!newEvent.title || !newEvent.startDate || !newEvent.endDate || !newEvent.startTime || !newEvent.endTime || !newEvent.maxCapacity) {
    alert("Please fill out all required fields!")
    return;
  } else {
    try {
      const startDateTimestamp = newEvent.startDate;
      const endDateTimestamp = newEvent.endDate;
      const newEventDocRef = await addDoc(eventCollectionRef, {
        title: newEvent.title,
        startDate: startDateTimestamp,
        endDate: endDateTimestamp,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        description: newEvent.description,
        capacity: newEvent.capacity,
        maxCapacity: newEvent.maxCapacity,
        reservedUsers: newEvent.reservedUsers,
      });

      console.log('added event')
      const adjustedEndDate = addDays(newEvent.endDate, 1);
      setAllEvents([...allEvents, { ...newEvent, endDate: adjustedEndDate }]);
      clearEventData();

      const eventDetails = {
        title: newEvent.title,
        description: newEvent.description,
      };

      sendEmail(eventDetails);
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  }
};



const handleCancel = () => {
  clearEventData();
  setFormVisible(false);
}


const clearEventData = () => {
  setNewEvent({
    title: "",
    description: "",
    capacity: 0,
    maxCapacity: 0,
    startDate: "",
    endDate: "",
    startTime: "12:00",
    endTime: "12:00",
    reservedUsers: [],
  });
}


const handleRSVP = async (event) => {
  try {
    if (event.capacity < event.maxCapacity) {
      const eventDocRef = doc(db, "events", event.id);


      await updateDoc(eventDocRef, {
        capacity: event.capacity + 1,
        reservedUsers: [...event.reservedUsers, userProfile.name]
      });


      const updatedEvents = allEvents.map((e) =>
        e.id === event.id ? { ...e, capacity: e.capacity + 1, reservedUsers: [...e.reservedUsers, userProfile.name] } : e
      );
      setAllEvents(updatedEvents);


      setRSVPState((prevState) => ({
        ...prevState,
        [event.id]: true,
      }));


      persistRSVPState(event.id, true);


    } else {
      console.warn("Event is already at maximum capacity.");
    }
  } catch (err) {
    console.error(err);
  }
};


const handleCancelRSVP = async (event) => {
 try {
   const eventDocRef = doc(db, "events", event.id);


   const userIndex = event.reservedUsers.indexOf(userProfile.name);


   if (userIndex !== -1) {
     event.reservedUsers.splice(userIndex, 1);


     await updateDoc(eventDocRef, {
       capacity: event.capacity - 1,
       reservedUsers: [...event.reservedUsers],
     });


     const updatedEvents = allEvents.map((e) =>
       e.id === event.id
         ? { ...e, capacity: e.capacity - 1, reservedUsers: [...event.reservedUsers] }
         : e
     );


     setAllEvents(updatedEvents);


     setRSVPState((prevState) => ({
       ...prevState,
       [event.id]: false,
     }));
   }

   persistRSVPState(event.id, false);

 } catch (err) {
   console.error(err);
 }
};


 const persistRSVPState = (eventId, isReserved) => {
   if (userProfile && userProfile.email) {
     const storedRSVPState = JSON.parse(localStorage.getItem(`rsvpState_${userProfile.email}`)) || {};
     localStorage.setItem(`rsvpState_${userProfile.email}`, JSON.stringify({ ...storedRSVPState, [eventId]: isReserved }));
   }
 };


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
      <h1 className="text-5xl font-bold mb-4">Events</h1>
      {!userProfile && (
       <div className="nonmember-message">Please Login or Signup to see Events</div>
      )}
    <div className="title-and-inputs">
      <div className="title-and-button">
        {!formVisible && isAdminUser && (
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
          <div>
            <input
              className="event-capacity"
              type="number"
              placeholder="Add event capacity..."
              value={newEvent.maxCapacity || ''}
              onChange={(e) => setNewEvent({
                ...newEvent,
                maxCapacity: e.target.value
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
          const handleDeleteEvent = async () => {
            try {
              const eventDoc = doc(db, "events", event.id);
              await deleteDoc(eventDoc);
              const updatedEvents = allEvents.filter((e) => event.id !== e.id);
              setAllEvents(updatedEvents);
            } catch (err) {
              console.error(err);
            }
          }
          return (
            <div className="calender-event-returns">
              <Popup contentStyle={{ width: '40%', whiteSpace: 'pre-line', overflowWrap: 'break-word' }} trigger={<button><span style={{ fontWeight: 'bold' }}>{event.title}</span></button>}>
                <div><span style={{ fontWeight: 'bold' }}>Event Time: </span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                <div><span style={{ fontWeight: 'bold' }}>Seats Available: </span>{event.maxCapacity - event.capacity}</div>
                <div><span style={{ fontWeight: 'bold' }}>Description: </span>{event.description}</div>
                {isAdminUser && (
                   <div>
                     <span style={{ fontWeight: 'bold' }}>Reserved Users:</span>
                     {event.reservedUsers ? (
                       <ul>
                         {event.reservedUsers.map((user, index) => (
                           <li key={index}>{user}</li>
                         ))}
                       </ul>
                     ) : (
                       <p>No users have reserved this event.</p>
                     )}
                   </div>
                )}
                {(
                  rsvpState[event.id] ? (
                    <button
                      className="events-cancelrsvp-button"
                      onClick={() => handleCancelRSVP(event)}
                    >
                      Unreserve
                    </button>
                  ) : (
                    <button
                      className="events-rsvp-button"
                      onClick={() => handleRSVP(event)}
                    >
                      Reserve
                    </button>
                  )
                )}
                {isAdminUser && (
                  <button className="events-delete-button" onClick={handleDeleteEvent}>
                    Delete
                  </button>
                )}
              </Popup>
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
