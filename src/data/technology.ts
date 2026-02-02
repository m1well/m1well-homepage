type StackItem = {
  name: string;
  text: string;
  icon: string;
  techs?: {
    link: string;
    name: string;
    src: string;
  }[];
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
    text: 'Architecting and building scalable backends with Spring Boot (Java & Kotlin), seamlessly integrated with modern Angular frontends to deliver responsive, intuitive, and high-performance user experiences.',
    icon: 'fas fa-code',
    techs: [
      {
        link: 'https://spring.io/projects/spring-boot',
        name: 'Spring Boot',
        src: '/techlogos/logo_springboot.png',
      },
      {
        link: 'https://www.java.com',
        name: 'Java',
        src: '/techlogos/logo_java.png',
      },
      {
        link: 'https://kotlinlang.org',
        name: 'Kotlin',
        src: '/techlogos/logo_kotlin.png',
      },
      {
        link: 'https://angular.dev',
        name: 'Angular',
        src: '/techlogos/logo_angular.png',
      },
    ],
  },
  {
    name: 'DB & Messaging',
    text: 'Designing efficient relational data models with PostgreSQL or MySQL and implementing scalable event-driven architectures using RabbitMQ or Kafka for reliable asynchronous system communication.',
    icon: 'fas fa-database',
    techs: [
      {
        link: 'https://www.postgresql.org',
        name: 'PostgreSQL',
        src: '/techlogos/logo_postgresql.png',
      },
      {
        link: 'https://www.mysql.com',
        name: 'MySQL',
        src: '/techlogos/logo_mysql.png',
      },
      {
        link: 'https://www.rabbitmq.com',
        name: 'RabbitMQ',
        src: '/techlogos/logo_rabbitmq.png',
      },
      {
        link: 'https://kafka.apache.org',
        name: 'Kafka',
        src: '/techlogos/logo_kafka.png',
      },
    ],
  },
  {
    name: 'DevOps',
    text: 'Orchestrating containerized applications with Docker and Kubernetes, streamlining delivery via automated CI/CD pipelines (e.g. Jenkins), and ensuring deep system observability through OpenTelemetry.',
    icon: 'fas fa-server',
    techs: [
      {
        link: 'https://www.docker.com',
        name: 'Docker',
        src: '/techlogos/logo_docker.png',
      },
      {
        link: 'https://kubernetes.io',
        name: 'Kubernetes',
        src: '/techlogos/logo_kubernetes.png',
      },
      {
        link: 'https://www.jenkins.io',
        name: 'Jenkins',
        src: '/techlogos/logo_jenkins.png',
      },
      {
        link: 'https://opentelemetry.io',
        name: 'OpenTelemetry',
        src: '/techlogos/logo_opentelemetry.png',
      },
    ],
  },
  {
    name: 'Tools',
    text: 'Maximizing developer productivity through expert mastery of IntelliJ IDEA and Git, leveraging advanced features for efficient version control, clean workflows, and rapid code maintenance.',
    icon: 'fas fa-tools',
    techs: [
      {
        link: 'https://www.jetbrains.com/idea',
        name: 'IntelliJ',
        src: '/techlogos/logo_intellij.png',
      },
      {
        link: 'https://git-scm.com/',
        name: 'Git',
        src: '/techlogos/logo_git.png',
      },
    ],
  },
  {
    name: 'Concepts',
    text: 'Ensuring long-term code quality through Clean Code principles and automated testing (JUnit, ArchUnit), while fostering efficient collaboration via established Scrum routines and a deep understanding of agile roles.',
    icon: 'fas fa-brain',
    techs: [
      {
        link: 'https://junit.org',
        name: 'JUnit',
        src: '/techlogos/logo_junit.png',
      },
      {
        link: 'https://www.archunit.org',
        name: 'ArchUnit',
        src: '/techlogos/logo_archunit.png',
      },
      {
        link: 'https://www.scrum.org',
        name: 'Scrum',
        src: '/techlogos/logo_scrum.png',
      },
    ],
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
      { name: 'IntelliJ IDEA', barValue: 85, proficiency: 'Senior' },
      { name: 'Git', barValue: 95, proficiency: 'Expert' },
      { name: 'Maven / gradle', barValue: 75, proficiency: 'Senior' },
      { name: 'npm', barValue: 70, proficiency: 'Senior' },
      { name: 'Jenkins', barValue: 55, proficiency: 'Professional' },
      { name: 'Gitlab CI', barValue: 50, proficiency: 'Professional' },
      { name: 'Github Actions', barValue: 50, proficiency: 'Professional' },
    ],
  },
  {
    category: 'Concepts',
    specific: [
      { name: 'Scrum', barValue: 85, proficiency: 'Senior' },
      { name: 'Kanban', barValue: 80, proficiency: 'Senior' },
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
      { name: 'PostgreSQL', barValue: 70, proficiency: 'Senior' },
      { name: 'MongoDB', barValue: 20, proficiency: 'Junior' },
      { name: 'RabbitMQ', barValue: 50, proficiency: 'Professional' },
      { name: 'Kafka', barValue: 20, proficiency: 'Junior' },
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
      { name: 'Docker', barValue: 85, proficiency: 'Senior' },
      { name: 'Nginx', barValue: 55, proficiency: 'Professional' },
      { name: 'Keycloak', barValue: 55, proficiency: 'Professional' },
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
  'Jacoco',
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
  'VS Code',
];
