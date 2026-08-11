const MOCK_USERS = [
  {
    id: 1,
    name: "Betaham Y.",
    email: "admin@abrohub.com",
    role: "admin",
    status: "active",
    joined: "Jan 2025",
  },
  {
    id: 2,
    name: "Sara K.",
    email: "sara@example.com",
    role: "user",
    status: "active",
    joined: "Mar 2025",
  },
  {
    id: 3,
    name: "Dawit M.",
    email: "dawit@example.com",
    role: "user",
    status: "suspended",
    joined: "Jun 2025",
  },
];

import client from "../api/client";

export const userService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_USERS;
  },

  updateRole: async (userId, role) => {
    await new Promise((r) => setTimeout(r, 300));
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) user.role = role;
    return user;
  },

  updateStatus: async (userId, status) => {
    await new Promise((r) => setTimeout(r, 300));
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) user.status = status;
    return user;
  },

  updateProfile: async (userId, profileData) => {
    const response = await client.put(`/users/${userId}`, profileData);
    return response.data;
  },
};
