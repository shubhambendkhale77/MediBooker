import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Search,
  X,
  User,
  MapPin,
  Award,
  Phone,
} from "lucide-react";
import { useTheme } from "../contex/ThemeContex";

// Fixed doctor profile image
const DEFAULT_DOCTOR_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQy5hKzJhU9O43LwuvhAhNeQQH9qq1XfWSQz_BK3Qrxws0xYZi4pRPfioWMtpIuZi1yU&usqp=CAU"; // Using placeholder image instead of external URL
const doctorsList = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    clinic: "Heart Care Clinic",
    experience: "10 years",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Plaza, Suite 101",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 2,
    name: "Dr. Robert Smith",
    specialization: "Dermatologist",
    clinic: "Skin Health Center",
    experience: "8 years",
    phone: "+1 (555) 234-5678",
    address: "456 Wellness Avenue, Suite 202",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    specialization: "Pediatrician",
    clinic: "Kids Care Clinic",
    experience: "12 years",
    phone: "+1 (555) 345-6789",
    address: "789 Children's Way, Suite 303",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 4,
    name: "Dr. Michael Scott",
    specialization: "Orthopedic Surgeon",
    clinic: "Bone and Joint Center",
    experience: "15 years",
    phone: "+1 (555) 456-7890",
    address: "234 Care Drive, Suite 402",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 5,
    name: "Dr. Angela Martinez",
    specialization: "Neurologist",
    clinic: "NeuroHealth Clinic",
    experience: "9 years",
    phone: "+1 (555) 567-8901",
    address: "345 Brain Way, Suite 501",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 6,
    name: "Dr. David Wilson",
    specialization: "Oncologist",
    clinic: "Cancer Care Center",
    experience: "14 years",
    phone: "+1 (555) 678-9012",
    address: "567 Oncology Blvd, Suite 601",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 7,
    name: "Dr. Elizabeth Lee",
    specialization: "Gynecologist",
    clinic: "Women's Health Center",
    experience: "11 years",
    phone: "+1 (555) 789-0123",
    address: "789 Women Ave, Suite 303",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 8,
    name: "Dr. James Taylor",
    specialization: "Endocrinologist",
    clinic: "Hormone Balance Clinic",
    experience: "13 years",
    phone: "+1 (555) 890-1234",
    address: "123 Endocrine Street, Suite 205",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 9,
    name: "Dr. Amanda Brown",
    specialization: "Ophthalmologist",
    clinic: "Vision Center",
    experience: "10 years",
    phone: "+1 (555) 901-2345",
    address: "321 Eye Lane, Suite 404",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 10,
    name: "Dr. Mark Phillips",
    specialization: "Gastroenterologist",
    clinic: "Digestive Health Center",
    experience: "8 years",
    phone: "+1 (555) 012-3456",
    address: "654 Gastro Ave, Suite 105",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 11,
    name: "Dr. Laura Adams",
    specialization: "Rheumatologist",
    clinic: "Joint Relief Clinic",
    experience: "6 years",
    phone: "+1 (555) 123-4568",
    address: "876 Joint Street, Suite 302",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 12,
    name: "Dr. Steven Carter",
    specialization: "Pulmonologist",
    clinic: "Lung Care Clinic",
    experience: "10 years",
    phone: "+1 (555) 234-5679",
    address: "543 Pulmonary Blvd, Suite 208",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 13,
    name: "Dr. Lisa White",
    specialization: "Hematologist",
    clinic: "Blood Health Center",
    experience: "7 years",
    phone: "+1 (555) 345-6780",
    address: "109 Hematology Lane, Suite 101",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 14,
    name: "Dr. Daniel Harris",
    specialization: "Nephrologist",
    clinic: "Kidney Care Clinic",
    experience: "12 years",
    phone: "+1 (555) 456-7891",
    address: "876 Renal Blvd, Suite 205",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 15,
    name: "Dr. Emily Clark",
    specialization: "Psychiatrist",
    clinic: "Mental Wellness Center",
    experience: "9 years",
    phone: "+1 (555) 567-8902",
    address: "234 Wellness Drive, Suite 307",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 16,
    name: "Dr. John Foster",
    specialization: "ENT Specialist",
    clinic: "Ear, Nose & Throat Clinic",
    experience: "11 years",
    phone: "+1 (555) 678-9013",
    address: "432 ENT Way, Suite 408",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 17,
    name: "Dr. Sophia Young",
    specialization: "Immunologist",
    clinic: "Allergy & Immunology Center",
    experience: "8 years",
    phone: "+1 (555) 789-0124",
    address: "654 Immune Blvd, Suite 206",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 18,
    name: "Dr. Paul Parker",
    specialization: "Urologist",
    clinic: "Urinary Health Clinic",
    experience: "10 years",
    phone: "+1 (555) 890-1235",
    address: "876 Urinary Lane, Suite 502",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 19,
    name: "Dr. Karen Lewis",
    specialization: "Surgeon",
    clinic: "Precision Surgery Center",
    experience: "15 years",
    phone: "+1 (555) 901-2346",
    address: "123 Surgery Way, Suite 703",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 20,
    name: "Dr. Frank Edwards",
    specialization: "Family Physician",
    clinic: "Family Care Clinic",
    experience: "18 years",
    phone: "+1 (555) 012-3457",
    address: "987 Family Blvd, Suite 203",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 21,
    name: "Dr. Olivia Green",
    specialization: "Plastic Surgeon",
    clinic: "Aesthetic Center",
    experience: "12 years",
    phone: "+1 (555) 123-4569",
    address: "456 Aesthetic Ave, Suite 402",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 22,
    name: "Dr. Victor Allen",
    specialization: "Sports Medicine Specialist",
    clinic: "Sports Health Center",
    experience: "14 years",
    phone: "+1 (555) 234-5670",
    address: "789 Sports Drive, Suite 304",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 23,
    name: "Dr. Grace Turner",
    specialization: "Geriatrician",
    clinic: "Elderly Care Center",
    experience: "20 years",
    phone: "+1 (555) 345-6781",
    address: "101 Senior Blvd, Suite 102",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 24,
    name: "Dr. William Carter",
    specialization: "Psychiatrist",
    clinic: "Mental Wellness Clinic",
    experience: "16 years",
    phone: "+1 (555) 456-7892",
    address: "345 Serenity Lane, Suite 505",
    img: DEFAULT_DOCTOR_IMAGE,
  },
];

