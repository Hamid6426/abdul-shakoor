"use client";
import { useState } from "react";
import axios from "axios"; // Import axios
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse("");
    setError("");

    try {
      const { data } = await axios.post("/api/mails/post-mail", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
      setResponse(`Mail sent successfully: ${JSON.stringify(data)}`);
    }  catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="grid grid-cols-10">
      <div className="bg-gray-800 hidden md:flex md:col-span-4"></div>
      <div className="col-span-10 md:col-span-6 pt-12 pb-16">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-950 text-center mb-8">
          CONTACT FORM
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center justify-center text-lg h-fit gap-4 text-black"
        >
          <div className="flex flex-col w-[90%] md:w-10/12 lg:w-8/12">
            <label className="font-bold pb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="p-2 rounded-lg border-gray-400 border-2 text-black"
            />
          </div>

          <div className="flex flex-col w-[90%] md:w-10/12 lg:w-8/12">
            <label className="font-bold pb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="p-2 rounded-lg border-gray-400 border-2 text-black"
            />
          </div>

          <div className="flex flex-col w-[90%] md:w-10/12 lg:w-8/12">
            <label className="font-bold pb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="p-2 rounded-lg border-gray-400 border-2 text-black"
            />
          </div>

          <div className="flex flex-col w-[90%] md:w-10/12 lg:w-8/12">
            <label className="font-bold pb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="p-2 rounded-lg border-gray-400 border-2 text-black"
            />
          </div>

          <div className="flex flex-col w-[90%] md:w-10/12 lg:w-8/12">
            <label className="font-bold pb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              cols={4}
              required
              className="h-60 overflow-auto px-2 pt-2 rounded-lg border-gray-400 border-2 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-gray-900 text-white font-bold hover:text-[#0ff] hover:border-[#0ff] py-3 w-[90%] md:w-10/12 lg:w-8/12 rounded-lg text-2xl border-2"
          >
            Send Message
          </button>

          <div className="font-medium text-xl mt-8 text-center w-[90%] md:w-10/12 lg:w-8/12">
            You can also reach out to me on these social platforms
          </div>
        </form>
        {response && <p className="text-green-500 mt-4">{response}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mx-auto mt-4 flex justify-center items-center gap-6 md:gap-12 w-[90%] md:w-10/12 lg:w-8/12">
          <div className="border-2 border-black rounded-full">
            <FaLinkedin size={40} className="m-2 md:m-3" />
          </div>
          <div className="border-2 border-black rounded-full">
            <MdMail size={40} className="m-2 md:m-3" />
          </div>
          <div className="border-2 border-black rounded-full">
            <FaWhatsapp size={40} className="m-2 md:m-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
