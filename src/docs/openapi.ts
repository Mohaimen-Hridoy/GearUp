export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "GearUp API",
    version: "1.0.0",
    description: "OpenAPI documentation for the GearUp backend assignment.",
  },
  servers: [{ url: "/api" }],
  tags: [
    { name: "Auth" },
    { name: "Categories" },
    { name: "Gear" },
    { name: "Rentals" },
    { name: "Payments" },
    { name: "Reviews" },
    { name: "Admin" },
    { name: "Docs" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/auth/register": {
      post: { tags: ["Auth"], summary: "Register a new user" },
    },
    "/auth/login": {
      post: { tags: ["Auth"], summary: "Login user" },
    },
    "/auth/me": {
      get: { tags: ["Auth"], summary: "Get current user", security: [{ bearerAuth: [] }] },
    },
    "/categories": {
      get: { tags: ["Categories"], summary: "Get all categories" },
      post: {
        tags: ["Categories"],
        summary: "Create category",
        security: [{ bearerAuth: [] }],
      },
    },
    "/gear": {
      get: { tags: ["Gear"], summary: "Get all gear with filters" },
      post: { tags: ["Gear"], summary: "Create gear", security: [{ bearerAuth: [] }] },
    },
    "/gear/{id}": {
      get: { tags: ["Gear"], summary: "Get gear by id" },
      put: { tags: ["Gear"], summary: "Update gear", security: [{ bearerAuth: [] }] },
      delete: { tags: ["Gear"], summary: "Delete gear", security: [{ bearerAuth: [] }] },
    },
    "/rentals": {
      get: { tags: ["Rentals"], summary: "Get rentals" },
      post: { tags: ["Rentals"], summary: "Create rental", security: [{ bearerAuth: [] }] },
    },
    "/rentals/{id}": {
      get: { tags: ["Rentals"], summary: "Get rental by id", security: [{ bearerAuth: [] }] },
      patch: { tags: ["Rentals"], summary: "Update rental status", security: [{ bearerAuth: [] }] },
    },
    "/payments/create": {
      post: { tags: ["Payments"], summary: "Create payment intent/session", security: [{ bearerAuth: [] }] },
    },
    "/payments/confirm": {
      post: { tags: ["Payments"], summary: "Confirm payment", security: [{ bearerAuth: [] }] },
    },
    "/payments": {
      get: { tags: ["Payments"], summary: "Get payment history", security: [{ bearerAuth: [] }] },
    },
    "/payments/{id}": {
      get: { tags: ["Payments"], summary: "Get payment details", security: [{ bearerAuth: [] }] },
    },
    "/reviews": {
      post: { tags: ["Reviews"], summary: "Create review", security: [{ bearerAuth: [] }] },
    },
    "/admin/users": {
      get: { tags: ["Admin"], summary: "Get all users", security: [{ bearerAuth: [] }] },
    },
    "/admin/users/{id}": {
      patch: { tags: ["Admin"], summary: "Update user status", security: [{ bearerAuth: [] }] },
    },
    "/admin/gear": {
      get: { tags: ["Admin"], summary: "Get all gear", security: [{ bearerAuth: [] }] },
    },
    "/admin/rentals": {
      get: { tags: ["Admin"], summary: "Get all rentals", security: [{ bearerAuth: [] }] },
    },
    "/docs": {
      get: { tags: ["Docs"], summary: "Get OpenAPI specification" },
    },
  },
} as const;