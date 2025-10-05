const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    email: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  };
  is_new_user: boolean;
}

interface User {
  id: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: string;
  author: string;
  name: string;
  description: string;
  slug: string;
  is_published: boolean;
  image: string;
  created_at: string;
  updated_at: string;
}

interface ProjectsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
}

const mockUser: User = {
  id: '01HZ8X9K2M3N4P5Q6R7S8T9U0V',
  phone_number: '998931159963',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  is_verified: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const mockProjects: Project[] = [
  {
    id: 'd24735f0-f1ac-4ef5-9ba8-13e23cd7c84b',
    author: 'b1b34e67-7437-47b6-938d-845744bf22a6',
    name: 'Express Backend',
    description: 'Express Framework yordamida backend yaratishni o\'rganing. Ushbu kursda siz REST API, ma\'lumotlar bazasi bilan ishlash va autentifikatsiyani o\'rganasiz.',
    slug: 'express-backend',
    is_published: true,
    image: 'https://picsum.photos/400/300?1',
    created_at: '2025-10-04T16:32:39.135091Z',
    updated_at: '2025-10-04T16:32:39.135098Z',
  },
  {
    id: 'd24735f0-f1ac-4ef5-9ba8-13e23cd7c84c',
    author: 'b1b34e67-7437-47b6-938d-845744bf22a6',
    name: 'React Frontend',
    description: 'React kutubxonasi yordamida zamonaviy web ilovalar yaratishni o\'rganing. Components, hooks, state management va boshqa muhim mavzularni o\'rganasiz.',
    slug: 'react-frontend',
    is_published: true,
    image: 'https://picsum.photos/400/300?2',
    created_at: '2025-10-03T16:32:39.135091Z',
    updated_at: '2025-10-03T16:32:39.135098Z',
  },
  {
    id: 'd24735f0-f1ac-4ef5-9ba8-13e23cd7c84d',
    author: 'b1b34e67-7437-47b6-938d-845744bf22a6',
    name: 'Node.js Asoslari',
    description: 'Node.js muhitida dasturlashni o\'rganing. File system, HTTP server, npm packages va asynchronous programmingni o\'rganasiz.',
    slug: 'nodejs-basics',
    is_published: true,
    image: 'https://picsum.photos/400/300?3',
    created_at: '2025-10-02T16:32:39.135091Z',
    updated_at: '2025-10-02T16:32:39.135098Z',
  },
  {
    id: 'd24735f0-f1ac-4ef5-9ba8-13e23cd7c84e',
    author: 'b1b34e67-7437-47b6-938d-845744bf22a6',
    name: 'TypeScript Pro',
    description: 'TypeScript bilan professional dasturlashni o\'rganing. Types, interfaces, generics va advanced TypeScript kontseptsiyalarini o\'zlashtirasiz.',
    slug: 'typescript-pro',
    is_published: true,
    image: 'https://picsum.photos/400/300?4',
    created_at: '2025-10-01T16:32:39.135091Z',
    updated_at: '2025-10-01T16:32:39.135098Z',
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async login(otp: string): Promise<LoginResponse> {
    await delay(1000);

    if (otp === '123456') {
      return {
        access_token: 'mock-access-token-' + Date.now(),
        refresh_token: 'mock-refresh-token-' + Date.now(),
        user: mockUser,
        is_new_user: false,
      };
    }

    throw new Error('Login failed');
  },

  async logout(token: string): Promise<void> {
    await delay(500);
    return;
  },

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    await delay(500);
    return {
      access_token: 'mock-access-token-' + Date.now(),
    };
  },

  async getProfile(token: string): Promise<User> {
    await delay(500);
    return mockUser;
  },

  async getProjects(token: string): Promise<ProjectsResponse> {
    await delay(800);
    return {
      count: mockProjects.length,
      next: null,
      previous: null,
      results: mockProjects,
    };
  },
};

export type { LoginResponse, User, Project, ProjectsResponse };
