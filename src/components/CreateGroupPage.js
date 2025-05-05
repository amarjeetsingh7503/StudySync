import { useState } from "react";

export default function CreateGroupPage({ user, setGroups, setPage }) {
  const [groupName, setGroupName] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [schedule, setSchedule] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupName || !subject || !topic || !schedule) {
      setError("Please fill in all fields");
      return;
    }

    // In a real app, this would save to a database
    // For now, we'll just add it to the local state
    const newGroup = {
      id: Date.now(),
      name: groupName,
      members: [user],
      subject,
      topic,
      schedule,
      meetingLink: `https://meet.jit.si/${groupName.replace(/\s+/g, "")}`,
    };

    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setPage("dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Create a New Study Group</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="group-name">
              Group Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              id="group-name"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Data Structures Study Group"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="subject">
              Subject
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="topic">
              Specific Topic
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Data Structures, Calculus II, Organic Chemistry"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="schedule">
              Meeting Schedule
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              id="schedule"
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="e.g., Mondays and Wednesdays, 7-9pm"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-gray-300 mr-2"
              onClick={() => setPage("dashboard")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            ></button>
          </div>
        </form>
      </div>
    </div>
  );
}
