import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col bg-gray-900 py-12">
        <div className="grid grid-cols-10 ">
          
          <div className="col-span-10 md:col-span-4 flex flex-col justify-start items-start pl-12 text-white font-bold">
            <h2 className="mb-6 text-[#0ff] text-xl">Quick Links</h2>
            <ul className="flex flex-col gap-4">
              <Link href="/about" className="hover:text-[#0ff]">
                About
              </Link>
              <Link href="/projects" className="hover:text-[#0ff]">
                Projects
              </Link>
              <Link href="/blog" className="hover:text-[#0ff]">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-[#0ff]">
                Contact
              </Link>
            </ul>
          </div>
          <div className="col-span-10 md:col-span-6 flex flex-col justify-start pt-12 md:pt-0 items-start pl-12 text-white font-bold">
            <h2 className="mb-6 text-[#0ff] text-xl">Contact me</h2>
            <ul className="flex flex-col gap-4">
              <Link href="/about" className="hover:text-[#0ff]">
                Gmail
              </Link>
              <Link href="/projects" className="hover:text-[#0ff]">
                Linkedin
              </Link>
              <Link href="/blog" className="hover:text-[#0ff]">
                Whatsapp
              </Link>
              <Link href="/contact" className="hover:text-[#0ff]">
                Phone
              </Link>
            </ul>
          </div>

        </div>

        <div className="grid grid-cols-10 bg-gray-900">
          <div className="col-span-10 md:col-span-4 flex flex-col justify-start pt-8 items-start pl-12 text-white font-bold">
            <h2 className="mb-6 text-[#0ff] text-xl">For Everyone</h2>
            <ul className="flex flex-col gap-4">
              <Link href="/about" className="hover:text-[#0ff]">
                Advance HVAC
              </Link>
              <Link href="/projects" className="hover:text-[#0ff]">
                Advance CAD
              </Link>
              <Link href="/blog" className="hover:text-[#0ff]">
                Higher Education & Stress
              </Link>
              <Link href="/contact" className="hover:text-[#0ff]">
                Time Management
              </Link>
            </ul>
          </div>
          <div className="col-span-10 md:col-span-6 flex flex-col justify-start pt-8 items-start pl-12 pr-12 text-white font-medium">
            <h2 className="mb-6 text-[#0ff] text-xl font-bold">Dr. Abdul Shakoor</h2>
            <div className="flex flex-col">
              <div className="text-justify">
                An expert in HVAC and Material Science, striving for better of
                environment and education
              </div>
              <div className="mt-6 mb-2">
                <span className="text-[#0ff]">Phone:</span> +92-1234-56789
              </div>
              <div>
                <span className="text-[#0ff]">Address:</span> Room #2, Near
                Power Plant Lab, Mechanical Engineering Department, UET Peshawar
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
