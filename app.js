const resumeData = {
  education: [
    {
      school: "University of Connecticut",
      degree: "B.S. Computer Science",
      details: [
        "Minor: Mathematics",
        "Honors Program",
        "GPA: 3.99/4.00"
      ],
      date: "May 2025"
    },
    {
      school: "University of Connecticut",
      degree: "M.S. Computer Science",
      date: "May 2026"
    }
  ],

  experience: [
    {
      company: "Whelen Engineering Company",
      role: "Cybersecurity Intern (Software Development)",
      date: "Jul 2022 - Jan 2025",
      bullets: [
        "Evaluated and tested secure code training solutions, presenting findings to IT leadership along with a recommendation on which solution to implement",
        "Monitored EDR software for alerts and investigated security threats in sandbox environment",
        "Implemented backend API endpoints and developed a frontend React application to interact with SQL database through the API while working as part of an Agile software development team"
      ]
    },
    {
      company: "AlgorithmicPro AI",
      role: "Software Developer / Researcher",
      date: "Jul 2025 - Present",
      bullets: [
        "Implemented and optimized novel data linkage algorithms for entity resolution across large-scale datasets",
        "Designed an LLM-based interface layer using OpenAI Agent Builder to convert natural language queries into structured algorithmic inputs"
      ]
    }
  ],

  research: [
    {
      title: "hyDNS: Acceleration of DNS Through Kernel Space Resolution",
      details: [
        "Published at SIGCOMM eBPF Workshop '24",
        "Accelerates DNS via kernel-space resolution using eBPF"
      ]
    }
  ],

  skills: {
    languages: ["Python", "C", "C++", "JavaScript", "Scheme"],
    systems: ["Linux", "TCP/IP", "DNS", "eBPF", "Docker", "AWS"],
    web: ["HTML/CSS", "React", "SQL", "MongoDB", "REST APIs", "NodeJS", "Flask"],
    security: ["Threat investigation", "AppSec", "EDR monitoring", "Malware analysis", "DNS security"]
  }
};

function createSection(title, items, renderItem) {
  const section = document.createElement("div");
  section.className = "section";

  const header = document.createElement("h2");
  header.textContent = title;

  section.appendChild(header);

  items.forEach(item => {
    section.appendChild(renderItem(item));
  });

  return section;
}

function createExpandableCard(title, subtitle, contentItems) {
  const card = document.createElement("div");
  card.className = "card";

  const header = document.createElement("div");
  header.className = "card-header";
  header.innerHTML = `<strong>${title}</strong><br><span>${subtitle}</span>`;

  const content = document.createElement("div");
  content.className = "card-content";

  contentItems.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    content.appendChild(li);
  });

  header.addEventListener("click", () => {
    card.classList.toggle("open");
  });

  card.appendChild(header);
  card.appendChild(content);

  return card;
}


const app = document.getElementById("app");

// Experience
app.appendChild(createSection(
  "Experience",
  resumeData.experience,
  job => createExpandableCard(
    `${job.role} - ${job.company}`,
    job.date,
    job.bullets
  )
));

// Education
app.appendChild(createSection(
  "Education",
  resumeData.education,
  edu => createExpandableCard(
    edu.school,
    `${edu.degree} (${edu.date})`,
    edu.details || []
  )
));

// Research
app.appendChild(createSection(
  "Research",
  resumeData.research,
  r => createExpandableCard(
    r.title,
    "",
    r.details
  )
));