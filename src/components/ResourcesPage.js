import { useState, useEffect } from "react";

export default function ResourcesPage({ subject, topic }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState(null);

  // Simulate fetching OER resources
  useEffect(() => {
    // In a real app, this would call an API that aggregates OER content
    setTimeout(() => {
      const fetchedResources = getResourcesBySubjectAndTopic(subject, topic);
      setResources(fetchedResources);
      setLoading(false);
    }, 1000);
  }, [subject, topic]);

  const getResourcesBySubjectAndTopic = (subject, topic) => {
    // This would be replaced with actual API calls to OER repositories
    const allResources = {
      "Computer Science": {
        "Data Structures": [
          {
            id: 1,
            title: "Introduction to Data Structures",
            source: "OpenStax",
            type: "Textbook",
            url: "https://openstax.org/details/books/data-structures",
            description: "Comprehensive guide to data structures fundamentals.",
          },
          {
            id: 2,
            title: "Data Structures Visualizations",
            source: "MIT OCW",
            type: "Interactive",
            url: "https://ocw.mit.edu/",
            description: "Visual demonstrations of common data structures.",
          },
          {
            id: 3,
            title: "Arrays & Linked Lists",
            source: "Khan Academy",
            type: "Video",
            url: "https://www.khanacademy.org/",
            description:
              "Tutorial series covering array and linked list implementations.",
          },
        ],
        Algorithms: [
          {
            id: 4,
            title: "Introduction to Algorithms",
            source: "MIT OCW",
            type: "Course",
            url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/",
            description:
              "Complete algorithm course with lectures and problem sets.",
          },
        ],
      },
      Mathematics: {
        "Calculus II": [
          {
            id: 5,
            title: "Calculus Volume 2",
            source: "OpenStax",
            type: "Textbook",
            url: "https://openstax.org/details/books/calculus-volume-2",
            description: "Comprehensive coverage of integral calculus.",
          },
          {
            id: 6,
            title: "Integration Techniques",
            source: "Khan Academy",
            type: "Video",
            url: "https://www.khanacademy.org/math/integral-calculus",
            description: "Step-by-step guides to various integration methods.",
          },
        ],
      },
      Chemistry: {
        "Organic Chemistry": [
          {
            id: 7,
            title: "Organic Chemistry",
            source: "LibreTexts",
            type: "Textbook",
            url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry",
            description:
              "Comprehensive organic chemistry resource with practice problems.",
          },
        ],
      },
    };

    if (
      subject &&
      topic &&
      allResources[subject] &&
      allResources[subject][topic]
    ) {
      return allResources[subject][topic];
    } else if (subject && allResources[subject]) {
      // Return all resources for the subject if no topic is specified
      return Object.values(allResources[subject]).flat();
    } else {
      // Return a sampling of resources if no subject or topic is specified
      return [
        {
          id: 1,
          title: "Introduction to Data Structures",
          source: "OpenStax",
          type: "Textbook",
          url: "https://openstax.org/details/books/data-structures",
          description: "Comprehensive guide to data structures fundamentals.",
        },
        {
          id: 5,
          title: "Calculus Volume 2",
          source: "OpenStax",
          type: "Textbook",
          url: "https://openstax.org/details/books/calculus-volume-2",
          description: "Comprehensive coverage of integral calculus.",
        },
        {
          id: 7,
          title: "Organic Chemistry",
          source: "LibreTexts",
          type: "Textbook",
          url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry",
          description:
            "Comprehensive organic chemistry resource with practice problems.",
        },
      ];
    }
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const closeResourceModal = () => {
    setSelectedResource(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Open Educational Resources</h1>

      {loading ? (
        <div className="text-center py-8">
          <p>Loading resources...</p>
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p>No resources found for the specified subject and topic.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg"
              onClick={() => handleResourceClick(resource)}
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{resource.title}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    resource.type === "Textbook"
                      ? "bg-blue-100 text-blue-800"
                      : resource.type === "Video"
                      ? "bg-red-100 text-red-800"
                      : resource.type === "Interactive"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {resource.type}
                </span>
              </div>

              <p className="text-gray-600 mb-3">Source: {resource.source}</p>
              <p className="text-gray-700">{resource.description}</p>
            </div>
          ))}
        </div>
      )}

      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">
                {selectedResource.title}
              </h2>
              <button
                onClick={closeResourceModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <p className="text-gray-600 mb-2">
              Source: {selectedResource.source}
            </p>
            <p className="text-gray-600 mb-4">Type: {selectedResource.type}</p>
            <p className="text-gray-700 mb-6">{selectedResource.description}</p>

            <div className="flex justify-between">
              <button
                onClick={closeResourceModal}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Close
              </button>
              <a
                href={selectedResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Access Resource
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
