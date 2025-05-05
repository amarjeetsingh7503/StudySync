import { useState, useEffect } from "react";

export default function MatchPage({ user, profile, setPage }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading matches
  useEffect(() => {
    setTimeout(() => {
      setMatches([
        {
          id: 1,
          name: "Data Structures Study Group",
          members: [
            "alex@university.edu",
            "jamie@university.edu",
            "taylor@university.edu",
          ],
          subject: "Computer Science",
          topic: "Data Structures",
          schedule: "Mondays and Wednesdays, 7-9pm",
          matchScore: 92,
          meetingLink: "https://meet.jit.si/DataStructures2025",
        },
        {
          id: 3,
          name: "Calculus II Group",
          members: ["sam@university.edu", "jordan@university.edu"],
          subject: "Mathematics",
          topic: "Calculus II",
          schedule: "Fridays, 5-7pm",
          matchScore: 85,
          meetingLink: "https://meet.jit.si/CalculusII",
        },
        {
          id: 4,
          name: "Algorithm Design",
          members: ["riley@university.edu", "quinn@university.edu"],
          subject: "Computer Science",
          topic: "Algorithms",
          schedule: "Tuesdays and Thursdays, 6-8pm",
          matchScore: 78,
          meetingLink: "https://meet.jit.si/AlgorithmDesign",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Recommended Study Groups</h1>

      {loading ? (
        <div className="text-center py-8">
          <p>Finding your perfect study matches...</p>
        </div>
      ) : matches.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="mb-4">
            No matches found. Try updating your profile with more information.
          </p>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            onClick={() => setPage("profile")}
          >
            Update Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((group) => (
            <div key={group.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{group.name}</h2>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                  {group.matchScore}% Match
                </span>
              </div>

              <p className="text-gray-600 mb-1">
                {group.subject} - {group.topic}
              </p>
              <p className="text-gray-600 mb-3">{group.schedule}</p>

              <div className="mb-4">
                <h3 className="font-medium mb-1">Members:</h3>
                <ul className="text-sm text-gray-600">
                  {group.members.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>

              <a
                href={group.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-600 text-white text-center px-4 py-2 rounded-lg hover:bg-green-700 mb-2"
              >
                Join Meeting
              </a>

              <button className="block w-full border border-indigo-600 text-indigo-600 text-center px-4 py-2 rounded-lg hover:bg-indigo-50">
                Request to Join Group
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          onClick={() => setPage("create")}
        >
          Create Your Own Group
        </button>
      </div>
    </div>
  );
}