const DoctorBookingApp = () => {
  const [userName, setUserName] = useState(() => {
    const user = localStorage.getItem("signupData");
    return user ? JSON.parse(user) : [];
  });
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewAppointments, setViewAppointments] = useState(false);

  console.log(userName);
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const bookAppointment = () => {
    if (!date || !time || !selectedDoctor) {
      alert("Please fill all details.");
      return;
    }
    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      clinic: selectedDoctor.clinic,
      date,
      time,
      doctorImg: DEFAULT_DOCTOR_IMAGE,
    };
    setAppointments([...appointments, newAppointment]);
    setShowModal(false);
    setDate("");
    setTime("");
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  const filteredDoctors = doctorsList.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const { theme } = useTheme();
    const isDark = theme === "dark";
  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}"min-h-screen bg-gray-100 py-8"`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-blue-800">MediBook</h1>
            <p className="text-xl text-gray-500">Welcome</p>
            <h2 className="text-2xl font-mono text-red-500">
              {userName.name || "Guest"}
            </h2>
            <p className="text-gray-600">Your health, our priority</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setViewAppointments(false)}
              className={`cursor-pointer px-4 py-2 rounded-full transition-all ${
                !viewAppointments
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Find Doctors
            </button>
            <button
              onClick={() => setViewAppointments(true)}
              className={`cursor-pointer px-4 py-2 rounded-full flex items-center transition-all ${
                viewAppointments
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span>My Appointments</span>
              {appointments.length > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {appointments.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {!viewAppointments ? (
          <>
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name or specialization"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 w-full rounded-xl border-none shadow-md focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Doctor List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={doctor.img}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {doctor.name}
                        </h2>
                        <p className="text-blue-600 font-medium">
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{doctor.clinic}</p>
                          <p className="text-sm">{doctor.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-blue-500" />
                        <p>Experience: {doctor.experience}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-blue-500" />
                        <p>{doctor.phone}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setShowModal(true);
                      }}
                      className="cursor-pointer w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center shadow-md"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">
                  No doctors found
                </h3>
                <p className="text-gray-500">Try a different search term</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                My Appointments
              </h2>
              <p className="text-gray-600">
                Manage your upcoming medical appointments
              </p>
            </div>

            {appointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <img
                          src={appointment.doctorImg || DEFAULT_DOCTOR_IMAGE}
                          alt={appointment.doctor}
                          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-100"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appointment.doctor}
                          </h3>
                          <p className="text-blue-600">
                            {appointment.specialization}
                          </p>
                          {appointment.clinic && (
                            <p className="text-gray-600 text-sm">
                              {appointment.clinic}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => cancelAppointment(appointment.id)}
                        className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full hover:bg-red-200 transition"
                        aria-label="Cancel appointment"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4 space-y-2 bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-5 w-5 mr-2 text-blue-500" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">
                  No appointments scheduled
                </h3>
                <p className="text-gray-500 mb-6">
                  Book your first appointment to get started
                </p>
                <button
                  onClick={() => setViewAppointments(false)}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Find Doctors
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Book Appointment</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white bg-blue-700 hover:bg-blue-800 rounded-full p-1"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6 bg-blue-50 p-4 rounded-lg">
                <img
                  src={selectedDoctor?.img}
                  alt={selectedDoctor?.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white shadow"
                />
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedDoctor?.name}
                  </h3>
                  <p className="text-blue-600">
                    {selectedDoctor?.specialization}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedDoctor?.clinic}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10 w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10 w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={bookAppointment}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorBookingApp;
