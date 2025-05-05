export default function Dashboard({ user, groups, setPage }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Study Groups</h1>

      {groups.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="mb-4">You haven't joined any study groups yet.</p>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            onClick={() => setPage("match")}
          >
            Find Study Groups
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
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
                className="block bg-green-600 text-white text-center px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Join Meeting
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 mr-4"
          onClick={() => setPage("match")}
        >
          Find More Groups
        </button>
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          onClick={() => setPage("create")}
        >
          Create New Group
        </button>
      </div>
    </div>
  );
}
