import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import MatchPage from "./components/MatchPage";
import CreateGroupPage from "./components/CreateGroupPage";
import Footer from "./components/Footer";

export default function StudyGroupApp() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("landing");
  const [groups, setGroups] = useState([]);
  const [profile, setProfile] = useState({
    subjects: [],
    schedule: [],
    learningStyle: "",
    topics: [],
  });

  // Simulated data for demonstration
  useEffect(() => {
    if (user) {
      setGroups([
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
          meetingLink: "https://meet.jit.si/DataStructures2025",
        },
        {
          id: 2,
          name: "Organic Chemistry Prep",
          members: ["casey@university.edu", "morgan@university.edu"],
          subject: "Chemistry",
          topic: "Organic Chemistry",
          schedule: "Tuesdays, 6-8pm",
          meetingLink: "https://meet.jit.si/OrganicChemStudy",
        },
      ]);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} setPage={setPage} setUser={setUser} />

      {page === "landing" && !user && (
        <LandingPage setUser={setUser} setPage={setPage} />
      )}
      {page === "login" && !user && (
        <LoginPage setUser={setUser} setPage={setPage} />
      )}
      {page === "register" && !user && (
        <RegisterPage setUser={setUser} setPage={setPage} />
      )}

      {user && page === "dashboard" && (
        <Dashboard user={user} groups={groups} setPage={setPage} />
      )}

      {user && page === "profile" && (
        <ProfilePage
          user={user}
          profile={profile}
          setProfile={setProfile}
          setPage={setPage}
        />
      )}

      {user && page === "match" && (
        <MatchPage user={user} profile={profile} setPage={setPage} />
      )}

      {user && page === "create" && (
        <CreateGroupPage user={user} setGroups={setGroups} setPage={setPage} />
      )}

      <Footer />
    </div>
  );
}
