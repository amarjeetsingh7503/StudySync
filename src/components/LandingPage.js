export default function LandingPage({ setUser, setPage }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Connect, Collaborate, Succeed
        </h1>
        <p className="text-xl mb-8">
          Join study groups with students who share your schedule, learning
          style, and academic interests.
        </p>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            onClick={() => setPage("register")}
          >
            Get Started
          </button>
          <button
            className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50"
            onClick={() => setPage("login")}
          >
            Login
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Smart Matching</h2>
          <p>
            Find study partners based on your schedule, learning preferences,
            and academic goals.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Virtual Collaboration</h2>
          <p>
            Meet online through integrated video chat and collaborate on shared
            documents in real-time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Resource Sharing</h2>
          <p>
            Access and share open educational resources related to your study
            topics.
          </p>
        </div>
      </div>
    </div>
  );
}
