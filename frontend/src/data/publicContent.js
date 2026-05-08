import competitionsImage from "../assets/competitions.png";
import eventsImage from "../assets/events.png";
import hackathonImage from "../assets/hackathon.png";

export const eventBackgrounds = [competitionsImage, eventsImage, hackathonImage];

export const publicEvents = [
  {
    title: "Startup Pulse Summit",
    date: "May 08",
    category: "Innovation",
    time: "10:00 AM - 1:00 PM",
    venue: "Main Auditorium",
    seats: 120,
    isFree: true,
    description: "Founders, mentors, and investors gather for pitch sessions and rapid networking."
  },
  {
    title: "Inter-Campus Music Night",
    date: "May 16",
    category: "Culture",
    time: "6:00 PM - 9:00 PM",
    venue: "Open Air Stage",
    seats: 300,
    isFree: true,
    description: "Live bands and solo artists perform across multiple stages under the open sky."
  },
  {
    title: "AI Build Sprint",
    date: "May 21",
    category: "Tech",
    time: "9:30 AM - 5:30 PM",
    venue: "Innovation Lab",
    seats: 90,
    isFree: false,
    description: "A two-day sprint where teams prototype practical AI solutions for student life."
  },
  {
    title: "Green Campus Challenge",
    date: "May 29",
    category: "Sustainability",
    time: "11:00 AM - 3:00 PM",
    venue: "Eco Activity Center",
    seats: 160,
    isFree: true,
    description: "Compete to build measurable impact projects focused on waste and energy reduction."
  }
];

export const competitions = [
  {
    name: "CodeStorm League",
    mode: "Team",
    category: "Tech",
    prize: 10000,
    deadline: "May 18",
    level: "Intermediate",
    seatsLeft: 34,
    isFree: true,
    description: "Weekly elimination rounds testing algorithms, system design, and debugging speed."
  },
  {
    name: "DesignArena 2026",
    mode: "Solo / Team",
    category: "Design",
    prize: 6500,
    deadline: "May 22",
    level: "Beginner Friendly",
    seatsLeft: 19,
    isFree: true,
    description: "UX and product storytelling challenge with mentorship from top product designers."
  },
  {
    name: "Campus Sports Cup",
    mode: "Team",
    category: "Sports",
    prize: 8000,
    deadline: "May 27",
    level: "Open",
    seatsLeft: 52,
    isFree: false,
    description: "Multi-sport format for football, volleyball, and athletics with live scoreboards."
  }
];

export const exploreCards = [
  {
    title: "Discover Clubs",
    text: "Find communities in coding, music, culture, entrepreneurship, and social impact."
  },
  {
    title: "Join Teams",
    text: "Build competitive teams based on skills, interests, and role-specific contributions."
  },
  {
    title: "Track Events",
    text: "See event schedules, save reminders, and get live campus announcements in one place."
  }
];