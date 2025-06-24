type JobItem = {
  time: string;
  timeRange: string;
  title: string;
  company: string;
  location: string;
  description: string;
};

export const jobs: JobItem[] = [
  {
    time: '10/2024 - 05/2025',
    timeRange: '8 months',
    title: 'Team Lead Software Development',
    company: 'sidion GmbH',
    location: 'Remote / Stuttgart',
    description:
      'Team lead of an interdisciplinary development team at sidion, fostering an open and supportive team culture through regular meetings and informal virtual exchanges. Served as the main contact for both professional and personal matters, supported career development, and handled goal setting.',
  },
  {
    time: '01/2021 - 05/2025',
    timeRange: '4 years 5 months',
    title: 'Senior Software Developer',
    company: 'sidion GmbH',
    location: 'Remote / Stuttgart',
    description:
      'Contributed to complex client projects in the finance and healthcare sectors, focusing on the development of modern Java-based microservice applications. Supported architectural decisions, promoted clean code practices, mentored junior developers, and worked in agile Scrum teams using a broad technology stack.',
  },
  {
    time: '02/2016 - 12/2020',
    timeRange: '4 years 11 months',
    title: 'Professional Software Developer',
    company: 'sidion GmbH',
    location: 'Stuttgart',
    description:
      'Worked on various client projects across automotive, logistics, banking, and e-commerce sectors, focusing on developing modern Java-based microservice applications. Used a wide range of technologies, worked in agile Scrum teams, mentored junior developers, and emphasized clean code practices.',
  },
  {
    time: '08/2015 - 01/2016',
    timeRange: '6 months',
    title: 'Junior Software Developer',
    company: 'sidion GmbH',
    location: 'Stuttgart',
    description:
      'Contributed to a client project in the automotive industry, focusing on software development using Java, SQL, XML, and IBM DB2. Supported requirements engineering and worked with project management tools like JIRA and Confluence.',
  },
  {
    time: '02/2014 - 07/2015',
    timeRange: '1 year 6 months',
    title: 'Junior Consultant Automotive Engineering',
    company: 'wontec GmbH',
    location: 'Weissach',
    description:
      'Worked in product data management at Porsche AG, focusing on optimizing product data integration within the Volkswagen Group. Responsible for an interface between SAP and an IBM host, and developed VBA tools in Excel for project management and quality assurance.',
  },
];
