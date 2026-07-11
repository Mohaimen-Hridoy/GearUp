export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "GearUp API",
    version: "1.0.0",
    description:
      "Sports & outdoor gear rental backend. Three roles: CUSTOMER, PROVIDER, ADMIN. All error responses use { success: false, message, errorDetails }.",
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
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string" },
          errorDetails: { nullable: true },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", enum: ["CUSTOMER", "PROVIDER", "ADMIN"] },
          status: { type: "string", enum: ["ACTIVE", "SUSPENDED"] },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password", "role"],
        properties: {
          name: { type: "string", example: "Rahim Uddin" },
          email: { type: "string", format: "email", example: "rahim@example.com" },
          password: { type: "string", minLength: 8, example: "12345678" },
          role: { type: "string", enum: ["CUSTOMER", "PROVIDER"], example: "CUSTOMER" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: { $ref: "#/components/schemas/User" },
            },
          },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          slug: { type: "string" },
        },
      },
      CategoryRequest: {
        type: "object",
        required: ["name", "slug"],
        properties: {
          name: { type: "string", example: "Camping" },
          slug: { type: "string", example: "camping" },
        },
      },
      GearItem: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string", nullable: true },
          brand: { type: "string" },
          pricePerDay: { type: "string", example: "250.00" },
          stock: { type: "integer" },
          isAvailable: { type: "boolean" },
          categoryId: { type: "string" },
          providerId: { type: "string" },
        },
      },
      GearCreateRequest: {
        type: "object",
        required: ["title", "brand", "categoryId", "pricePerDay", "stock"],
        properties: {
          title: { type: "string", example: "Camping Tent" },
          description: { type: "string", example: "4 person tent" },
          brand: { type: "string", example: "Decathlon" },
          categoryId: { type: "string" },
          pricePerDay: { type: "number", example: 250 },
          stock: { type: "integer", example: 5 },
          isAvailable: { type: "boolean", example: true },
        },
      },
      RentalOrder: {
        type: "object",
        properties: {
          id: { type: "string" },
          customerId: { type: "string" },
          gearItemId: { type: "string" },
          startDate: { type: "string", format: "date-time" },
          endDate: { type: "string", format: "date-time" },
          totalPrice: { type: "string", example: "1200.00" },
          status: {
            type: "string",
            enum: ["PLACED", "CONFIRMED", "CANCELLED", "PAID", "PICKED_UP", "RETURNED"],
          },
        },
      },
      RentalCreateRequest: {
        type: "object",
        required: ["gearItemId", "startDate", "endDate"],
        properties: {
          gearItemId: { type: "string" },
          startDate: { type: "string", format: "date-time" },
          endDate: { type: "string", format: "date-time" },
        },
      },
      RentalStatusUpdateRequest: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            enum: ["CONFIRMED", "CANCELLED", "PICKED_UP", "RETURNED"],
          },
        },
      },
      Payment: {
        type: "object",
        properties: {
          id: { type: "string" },
          transactionId: { type: "string" },
          rentalOrderId: { type: "string" },
          amount: { type: "string" },
          provider: { type: "string", example: "stripe" },
          status: { type: "string", enum: ["PENDING", "COMPLETED", "FAILED"] },
          paymentIntentId: { type: "string", nullable: true },
          paidAt: { type: "string", format: "date-time", nullable: true },
        },
      },
      PaymentCreateRequest: {
        type: "object",
        required: ["rentalOrderId"],
        properties: {
          rentalOrderId: { type: "string" },
        },
      },
      PaymentConfirmRequest: {
        type: "object",
        required: ["paymentIntentId"],
        properties: {
          rentalOrderId: { type: "string" },
          transactionId: { type: "string" },
          paymentIntentId: { type: "string" },
        },
      },
      Review: {
        type: "object",
        properties: {
          id: { type: "string" },
          gearItemId: { type: "string" },
          customerId: { type: "string" },
          rating: { type: "integer", minimum: 1, maximum: 5 },
          comment: { type: "string", nullable: true },
        },
      },
      ReviewCreateRequest: {
        type: "object",
        required: ["gearItemId", "rating"],
        properties: {
          gearItemId: { type: "string" },
          rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
          comment: { type: "string", example: "Very good gear" },
        },
      },
      UserStatusUpdateRequest: {
        type: "object",
        required: ["status"],
        properties: {
          status: { type: "string", enum: ["ACTIVE", "SUSPENDED"] },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user (customer or provider)",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterRequest" } } },
        },
        responses: {
          "201": { description: "User registered", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
          "400": { description: "Validation failed", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          "409": { description: "Email already registered", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login and receive a JWT",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } },
        },
        responses: {
          "200": { description: "Login successful", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
          "401": { description: "Invalid credentials", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current authenticated user",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Current user", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          "401": { description: "Missing or invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all gear categories",
        responses: { "200": { description: "Category list", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Category" } } } } } },
      },
      post: {
        tags: ["Categories"],
        summary: "Create category (Admin only)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryRequest" } } } },
        responses: {
          "201": { description: "Category created", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
          "403": { description: "Forbidden - admin only", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/gear": {
      get: {
        tags: ["Gear"],
        summary: "Get all gear (public, filterable by category/price/brand)",
        parameters: [
          { name: "categoryId", in: "query", schema: { type: "string" } },
          { name: "brand", in: "query", schema: { type: "string" } },
          { name: "minPrice", in: "query", schema: { type: "number" } },
          { name: "maxPrice", in: "query", schema: { type: "number" } },
        ],
        responses: { "200": { description: "Gear list", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/GearItem" } } } } } },
      },
      post: {
        tags: ["Gear"],
        summary: "Add gear to inventory (Provider only)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/GearCreateRequest" } } } },
        responses: {
          "201": { description: "Gear created", content: { "application/json": { schema: { $ref: "#/components/schemas/GearItem" } } } },
          "403": { description: "Forbidden - provider only", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/provider/gear": {
      get: { tags: ["Gear"], summary: "Alias of GET /gear", responses: { "200": { description: "Gear list" } } },
      post: {
        tags: ["Gear"],
        summary: "Alias of POST /gear (Provider only)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/GearCreateRequest" } } } },
        responses: { "201": { description: "Gear created" } },
      },
    },
    "/gear/{id}": {
      get: {
        tags: ["Gear"],
        summary: "Get gear details by id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "Gear details", content: { "application/json": { schema: { $ref: "#/components/schemas/GearItem" } } } },
          "404": { description: "Gear not found", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
      put: {
        tags: ["Gear"],
        summary: "Update gear listing (owning Provider only)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/GearCreateRequest" } } } },
        responses: { "200": { description: "Gear updated" } },
      },
      delete: {
        tags: ["Gear"],
        summary: "Remove gear from inventory (owning Provider only)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Gear deleted" } },
      },
    },
    "/provider/gear/{id}": {
      get: { tags: ["Gear"], summary: "Alias of GET /gear/{id}", parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { "200": { description: "Gear details" } } },
      put: { tags: ["Gear"], summary: "Alias of PUT /gear/{id}", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { "200": { description: "Gear updated" } } },
      delete: { tags: ["Gear"], summary: "Alias of DELETE /gear/{id}", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { "200": { description: "Gear deleted" } } },
    },
    "/rentals": {
      get: {
        tags: ["Rentals"],
        summary: "Get rental orders (scoped by role)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Rental list", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/RentalOrder" } } } } } },
      },
      post: {
        tags: ["Rentals"],
        summary: "Create rental order (Customer only)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/RentalCreateRequest" } } } },
        responses: {
          "201": { description: "Rental created", content: { "application/json": { schema: { $ref: "#/components/schemas/RentalOrder" } } } },
          "400": { description: "Gear unavailable / validation failed", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/provider/orders": {
      get: { tags: ["Rentals"], summary: "Alias of GET /rentals", security: [{ bearerAuth: [] }], responses: { "200": { description: "Rental list" } } },
    },
    "/rentals/{id}": {
      get: {
        tags: ["Rentals"],
        summary: "Get rental order details",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Rental details" }, "404": { description: "Not found" } },
      },
      patch: {
        tags: ["Rentals"],
        summary: "Update rental order status (owning Provider only)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/RentalStatusUpdateRequest" } } } },
        responses: { "200": { description: "Status updated" }, "403": { description: "Forbidden" } },
      },
    },
    "/provider/orders/{id}": {
      get: { tags: ["Rentals"], summary: "Alias of GET /rentals/{id}", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { "200": { description: "Rental details" } } },
      patch: { tags: ["Rentals"], summary: "Alias of PATCH /rentals/{id}", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/RentalStatusUpdateRequest" } } } }, responses: { "200": { description: "Status updated" } } },
    },
    "/payments/create": {
      post: {
        tags: ["Payments"],
        summary: "Create a Stripe payment intent for a rental order (Customer only)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentCreateRequest" } } } },
        responses: {
          "201": { description: "Payment intent created", content: { "application/json": { schema: { $ref: "#/components/schemas/Payment" } } } },
          "500": { description: "Stripe not configured on the server", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/payments/confirm": {
      post: {
        tags: ["Payments"],
        summary: "Confirm a Stripe payment intent and mark the order PAID",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/PaymentConfirmRequest" } } } },
        responses: {
          "200": { description: "Payment confirmed", content: { "application/json": { schema: { $ref: "#/components/schemas/Payment" } } } },
          "400": { description: "Payment intent not yet successful", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/payments": {
      get: {
        tags: ["Payments"],
        summary: "Get payment history (scoped by role)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Payment list", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Payment" } } } } } },
      },
    },
    "/payments/{id}": {
      get: {
        tags: ["Payments"],
        summary: "Get payment details by id",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Payment details", content: { "application/json": { schema: { $ref: "#/components/schemas/Payment" } } } }, "403": { description: "Forbidden" } },
      },
    },
    "/reviews": {
      post: {
        tags: ["Reviews"],
        summary: "Create a review for gear that has been returned (Customer only)",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ReviewCreateRequest" } } } },
        responses: {
          "201": { description: "Review created", content: { "application/json": { schema: { $ref: "#/components/schemas/Review" } } } },
          "400": { description: "No returned rental found for this gear", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
        },
      },
    },
    "/admin/users": {
      get: {
        tags: ["Admin"],
        summary: "Get all users (Admin only)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "User list", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/User" } } } } } },
      },
    },
    "/admin/users/{id}": {
      patch: {
        tags: ["Admin"],
        summary: "Suspend or activate a user (Admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UserStatusUpdateRequest" } } } },
        responses: { "200": { description: "User status updated", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } } },
      },
    },
    "/admin/gear": {
      get: {
        tags: ["Admin"],
        summary: "Get all gear listings (Admin only)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Gear list", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/GearItem" } } } } } },
      },
    },
    "/admin/rentals": {
      get: {
        tags: ["Admin"],
        summary: "Get all rental orders (Admin only)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Rental list", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/RentalOrder" } } } } } },
      },
    },
    "/docs": {
      get: {
        tags: ["Docs"],
        summary: "Get this OpenAPI specification as JSON",
        responses: { "200": { description: "OpenAPI spec" } },
      },
    },
  },
} as const;
