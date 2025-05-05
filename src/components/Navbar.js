export default function Navbar({ user, setPage, setUser }) {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="font-bold text-xl cursor-pointer"
          onClick={() => setPage("landing")}
        >
          Study Group Coordinator
        </div>

        {user ? (
          <div className="flex space-x-4">
            <button
              className="hover:underline"
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>
            <button
              className="hover:underline"
              onClick={() => setPage("profile")}
            >
              Profile
            </button>
            <button
              className="hover:underline"
              onClick={() => setPage("match")}
            >
              Find Groups
            </button>
            <button
              className="hover:underline"
              onClick={() => setPage("create")}
            >
              Create Group
            </button>
            <button className="hover:underline" onClick={() => setUser(null)}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              className="hover:underline"
              onClick={() => setPage("login")}
            >
              Login
            </button>
            <button
              className="hover:underline"
              onClick={() => setPage("register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
