export const personalInfo = {
  name: 'Ashray Kawalkar',
  phone: '+91 7972981992',
  email: '17ashraykawalkar@gmail.com',
  location: 'Ratnagiri, Maharashtra, India',
  linkedin: 'linkedin.com/in/ashray-kawalkar',
  linkedinUrl: 'https://linkedin.com/in/ashray-kawalkar',
  github: 'kawalkar-ashray',
  githubUrl: 'https://github.com/kawalkar-ashray',
  resume: '/Ashray Kawalkar CV.pdf',
  title: 'Java Developer',
  summary: 'Java Developer with hands-on experience in Core Java, Spring Boot, and backend development. Skilled in building REST APIs, implementing secure authentication, and working with relational databases. Eager to learn modern technologies and contribute to scalable enterprise applications.'
};

export const technicalSkills = {
  languages: ['Java', 'JavaScript'],
  frontend: ['HTML5', 'CSS3', 'JavaScript (ES6+)'],
  frameworks: ['Spring Boot', 'Spring MVC', 'Hibernate'],
  security: ['Spring Security', 'JWT Authentication'],
  databases: ['MySQL', 'PostgreSQL'],
  cloud: ['AWS (S3, RDS, Elastic Beanstalk)', 'Docker'],
  tools: ['Git', 'Postman', 'VS Code', 'Cursor'],
  softSkills: ['Problem Solving', 'Team Collaboration', 'Debugging & Logging', 'Project Leadership']
};

export const projects = [
  {
    title: 'Blog Application Backend',
    year: '2026',
    technologies: ['Spring Boot', 'PostgreSQL', 'Spring Data JPA', 'JWT', 'AWS'],
    description: [
      'Designed and developed RESTful APIs for blog management using Spring Boot, Spring Data JPA, and PostgreSQL.',
      'Implemented JWT-based authentication and role-based authorization using Spring Security.',
      'Integrated pagination, exception handling, and validation to improve API performance and maintainability.',
      'Deployed the application on AWS Elastic Beanstalk using Amazon RDS for database hosting.'
    ],
    github: 'https://github.com/kawalkar-ashray/blog-backend'
  },
  {
    title: 'Smart Tourism AI',
    year: '2026',
    technologies: ['Spring Boot', 'React', 'PostgreSQL', 'JWT', 'Gemini AI'],
    description: [
      'Developed a full-stack AI-powered travel planner using Spring Boot and React that generates personalized itineraries based on destination, budget, and user preferences.',
      'Implemented JWT authentication, integrated Gemini AI for itinerary generation, and built REST APIs with PostgreSQL to manage user trip history.'
    ],
    github: 'https://github.com/kawalkar-ashray/smart-tourism-ai'
  }
];

export const internships = [
  {
    title: 'Java & MySQL Training',
    organization: 'Symbiosis Skilling Center',
    location: 'Pune',
    date: 'Sept 2024',
    points: [
      'Gained hands-on experience in Java OOP concepts and backend development.',
      'Built mini applications integrating Java and MySQL.'
    ]
  },
  {
    title: 'Full Stack Web Development Intern',
    organization: 'Bharat Intern',
    location: 'Remote',
    date: 'Feb 2024',
    points: [
      'Worked on frontend development using HTML, CSS, JavaScript.',
      'Understood end-to-end application flow from UI to backend.'
    ]
  }
];

export const education = [
  {
    degree: 'B.E. Computer Engineering',
    institution: 'Rajendra Mane College of Engineering & Technology',
    location: 'Ratnagiri',
    duration: '2021 – 2025',
    score: 'SGPI: 7.09'
  },
  {
    degree: 'HSC (PCM)',
    institution: 'Namjoshi Junior College',
    location: 'Makhajan',
    duration: '2019 – 2021',
    score: '69.33%'
  },
  {
    degree: 'SSC',
    institution: 'Makhajan English School',
    location: 'Makhajan',
    duration: '2013 – 2019',
    score: '77.20%'
  }
];

export const certifications = [
  'Programming in Java – NPTEL (Ministry of Education, Govt. of India)',
  'Fundamentals of Java Programming – Board Infinity',
  'AWS Cloud & DevOps Workshop – Organized by RMCET'
];
