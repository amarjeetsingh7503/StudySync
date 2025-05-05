// Calculate match score between a user and a group (0-100)
function calculateMatchScore(userProfile, group) {
  let score = 0;
  let maxScore = 0;

  // Subject match (max 30 points)
  if (userProfile.subjects.includes(group.subject)) {
    score += 30;
  }
  maxScore += 30;

  // Topic match (max 30 points)
  const topicMatch = userProfile.topics.some(
    (topic) =>
      group.topic.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(group.topic.toLowerCase())
  );
  if (topicMatch) {
    score += 30;
  }
  maxScore += 30;

  // Schedule compatibility (max 25 points)
  const groupScheduleText = group.schedule.toLowerCase();
  let scheduleScore = 0;

  // Extract days from group schedule text
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Extract times from group schedule text
  const times = ["morning", "afternoon", "evening"];

  // Check each user availability against group schedule
  for (const availability of userProfile.schedule) {
    const [day, time] = availability.split(" ");

    if (groupScheduleText.includes(day.toLowerCase())) {
      // Day match
      scheduleScore += 2;

      if (groupScheduleText.includes(time.toLowerCase())) {
        // Time match on the same day
        scheduleScore += 3;
      }
    }
  }

  // Cap schedule score at 25
  score += Math.min(scheduleScore, 25);
  maxScore += 25;

  // Learning style match (max 15 points)
  if (userProfile.learningStyle) {
    // Direct match
    if (group.learningStyle === userProfile.learningStyle) {
      score += 15;
    }
    // Compatible learning styles (could be expanded with more detailed compatibility logic)
    else if (
      (group.learningStyle === "Group discussion" &&
        userProfile.learningStyle === "Auditory") ||
      (group.learningStyle === "Visual" &&
        userProfile.learningStyle === "Reading/Writing")
    ) {
      score += 10;
    }
    // Somewhat compatible
    else {
      score += 5;
    }
  }
  maxScore += 15;

  // Calculate percentage
  return Math.round((score / maxScore) * 100);
}

// Find best matching groups for a user
function findMatchingGroups(userProfile, availableGroups) {
  // Calculate scores for all groups
  const scoredGroups = availableGroups.map((group) => {
    const matchScore = calculateMatchScore(userProfile, group);
    return { ...group, matchScore };
  });

  // Sort by match score (highest first)
  const sortedGroups = scoredGroups.sort((a, b) => b.matchScore - a.matchScore);

  // Filter out poor matches (less than 40% compatibility)
  const goodMatches = sortedGroups.filter((group) => group.matchScore >= 40);

  return goodMatches;
}

// Example usage
const userProfile = {
  subjects: ["Computer Science", "Mathematics"],
  topics: ["Data Structures", "Algorithms", "Calculus"],
  schedule: [
    "Monday Evening",
    "Tuesday Evening",
    "Wednesday Morning",
    "Friday Afternoon",
  ],
  learningStyle: "Visual",
};

const allGroups = [
  {
    id: 1,
    name: "Data Structures Study Group",
    members: ["alex@university.edu", "jamie@university.edu"],
    subject: "Computer Science",
    topic: "Data Structures",
    schedule: "Mondays and Wednesdays, 7-9pm",
    learningStyle: "Visual",
  },
  {
    id: 2,
    name: "Organic Chemistry",
    members: ["taylor@university.edu", "jordan@university.edu"],
    subject: "Chemistry",
    topic: "Organic Chemistry",
    schedule: "Tuesdays, 6-8pm",
    learningStyle: "Group discussion",
  },
  {
    id: 3,
    name: "Calculus II Group",
    members: ["casey@university.edu"],
    subject: "Mathematics",
    topic: "Calculus II",
    schedule: "Fridays, 2-4pm",
    learningStyle: "Reading/Writing",
  },
];

const matches = findMatchingGroups(userProfile, allGroups);
console.log(matches);
// Output will show the groups sorted by match score
