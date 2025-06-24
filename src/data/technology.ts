type StackItem = {
  name: string;
  text: string;
  icon: string;
};

type SkillItem = {
  category: string;
  specific: {
    name: string;
    barValue: number;
    proficiency: string;
  }[];
};

export const stacks: StackItem[] = [
  {
    name: 'Fullstack Dev',
    text: 'Building robust microservices and full-stack web applications using Java (primarily the Spring ecosystem) for scalable backends and Angular for responsive, dynamic frontends.',
    icon: 'fas fa-code',
  },
  {
    name: 'DB & Messaging',
    text: 'Designing and managing persistence layers with relational databases like MySQL and Postgres, and implementing message-driven architectures using RabbitMQ for asynchronous communication.',
    icon: 'fas fa-database',
  },
  {
    name: 'DevOps',
    text: 'Automating deployments and orchestrating containerized applications with Docker and Kubernetes, while leveraging Bash and Deno for scripting and DevOps workflows.',
    icon: 'fas fa-server',
  },
  {
    name: 'Tools',
    text: 'Enhancing development efficiency through expert use of tools like IntelliJ IDEA, Git, Jenkins for CI/CD pipelines, and Postman for testing and debugging APIs.',
    icon: 'fas fa-tools',
  },
  {
    name: 'Concepts',
    text: 'Driving software quality through clean code, agile practices (Scrum), and domain-driven design to effectively model complex business logic and ensure maintainability.',
    icon: 'fas fa-brain',
  },
];

export const skills: SkillItem[] = [
  {
    category: 'Development',
    specific: [
      { name: 'Java', barValue: 80, proficiency: 'Senior' },
      { name: 'TypeScript', barValue: 55, proficiency: 'Professional' },
      { name: 'SQL', barValue: 80, proficiency: 'Senior' },
      { name: 'Bash', barValue: 75, proficiency: 'Senior' },
      { name: 'Python', barValue: 25, proficiency: 'Junior' },
    ],
  },
  {
    category: 'Frameworks & Libs',
    specific: [
      { name: 'Spring Boot', barValue: 80, proficiency: 'Senior' },
      { name: 'Quarkus', barValue: 70, proficiency: 'Senior' },
      { name: 'Deno', barValue: 50, proficiency: 'Professional' },
      { name: 'Angular', barValue: 70, proficiency: 'Senior' },
      { name: 'Vue', barValue: 25, proficiency: 'Junior' },
      { name: 'React', barValue: 20, proficiency: 'Junior' },
      { name: 'CSS / SCSS', barValue: 50, proficiency: 'Professional' },
    ],
  },
  {
    category: 'Tools',
    specific: [
      { name: 'IntelliJ IDEA', barValue: 80, proficiency: 'Senior' },
      { name: 'VS Code', barValue: 70, proficiency: 'Senior' },
      { name: 'Git', barValue: 95, proficiency: 'Expert' },
      { name: 'Jenkins', barValue: 70, proficiency: 'Senior' },
      { name: 'Maven / npm', barValue: 75, proficiency: 'Senior' },
      { name: 'Gitlab CI', barValue: 50, proficiency: 'Professional' },
    ],
  },
  {
    category: 'Concepts',
    specific: [
      { name: 'Scrum', barValue: 80, proficiency: 'Senior' },
      { name: 'Kanban', barValue: 75, proficiency: 'Senior' },
      { name: 'Microservices', barValue: 75, proficiency: 'Senior' },
      { name: 'CI/CD', barValue: 75, proficiency: 'Senior' },
      {
        name: 'Domain Driven Design',
        barValue: 55,
        proficiency: 'Professional',
      },
      { name: 'Clean Code', barValue: 75, proficiency: 'Senior' },
    ],
  },
  {
    category: 'DB & Messaging',
    specific: [
      { name: 'MySQL / MariaDB', barValue: 80, proficiency: 'Senior' },
      { name: 'Postgres', barValue: 75, proficiency: 'Senior' },
      { name: 'MongoDB', barValue: 20, proficiency: 'Junior' },
      { name: 'RabbitMQ', barValue: 50, proficiency: 'Professional' },
    ],
  },
  {
    category: 'Infrastructure',
    specific: [
      {
        name: 'Kubernetes / k3s',
        barValue: 55,
        proficiency: 'Professional',
      },
      { name: 'Docker', barValue: 75, proficiency: 'Senior' },
      { name: 'Nginx', barValue: 70, proficiency: 'Senior' },
      { name: 'Keycloak', barValue: 50, proficiency: 'Professional' },
    ],
  },
];

export const stuff: string[] = [
  '11ty',
  'Affinity Designer',
  'ArchUnit',
  'Astro',
  'Bitbucket',
  'Cloud Foundry',
  'DBeaver',
  'Grafana',
  'Groovy',
  'Gulp',
  'JavaScript',
  'JIRA',
  'JPA',
  'JUnit',
  'Liquibase',
  'Markdown',
  'OAuth2',
  'PlantUML',
  'Postman',
  'Prometheus',
  'SonarQube',
];
