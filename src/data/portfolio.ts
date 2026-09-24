export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

export const personal = {
  name: "Beni Nurfauzi",
  title: "Software Engineer",
  subtitle: "Full-Stack Developer & Digital Transformation Specialist",
  location: "Jakarta, Indonesia",
  email: "beninf10@gmail.com",
  phone: "+62 895-066-84977",
  linkedin: "beni-nurfauzi",
  github: "beninfCRB",
  bio: "A highly driven Software Engineer with robust experience in full-stack web development and microservice architecture. Currently pursuing a Master's degree in Computer Science specializing in Digital Transformation Intelligence and enterprise architecture. Demonstrated success in leading the development of core public applications and large-scale cargo ERP systems.",
  tagline: "Building scalable digital solutions for the future",
};

export const skills: Skill[] = [
  { name: "React JS", level: 95, category: "Frontend" },
  { name: "Next JS", level: 90, category: "Frontend" },
  { name: "React Native", level: 85, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "Nest JS", level: 88, category: "Backend" },
  { name: "Express JS", level: 85, category: "Backend" },
  { name: "Adonis JS", level: 80, category: "Backend" },
  { name: "Laravel", level: 82, category: "Backend" },
  { name: "Codeigniter 3", level: 78, category: "Backend" },
  { name: "Docker", level: 85, category: "DevOps" },
  { name: "Git", level: 90, category: "DevOps" },
  { name: "PostgreSQL", level: 85, category: "Database" },
  { name: "Microservices", level: 88, category: "Architecture" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Badan Pengelola Dana Lingkungan Hidup",
    position: "IT Specialist",
    period: "2025 - 2026",
    description:
      "Developing core public applications and microservice ERP modules for environmental fund management.",
    achievements: [
      "Developed 1 core public application for Community Environmental Funds to drive the Zero Carbon by 2030 initiative",
      "Engineered 5 out of 18 microservice ERP modules for efficient internal data management and fund distribution",
    ],
  },
  {
    id: "2",
    company: "Fungsitama Cipta Teknologi, PT",
    position: "Fullstack Web Developer",
    period: "2022 - 2025",
    description:
      "Leading development and enhancement of cargo ERP applications and supporting systems.",
    achievements: [
      "Led the development and enhancement of 1 primary cargo ERP application and multiple supporting systems",
      "Efficiently managed and deployed new feature requests tailored to client needs",
    ],
  },
  {
    id: "3",
    company: "IT Services, PT",
    position: "Computer and Handphone Technician",
    period: "2022 - 2022",
    description:
      "Providing technical repair services for computer and mobile devices.",
    achievements: [
      "Achieved a 100% daily completion rate by successfully diagnosing and repairing 10 out of 10 incoming Asus devices per day",
      "Accurately reported damages and repair plans",
    ],
  },
  {
    id: "4",
    company: "Sekolah Tinggi Ilmu Komputer Poltek Cirebon",
    position: "Computer Lab Assistant",
    period: "2019 - 2021",
    description:
      "Supporting laboratory operations and assisting students in practical learning.",
    achievements: [
      "Taking attendance of students, assisting lecturers and students in practical learning",
      "Maintaining facilities and equipment in the laboratory",
      "Managing predetermined support schedules",
    ],
  },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "Universitas Amikom Yogyakarta",
    degree: "Master of Computer Science",
    period: "2025 - Present",
    description:
      "Specializing in Digital Transformation Intelligence. Studies focus on enterprise architecture design, digital transformation strategies, and the use of Business Intelligence to support data-driven decision-making at the managerial level.",
  },
  {
    id: "2",
    institution: "Sekolah Tinggi Ilmu Komputer Poltek Cirebon",
    degree: "Bachelor of Computer Science",
    period: "2017 - 2021",
    description:
      "Graduated with a GPA of 3.89/4.00. Served as a Computer Laboratory Assistant, honing technical skills in managing IT infrastructure, troubleshooting hardware and software issues, and guiding students through complex practical sessions.",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Layanan Dana Masyarakat",
    description:
      "Public application for Community Environmental Funds to drive the Zero Carbon by 2030 initiative, featuring microservice architecture and real-time data analytics.",
    technologies: ["React", "Nest JS", "Docker", "PostgreSQL", "Microservices"],
    github: "#",
    link: "https://layanan-dana-masyarakat.bpdlh.id/",
    image: "project-layanan-dana-masyarakat.png",
  },
  {
    id: "2",
    title: "Citra Niaga Logistik",
    description:
      "Large-scale cargo ERP application with 18 microservice modules for efficient logistics management and fund distribution.",
    technologies: ["Next.js", "Express JS", "Docker", "Redis", "MongoDB"],
    github: "#",
    link: "https://cnl.fcterp.com/signin",
    image: "project-citra-niaga-logistik.png",
  },
  {
    id: "3",
    title: "MIS BPDLH",
    description:
      "Internal ERP application for environmental fund management with role-based access control and audit trails.",
    technologies: ["React", "Laravel", "MySQL", "Docker"],
    github: "#",
    link: "#",
    image: "project-mis-bpdlh.png",
  },
  {
    id: "4",
    title: "Web Portofolio",
    description:
      "Personal portfolio website showcasing skills, experience, and projects with modern UI/UX.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "#",
    link: "#",
    image: "project-web-portofolio.png",
  },
];

export const techLogos = [
  "React",
  "Next.js",
  "TypeScript",
  "Nest.js",
  "Express.js",
  "Adonis.js",
  "Laravel",
  "Docker",
  "Git",
  "PostgreSQL",
  "Tailwind CSS",
  "React Native",
  "Codeigniter",
  "Redis",
  "Microservices",
];
