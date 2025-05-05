export default function ProfilePage({ user, profile, setProfile, setPage }) {
  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Psychology",
    "Business",
    "Literature",
    "History",
    "Engineering",
    "Economics",
    "Art",
    "Music",
    "Philosophy",
    "Political Science",
    "Sociology",
  ];

  const learningStyles = [
    "Visual",
    "Auditory",
    "Reading/Writing",
    "Kinesthetic",
    "Group discussion",
    "Solo study with group check-ins",
  ];

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeSlots = ["Morning", "Afternoon", "Evening"];

  const handleSubjectChange = (subject) => {
    if (profile.subjects.includes(subject)) {
      setProfile({
        ...profile,
        subjects: profile.subjects.filter((s) => s !== subject),
      });
    } else {
      setProfile({
        ...profile,
        subjects: [...profile.subjects, subject],
      });
    }
  };

  const handleScheduleChange = (day, time) => {
    const scheduleItem = `${day} ${time}`;
    if (profile.schedule.includes(scheduleItem)) {
      setProfile({
        ...profile,
        schedule: profile.schedule.filter((s) => s !== scheduleItem),
      });
    } else {
      setProfile({
        ...profile,
        schedule: [...profile.schedule, scheduleItem],
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    // For now, we'll just navigate to the dashboard
    setPage("dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Your Study Profile</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Email</h2>
          <p>{user}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Subjects</h2>
          <p className="text-sm text-gray-600 mb-2">Select all that apply:</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center">
                <input
                  type="checkbox"
                  id={subject}
                  checked={profile.subjects.includes(subject)}
                  onChange={() => handleSubjectChange(subject)}
                  className="mr-2"
                />
                <label htmlFor={subject}>{subject}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Learning Style</h2>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={profile.learningStyle}
            onChange={(e) =>
              setProfile({ ...profile, learningStyle: e.target.value })
            }
          >
            <option value="">Select your preferred learning style</option>
            {learningStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Availability</h2>
          <p className="text-sm text-gray-600 mb-2">
            Select all times you're available:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border"></th>
                  {timeSlots.map((slot) => (
                    <th key={slot} className="p-2 border">
                      {slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekdays.map((day) => (
                  <tr key={day}>
                    <td className="p-2 border font-medium">{day}</td>
                    {timeSlots.map((time) => (
                      <td
                        key={`${day}-${time}`}
                        className="p-2 border text-center"
                      >
                        <input
                          type="checkbox"
                          checked={profile.schedule.includes(`${day} ${time}`)}
                          onChange={() => handleScheduleChange(day, time)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Specific Topics</h2>
          <p className="text-sm text-gray-600 mb-2">
            Enter topics you want to study (comma separated):
          </p>

          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            type="text"
            placeholder="e.g., Data Structures, Calculus II, Organic Chemistry"
            value={profile.topics.join(", ")}
            onChange={(e) =>
              setProfile({
                ...profile,
                topics: e.target.value
                  .split(",")
                  .map((topic) => topic.trim())
                  .filter((topic) => topic),
              })
            }
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            onClick={handleSave}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
