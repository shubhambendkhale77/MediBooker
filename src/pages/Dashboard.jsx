import React, { useState, useEffect } from "react";
import { useTheme } from "../contex/ThemeContex";

import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay,
  addMonths,
  subMonths,
  isSameDay,
  isToday
} from "date-fns";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    specialization: "",
    time: "",
    date: "",
    notes: ""
  });

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  const saveAppointments = (updatedAppointments) => {
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleAddAppointment = () => {
    if (selectedDate) {
      setNewAppointment({
        ...newAppointment,
        date: selectedDate
      });
      setIsAddingAppointment(true);
    }
  };

  const handleSaveAppointment = () => {
    if (newAppointment.doctor && newAppointment.time) {
      const updatedAppointments = [...appointments, newAppointment];
      saveAppointments(updatedAppointments);
      setIsAddingAppointment(false);
      setNewAppointment({
        doctor: "",
        specialization: "",
        time: "",
        date: "",
        notes: ""
      });
    }
  };

  const handleDeleteAppointment = (appointmentToDelete) => {
    const updatedAppointments = appointments.filter(
      appointment => 
        appointment.date !== appointmentToDelete.date || 
        appointment.doctor !== appointmentToDelete.doctor || 
        appointment.time !== appointmentToDelete.time
    );
    saveAppointments(updatedAppointments);
  };

    const { theme } = useTheme();
    const isDark = theme === "dark";
  
  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}"p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen`}>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Medical Appointments</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrevMonth} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-700 w-48 text-center">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button 
              onClick={handleNextMonth} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-semibold p-2 text-center text-gray-600">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array(getDay(startOfMonth(currentMonth)))
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className="border border-gray-100 rounded-lg bg-gray-50 h-24"></div>
            ))}
          
          {daysInMonth.map((day) => {
            const formattedDate = format(day, "yyyy-MM-dd");
            const dayAppointments = appointments.filter(
              (appointment) => appointment.date === formattedDate
            );
            const isSelected = selectedDate === formattedDate;
            const dayIsToday = isToday(day);

            return (
              <div
                key={formattedDate}
                className={`border rounded-lg p-2 h-24 cursor-pointer transition-all ${
                  isSelected 
                    ? "ring-2 ring-blue-500 border-blue-500" 
                    : "hover:border-blue-300"
                } ${
                  dayIsToday 
                    ? "bg-blue-50" 
                    : "bg-white"
                }`}
                onClick={() => setSelectedDate(formattedDate)}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className={`text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center ${
                    dayIsToday 
                      ? "bg-blue-500 text-white" 
                      : "text-gray-700"
                  }`}>
                    {format(day, "d")}
                  </p>
                  {dayAppointments.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {dayAppointments.length}
                    </span>
                  )}
                </div>
                <div className="overflow-y-auto max-h-12">
                  {dayAppointments.slice(0, 2).map((appointment, index) => (
                    <p 
                      key={index} 
                      className="text-xs truncate mb-1 py-1 px-2 bg-blue-50 text-blue-700 rounded"
                    >
                      {appointment.time} - {appointment.doctor}
                    </p>
                  ))}
                  {dayAppointments.length > 2 && (
                    <p className="text-xs text-gray-500">+{dayAppointments.length - 2} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && !isAddingAppointment && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Appointments: {format(new Date(selectedDate), "MMMM d, yyyy")}
            </h2>
            <div className="flex space-x-2">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                onClick={handleAddAppointment}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Appointment
              </button>
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                onClick={() => setSelectedDate(null)}
              >
                Close
              </button>
            </div>
          </div>

          {appointments.filter((appointment) => appointment.date === selectedDate).length === 0 ? (
            <p className="text-gray-500 text-center py-6">No appointments scheduled for this day.</p>
          ) : (
            <div className="divide-y">
              {appointments
                .filter((appointment) => appointment.date === selectedDate)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment, index) => (
                  <div key={index} className="py-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="font-medium text-blue-600">{appointment.time}</span>
                      </div>
                      <div className="ml-6">
                        <h3 className="font-semibold text-gray-800">{appointment.doctor}</h3>
                        {appointment.specialization && (
                          <p className="text-sm text-gray-600">{appointment.specialization}</p>
                        )}
                        {appointment.notes && (
                          <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteAppointment(appointment)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {isAddingAppointment && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            New Appointment: {format(new Date(selectedDate), "MMMM d, yyyy")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name*
              </label>
              <input
                type="text"
                id="doctor"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newAppointment.specialization}
                onChange={(e) => setNewAppointment({...newAppointment, specialization: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time*
              </label>
              <input
                type="time"
                id="time"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={() => setIsAddingAppointment(false)}
            >
              Cancel
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={handleSaveAppointment}
              disabled={!newAppointment.doctor || !newAppointment.time}
            >
              Save Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;