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
      degree: "M.S. Computer Science and Engineering",
      date: "May 2026"
    }
  ],

  experience: [
    {
      company: "AlgorithmicPro AI",
      role: "Software Developer / Researcher",
      date: "Jul 2025 - Present",
      bullets: [
        "Implemented and optimized novel data linkage algorithms for entity resolution across large-scale datasets",
        "Designed an LLM-based interface layer using OpenAI Agent Builder to convert natural language queries into structured algorithmic inputs"
      ]
    },
    {
      company: "Whelen Engineering Company",
      role: "Cybersecurity Intern (Software Development)",
      date: "Jul 2022 - Jan 2025",
      bullets: [
        "Evaluated and tested secure code training solutions, presenting findings to IT leadership along with a recommendation on which solution to implement",
        "Monitored EDR software for alerts and investigated security threats in sandbox environment",
        "Implemented backend API endpoints and developed a frontend React application to interact with SQL database through the API while working as part of an Agile software development team"
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
    Languages: ["Python", "C", "C++", "JavaScript", "Scheme"],
    Systems: ["Linux", "TCP/IP", "DNS", "eBPF", "Docker", "AWS"],
    Web: ["HTML/CSS", "React", "SQL", "MongoDB", "REST APIs", "NodeJS", "Flask"],
    Security: ["Threat investigation", "AppSec", "EDR monitoring", "Malware analysis", "DNS security"]
  }
};

const projectsData = [
  {
    name: "JTrivia",
    status: "In development",
    description:
      "A Jeopardy-style trivia game playable in the browser. Currently in beta testing, " +
      "with new features and game modes actively being added.",
    links: [
      { label: "Play at jtrivia.app", href: "https://jtrivia.app" }
    ]
  }
];

const CHEVRON_SVG = `
  <svg class="chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const EXTERNAL_SVG = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V10M9 2h5v5M14 2 7 9"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

function createSection(title, items, renderItem) {
  const section = document.createElement("div");
  section.className = "section";

  const header = document.createElement("h2");
  header.textContent = title;
  section.appendChild(header);

  items.forEach(item => section.appendChild(renderItem(item)));

  return section;
}

let cardCounter = 0;

function createExpandableCard(title, subtitle, contentItems) {
  const card = document.createElement("div");
  card.className = "card";

  const hasContent = Array.isArray(contentItems) && contentItems.length > 0;
  const bodyId = `card-body-${++cardCounter}`;

  const header = document.createElement(hasContent ? "button" : "div");
  header.className = "card-header";

  const text = document.createElement("span");
  text.className = "card-text";

  const titleEl = document.createElement("span");
  titleEl.className = "card-title";
  titleEl.textContent = title;
  text.appendChild(titleEl);

  if (subtitle) {
    const subtitleEl = document.createElement("span");
    subtitleEl.className = "card-subtitle";
    subtitleEl.textContent = subtitle;
    text.appendChild(subtitleEl);
  }

  header.appendChild(text);
  card.appendChild(header);

  if (!hasContent) {
    card.classList.add("static");
    return card;
  }

  header.type = "button";
  header.setAttribute("aria-expanded", "false");
  header.setAttribute("aria-controls", bodyId);
  header.insertAdjacentHTML("beforeend", CHEVRON_SVG);

  const body = document.createElement("div");
  body.className = "card-body";
  body.id = bodyId;

  const inner = document.createElement("div");
  inner.className = "card-body-inner";

  const content = document.createElement("ul");
  content.className = "card-content";
  contentItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    content.appendChild(li);
  });

  inner.appendChild(content);
  body.appendChild(inner);
  card.appendChild(body);

  header.addEventListener("click", () => {
    const open = card.classList.toggle("open");
    header.setAttribute("aria-expanded", String(open));
  });

  return card;
}

function createSkillsSection(skills) {
  const section = document.createElement("div");
  section.className = "section";

  const header = document.createElement("h2");
  header.textContent = "Skills";
  section.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "skills-grid";

  Object.entries(skills).forEach(([group, items]) => {
    const groupEl = document.createElement("div");
    groupEl.className = "skill-group";

    const title = document.createElement("h3");
    title.textContent = group;
    groupEl.appendChild(title);

    const list = document.createElement("ul");
    list.className = "chips";
    items.forEach(skill => {
      const chip = document.createElement("li");
      chip.className = "chip";
      chip.textContent = skill;
      list.appendChild(chip);
    });

    groupEl.appendChild(list);
    grid.appendChild(groupEl);
  });

  section.appendChild(grid);
  return section;
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const top = document.createElement("div");
  top.className = "project-top";

  const name = document.createElement("h3");
  name.textContent = project.name;
  top.appendChild(name);

  if (project.status) {
    const status = document.createElement("span");
    status.className = "project-status";
    status.textContent = project.status;
    top.appendChild(status);
  }

  card.appendChild(top);

  const description = document.createElement("p");
  description.textContent = project.description;
  card.appendChild(description);

  if (project.links && project.links.length) {
    const links = document.createElement("div");
    links.className = "project-links";

    project.links.forEach(link => {
      const a = document.createElement("a");
      a.href = link.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = link.label;
      a.insertAdjacentHTML("beforeend", EXTERNAL_SVG);
      links.appendChild(a);
    });

    card.appendChild(links);
  }

  return card;
}

// ---------- Resume view ----------

const app = document.getElementById("app");

app.appendChild(createSection(
  "Experience",
  resumeData.experience,
  job => createExpandableCard(
    `${job.role} - ${job.company}`,
    job.date,
    job.bullets
  )
));

app.appendChild(createSection(
  "Education",
  resumeData.education,
  edu => createExpandableCard(
    edu.school,
    `${edu.degree} (${edu.date})`,
    edu.details || []
  )
));

app.appendChild(createSection(
  "Research",
  resumeData.research,
  r => createExpandableCard(r.title, "", r.details)
));

app.appendChild(createSkillsSection(resumeData.skills));

// ---------- Projects view ----------

const projectsContainer = document.getElementById("projects-list");
projectsData.forEach(project => {
  projectsContainer.appendChild(createProjectCard(project));
});

// ---------- Tab navigation ----------

const TABS = ["resume", "about", "projects", "contact"];
const DEFAULT_TAB = "resume";

function showTab(name) {
  const active = TABS.includes(name) ? name : DEFAULT_TAB;

  document.querySelectorAll(".view").forEach(view => {
    const isActive = view.dataset.tab === active;
    if (isActive && !view.classList.contains("active")) {
      // Restart the enter animation when a view becomes active.
      view.classList.remove("active");
      void view.offsetWidth;
    }
    view.classList.toggle("active", isActive);
  });

  document.querySelectorAll(".tab").forEach(tab => {
    const isActive = tab.getAttribute("href") === `#${active}`;
    tab.classList.toggle("active", isActive);

    if (isActive) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });
}

function currentTab() {
  return window.location.hash.replace("#", "");
}

window.addEventListener("hashchange", () => showTab(currentTab()));

showTab(currentTab());
