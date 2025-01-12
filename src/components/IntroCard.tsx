import Image from "next/image";

export default function IntroCard() {
  return (
    <main className="flex flex-col md:flex-row items-start justify-center w-full px-12 py-8 border-2 border-gray-400 rounded-lg shadow-2xl">
      {/* Profile Image Section */}
      <section className="w-48 h-48 md:w-72 md:h-72 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
        <Image
          src="/profile-picture.png"
          alt="Dr. Abdul Shakoor"
          width={240}
          height={240}
          className="object-cover w-full h-full rounded-xl"
        />
      </section>

      {/* Introduction Text Section */}
      <section className="flex flex-col">
        <h1 className="text-[#0ff] font-black text-3xl mb-2">Hello!</h1>
        
        <div className="text-gray-800 space-y-4">
          <p>
            <span className="text-lg font-bold">Dr. Abdul Shakoor</span> is a distinguished professor at the University of Engineering & Technology &qout;UET&qout; Peshawar. He earned his Bachelor&apos;s degree in Mechanical Engineering from UET Peshawar and was subsequently awarded a Master&apos;s degree in Mechanical Engineering from Example University. Driven by his passion for the field, Dr. Shakoor pursued and completed his Ph.D. at Example University.
          </p>

          <p>
            With years of experience at UET Peshawar, Dr. Shakoor has been an active member of various professional societies dedicated to environmental sustainability. He has also conducted numerous seminars on a wide range of engineering and interdisciplinary topics, contributing significantly to academic and community development.
          </p>

          <p>
            Currently, Dr. Shakoor is collaborating with PSIAC on a new project, where he serves as a mentor. In this role, he leverages his extensive expertise in AutoCAD and HVAC systems to educate and inspire students, fostering the next generation of engineers.
          </p>
        </div>
      </section>
    </main>
  );
}
