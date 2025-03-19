import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contex/ThemeContex";

import {
  Calendar,
  Clock,
  MapPin,
  PhoneCall,
  Mail,
  Search,
  User,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import image from "../assets/image.png";
import Footer from "./Footer";
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  const specialties = [
    "General Practice",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ];

  const doctors = [
    {
      id: 1,
      name: "Adithyan.A.S",
      specialty: "Cardiology",
      rating: 4.9,
      availableToday: true,
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQGZDemP3SEEZQ/profile-displayphoto-shrink_400_400/B56ZSYoR.5HoAk-/0/1737727484513?e=1747872000&v=beta&t=44EnBtxRT5n2_Xor0h620VeQcR7yfhUoyMOF0W8PxDA",
    },
    {
      id: 2,
      name: "Dr. Shivateja Keerthi",
      specialty: "Pediatrics",
      rating: 4.8,
      availableToday: true,
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQH3qz1XKeKG4Q/profile-displayphoto-shrink_400_400/B56ZUP8EG_HsAs-/0/1739729159008?e=1747872000&v=beta&t=n7LXfMVueWxWtYOJcwdkTA3tO5tqo0-cS5W2biaQT4Y",
    },
    {
      id: 3,
      name: "Dr. Karthik K",
      specialty: "Gynecologist",
      rating: 4.7,
      availableToday: false,
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQEuTjQhWJw8Bw/profile-displayphoto-shrink_400_400/B4EZVqEMr9HUAg-/0/1741241245172?e=1747872000&v=beta&t=_F1mTKeyjyiN_AgmXRXsFtKeRiq38sHJnl3jfGfTrB8",
    },
    {
      id: 4,
      name: "Dr. Prashant Palve",
      specialty: "Neurology",
      rating: 4.9,
      availableToday: false,
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQG1j7A1h6Kdsw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704635915169?e=1747872000&v=beta&t=SuEDqy5rM8NnTgIBZh0WMB7Gi6ImyQE5oyXWhODVaLQ",
    },
  ];

  const navigate = useNavigate();
  const handleRedirect = () => {
  
    navigate("/doctor-profile");
  };
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specialtyFilter === "" || doctor.specialty === specialtyFilter)
    );
  });
  const { theme } = useTheme();
  const isDark = theme === "dark";


  return (
<div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} flex flex-col min-h-screen`}>
{/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find & Book Appointments With Top Doctors
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                Enjoy hassle-free appointment booking with the best healthcare
                professionals in your area. Whether you need a general
                consultation, specialist care, or follow-up visits, we make it
                easy to connect with trusted doctors. Explore verified profiles,
                read patient reviews, and choose the right expert for your
                needs. Book online or via phone for a seamless healthcare
                experience.{" "}
              </p>
  
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={image}
                alt="Doctor with patient"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Our Featured Doctors
            </h2>
            <a
              href="#"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              View All Doctors <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="text-yellow-400">★★★★★</div>
                      <span className="ml-1 text-gray-600">
                        {doctor.rating}
                      </span>
                    </div>
                    {doctor.availableToday && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Available Today
                      </span>
                    )}
                  </div>
                  <button onClick={handleRedirect} className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="bg-white p-8 rounded-lg text-center mt-4">
              <p className="text-gray-600">
                No doctors found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find a Doctor</h3>
              <p className="text-gray-600">
                Search for doctors by specialty, location, or availability to
                find the perfect match for your needs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
              <p className="text-gray-600">
                Select your preferred date and time slot from the doctor's
                available schedule.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Get Consultation</h3>
              <p className="text-gray-600">
                Visit the doctor at the scheduled time or connect virtually for
                your consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book Your Appointment?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust MediBook for their healthcare
            needs. Book your appointment today!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleRedirect} className="cursor-pointer bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50">
              Find Doctors
            </button>
            <button className="cursor-pointer bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 border border-blue-400">
              Register Now
            </button>
          </div>
        </div>
      </section>


    </div>
  );
  
};


export default HomePage