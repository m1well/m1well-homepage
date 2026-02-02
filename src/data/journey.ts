type JourneyItem = {
  time: string;
  timeRange?: string;
  startDate?: string;
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
    startDate: '2026-02-01',
    title: 'Fullstack Software Developer',
    company: 'VYDA GmbH',
    location: 'Remote / Münster',
    description:
      'Product development in the personal injury domain: our platform reads large PDF documents using AI and OCR, makes the extracted data reviewable and correctable in modern data entry interfaces, and merges it into one consolidated case file - the basis our medical experts build their assessments on. As one of three fullstack developers I am involved end-to-end: from domain modelling through Spring Boot services in Kotlin and the Angular frontends to deployment and operations on Kubernetes. A team that size leaves a lot of room to shape things - and the responsibility to make architectural decisions that still hold up in two years.',
    active: true,
    events: [],
  },
  {
    time: '06/2025 - 01/2026',
    timeRange: '8 months',
    title: 'Transition phase & sabbatical',
    description:
      'Used the time for a full tech refresh and earned the OpenTelemetry Certified Associate (OTCA). Deepened my expertise in Kotlin, Spring Boot 4 & Spring AI, OpenTelemetry, Angular 19+ and Kubernetes, and took a first look at data science and data engineering.',
    active: false,
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
      'Team lead of an interdisciplinary development team. Built an open team culture through regular meetings and informal virtual exchanges, served as the main contact for professional and personal matters, and handled career development and goal setting.',
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
      'Contributed to client projects in the finance and healthcare sectors, mostly Java-based microservice applications. Supported architectural decisions, pushed clean code practices, mentored junior developers, and worked in agile Scrum teams across a broad technology stack.',
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
      'Worked on client projects across automotive, logistics, banking and e-commerce, mostly Java-based microservice applications on a broad technology stack. Worked in agile Scrum teams, mentored junior developers and pushed clean code practices.',
    active: false,
    events: [
      {
        date: '06/2020',
        title:
          'Blog article on angular.de: <a class="mw-link" href="https://angular.de/artikel/sidion-workshop-experience/" target="_blank" rel="noopener noreferrer">Click to open article</a>',
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
      'Contributed to a client project in the automotive industry: software development with Java, SQL, XML and IBM DB2. Supported requirements engineering and worked with project management tools like JIRA and Confluence.',
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
      'Worked in product data management at Porsche AG, optimizing product data integration within the Volkswagen Group. Responsible for an interface between SAP and an IBM host, and built VBA tools in Excel for project management and quality assurance.',
    active: false,
    events: [],
  },
];
