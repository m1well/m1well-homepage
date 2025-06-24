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
    text: 'Building backend systems with Spring Boot using Java & Kotlin, Spring Cloud and modern microservice patterns, paired with intuitive Angular frontends for responsive and user-friendly applications.',
    icon: 'fas fa-code',
  },
  {
    name: 'DB & Messaging',
    text: 'Designing clean data models with Postgres and MySQL and implementing event- and message-driven integrations using RabbitMQ or Kafka for scalable, asynchronous system communication.',
    icon: 'fas fa-database',
  },
  {
    name: 'DevOps',
    text: 'Delivering and operating applications efficiently through CI/CD pipelines (GitLab CI, Jenkins), container orchestration with Docker and Kubernetes, and automation via Bash or lightweight scripting.',
    icon: 'fas fa-server',
  },
  {
    name: 'Tools',
    text: 'Boosting productivity through expert use of IntelliJ IDEA, Git, GitLab/Jenkins pipelines, Postman, and modern debugging and profiling tools - always with a focus on clean workflows and maintainability.',
    icon: 'fas fa-tools',
  },
  {
    name: 'Concepts',
    text: 'Ensuring long-term quality through Clean Code, automated testing (JUnit, ArchUnit), agile collaboration (Scrum), and domain-driven thinking to model complex business logic effectively.',
    icon: 'fas fa-brain',
  },
];

export const skills: SkillItem[] = [
  {
    category: 'Development',
    specific: [
      { name: 'Java', barValue: 80, proficiency: 'Senior' },
      { name: 'TypeScript', barValue: 55, proficiency: 'Professional' },
      { name: 'Kotlin', barValue: 50, proficiency: 'Professional' },
      { name: 'SQL', barValue: 80, proficiency: 'Senior' },
      { name: 'Bash', barValue: 75, proficiency: 'Senior' },
      { name: 'Python', barValue: 20, proficiency: 'Junior' },
    ],
  },
  {
    category: 'Frameworks & Libs',
    specific: [
      { name: 'Spring Boot', barValue: 80, proficiency: 'Senior' },
      { name: 'Quarkus', barValue: 70, proficiency: 'Senior' },
      { name: 'Deno', barValue: 50, proficiency: 'Professional' },
      { name: 'Spring AI', barValue: 25, proficiency: 'Junior' },
      { name: 'Angular', barValue: 70, proficiency: 'Senior' },
      { name: 'Vue', barValue: 25, proficiency: 'Junior' },
      { name: 'CSS / SCSS', barValue: 50, proficiency: 'Professional' },
    ],
  },
  {
    category: 'Tools',
    specific: [
      { name: 'IntelliJ IDEA', barValue: 80, proficiency: 'Senior' },
      { name: 'VS Code', barValue: 70, proficiency: 'Senior' },
      { name: 'Git', barValue: 95, proficiency: 'Expert' },
      { name: 'Maven / npm', barValue: 75, proficiency: 'Senior' },
      { name: 'Jenkins', barValue: 55, proficiency: 'Professional' },
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
      { name: 'Kafka', barValue: 25, proficiency: 'Junior' },
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
      { name: 'Nginx', barValue: 55, proficiency: 'Professional' },
      { name: 'Keycloak', barValue: 50, proficiency: 'Professional' },
      { name: 'OpenTelemetry', barValue: 50, proficiency: 'Professional' },
    ],
  },
];

export const stuff: string[] = [
  'Affinity Designer',
  'ArchUnit',
  'Astro',
  'Bitbucket',
  'Cloud Foundry',
  'DBeaver',
  'devcontainers',
  'Grafana',
  'Groovy',
  'Gulp',
  'JasperReports',
  'JavaScript',
  'JIRA',
  'JPA',
  'JUnit',
  'Liquibase',
  'Markdown',
  'Nx',
  'OAuth2',
  'PlantUML',
  'Postman',
  'Prometheus',
  'SonarQube',
];
