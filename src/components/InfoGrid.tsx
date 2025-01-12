import abdulShakoor from "../lib/abdulShakoor";

export default function InfoGrid() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 w-full px-4 py-6 lg:px-12 lg:py-8 border-2 border-gray-400 rounded-lg shadow-2xl">
      {/* Education Section */}
      <section className="flex flex-col justify-start">
        <div className="flex flex-col space-y-4">
          <h2 className="text-[#0ff] font-black text-xl lg:text-2xl">Education</h2>
          {abdulShakoor.education.map((edu, index) => (
            <div key={index} className="h-auto">
              <div className="text-base lg:text-lg font-bold">{edu.institution}</div>
              <div>{edu.degree}</div>
              <div className="text-sm text-gray-500">{edu.dates}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="flex flex-col justify-start">
        <div className="flex flex-col space-y-4">
          <h2 className="text-[#0ff] font-black text-xl lg:text-2xl">Experiences</h2>
          {abdulShakoor.experience.map((exp, index) => (
            <div key={index} className="h-auto">
              <div className="text-base lg:text-lg font-bold">{exp.company}</div>
              <div>{exp.role}</div>
              <div className="text-sm text-gray-500">{exp.dates}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Co-curricular Section */}
      <section className="flex flex-col justify-start">
        <div className="flex flex-col space-y-4">
          <h2 className="text-[#0ff] font-black text-xl lg:text-2xl">Co-curricular</h2>
          {abdulShakoor.coCurricular.map((activity, index) => (
            <div key={index} className="h-auto">
              <div className="text-base lg:text-lg font-bold">{activity.title}</div>
              <div>{activity.details}</div>
              <div className="text-sm text-gray-500">{activity.dates}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
