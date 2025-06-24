type JourneyItem = {
  time: string;
  timeRange?: string;
  title: string;
  company?: string;
  location?: string;
  description: string;
  active: boolean;
  events: EventItem[];
};

type EventItem = {
  date: string;
  title: string;
};

export const jobs: JourneyItem[] = [
  {
    time: 'since 02/2026',
    title: 'Fullstack Software Developer',
    company: 'coming soon...',
    location: 'Remote',
    description:
      'Developing microservices with Spring Boot using Kotlin and frontends with Angular...',
    active: false,
    events: [],
  },
  {
    time: '06/2025 - 01/2026',
    timeRange: '8 months',
    title: 'Transition phase & personal sabbatical',
    description:
      'Combined a planned sabbatical with focused technical upskilling: Kotlin with Spring Boot, Spring AI, Kafka fundamentals, Angular 19+, Kubernetes, and general backend refresh. Additionally explored data science and data engineering concepts. Prepared for the next long-term professional challenge.',
    active: true,
    events: [
      {
        date: '12/2025',
        title:
          'OpenTelemetry Certified Associate | <span class="mw-text-muted">The Linux Foundation</span>',
      },
      {
        date: '07/2025',
        title: 'Complete redesign of my developer portfolio page',
      },
    ],
  },
  {
    time: '10/2024 - 05/2025',
    timeRange: '8 months',
    title: 'Team Lead Software Development',
    company: 'sidion GmbH',
    location: 'Remote / Stuttgart',
    description:
      'Team lead of an interdisciplinary development team at sidion, fostering an open and supportive team culture through regular meetings and informal virtual exchanges. Served as the main contact for both professional and personal matters, supported career development, and handled goal setting.',
    active: false,
    events: [],
  },
  {
    time: '01/2021 - 05/2025',
    timeRange: '4 years 5 months',
    title: 'Senior Software Developer',
    company: 'sidion GmbH',
    location: 'Remote / Stuttgart',
    description:
      'Contributed to complex client projects in the finance and healthcare sectors, focusing on the development of modern Java-based microservice applications. Supported architectural decisions, promoted clean code practices, mentored junior developers, and worked in agile Scrum teams using a broad technology stack.',
    active: false,
    events: [],
  },
  {
    time: '02/2016 - 12/2020',
    timeRange: '4 years 11 months',
    title: 'Professional Software Developer',
    company: 'sidion GmbH',
    location: 'Stuttgart',
    description:
      'Worked on various client projects across automotive, logistics, banking, and e-commerce sectors, focusing on developing modern Java-based microservice applications. Used a wide range of technologies, worked in agile Scrum teams, mentored junior developers, and emphasized clean code practices.',
    active: false,
    events: [
      {
        date: '06/2020',
        title:
          'Blog article on angular.de: <a class="mw-btn mw-btn-link" href="https://angular.de/artikel/sidion-workshop-experience/" target="_blank">Click to open article</a>',
      },
      {
        date: '04/2019',
        title:
          'Cloud Foundry Certified Developer | <span class="mw-text-muted">The Linux Foundation</span>',
      },
      {
        date: '01/2017',
        title:
          'ISTQB Certified Tester - Foundation Level | <span class="mw-text-muted">iSQI Group</span>',
      },
    ],
  },
  {
    time: '08/2015 - 01/2016',
    timeRange: '6 months',
    title: 'Junior Software Developer',
    company: 'sidion GmbH',
    location: 'Stuttgart',
    description:
      'Contributed to a client project in the automotive industry, focusing on software development using Java, SQL, XML, and IBM DB2. Supported requirements engineering and worked with project management tools like JIRA and Confluence.',
    active: false,
    events: [
      {
        date: '01/2016',
        title:
          'IREB Certified Requirements Engineer - Foundation Level | <span class="mw-text-muted">iSQI Group</span>',
      },
    ],
  },
  {
    time: '02/2014 - 07/2015',
    timeRange: '1 year 6 months',
    title: 'Junior Consultant Automotive Engineering',
    company: 'wontec GmbH',
    location: 'Weissach',
    description:
      'Worked in product data management at Porsche AG, focusing on optimizing product data integration within the Volkswagen Group. Responsible for an interface between SAP and an IBM host, and developed VBA tools in Excel for project management and quality assurance.',
    active: false,
    events: [],
  },
];
