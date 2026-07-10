# Assignment 4 - Backend Project

## 🔍 Find Your Assignment

> 💡 Check your Student ID by clicking your **profile image** on the [Programming Hero Website](https://web.programming-hero.com/profile).

| Last Digit of Student ID | Assignment |
|:------------------------:|------------|
| **0, 1, 2, 3** | [RentNest](./1-RentNest.md) 🏠 |
| **4, 5, 6** | [GearUp](./2-GearUp.md) 🏋️ |
| **7, 8, 9** | [FixItNow](./3-FixItNow.md) 🔧 |

---

## ⚠️ Mandatory Requirements

> [!CAUTION]
> **MANDATORY - READ CAREFULLY**
> 
> The following **SIX requirements are MANDATORY**:
> 1. **API Documentation** - Provide Postman collection or Swagger/OpenAPI docs covering all endpoints
> 2. **Consistent Error Responses** - All errors must return structured JSON (`{ success, message, errorDetails }`)
> 3. **Commits** - 20 meaningful backend commits with descriptive messages
> 4. **Input Validation** - Server-side validation on all endpoints with proper error messages
> 5. **Admin Credentials** - Provide working admin email & password
> 6. **Payment Integration** - Must integrate **Stripe** or **SSLCommerz** for processing payments. Simulated/fake payments (Cash on Delivery, Pay Later) are **NOT** accepted.
>
> ❌ **Failure to complete any of these = 0 MARKS**

---

## 📊 Marks Distribution

| # | Category | Weight | Details |
|:-:|----------|:------:|---------|
| 1 | API Design & Documentation | 20% | RESTful endpoints, Postman/Swagger docs, response format |
| 2 | Database Design & Schema | 20% | Prisma schema, relations, migrations, seed script |
| 3 | Commit History | 10% | 20 meaningful backend commits |
| 4 | Error Handling & Validation | 10% | Input validation, structured error responses, 404 handling |
| 5 | Core Functionality | 20% | Auth, CRUD, role-based access, middleware |
| 6 | Payment Integration | 10% | Stripe or SSLCommerz integration, payment endpoints, payment status tracking |
| 7 | Video Explanation | 10% | 3-5 min API walkthrough video |

---

## 📅 Timeline

| Deadline | Maximum Marks |
|----------|:-------------:|
| **July 09, 2026, 11:59 PM** | 60 Marks |
| **July 10, 2026, 11:59 PM** | 50 Marks |
| **From July 11, 2026 To July 31, 2026, 11:59 PM** | 30 Marks |

---

## 📦 What to Submit

| Item | Required |
|------|:--------:|
| Backend GitHub Repo | ✅ |
| Live API URL | ✅ |
| API Documentation (Postman/Swagger) | ✅ |
| Demo Video (3-5 min) | ✅ |
| Admin Credentials | ✅ |

**Example:**
```
Backend Repo     : https://github.com/your-username/rentnest-backend
Live API         : https://rentnest-api.vercel.app
API Docs         : https://documenter.getpostman.com/view/xxx
Demo Video       : https://drive.google.com/file/d/xxx/view
Admin Email      : admin@rentnest.com
Admin Password   : admin123
```

---

## 🎥 Video Explanation Guide

**Duration:** 3-5 minutes | **Language:** English or Bengali

**What to Cover:**
1. Project overview & API architecture
2. Demonstrate all 3 roles working via Postman/Thunder Client (Customer/Tenant, Provider/Landlord/Technician, Admin)
3. Show CRUD operations on key endpoints
4. Demonstrate error handling & validation in action
5. Briefly explain one technical challenge you solved

**Recording Options:**
- **Loom** - Record & share link directly
- **OBS** - Record & upload to Google Drive (set "Anyone with link" access)

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API |
| TypeScript | Type safety (recommended) |
| Postgres + Prisma | Database + ORM |
| JWT | Authentication |

### Deployment
| Service | Purpose |
|---------|---------| 
| Vercel/Render | Backend API deployment |

---

## 🎯 Key Rules

- **Roles**: Each project has 3 fixed roles. Users select during registration.
- **Payment**: Payment integration is **MANDATORY**. You must integrate either **Stripe** or **SSLCommerz** for processing payments. Include endpoints for creating payment intents/sessions, handling payment confirmations, and tracking payment status.
- **No Frontend Required**: This is a backend-only assignment. Test your API via Postman/Thunder Client.
- **Flexibility**: Endpoints listed in each variant are examples. Modify as needed.

---

## ⚠️ Important Notes

> **Plagiarism** = 0 Marks. All work must be original.

**Good luck! Build a rock-solid backend you're proud of.** 🚀

---

## ⚙️ GearUp Backend Starter (ID last digit 6)

This repository now includes a complete starter backend for the **GearUp** variant with:
- Express + TypeScript setup
- Prisma schema (Users, Categories, GearItems, RentalOrders, Payments, Reviews)
- JWT auth with role guards (Customer, Provider, Admin)
- Validation + consistent error response format (`{ success, message, errorDetails }`)
- Payment-ready endpoints (`/api/payments/create`, `/api/payments/confirm`)
- OpenAPI docs endpoint (`/api/docs`)
- Prisma seed script for admin credentials and starter categories

### Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   copy .env.example .env
   ```
3. Set your database and auth credentials in `.env`.
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Run migration:
   ```bash
   npm run prisma:migrate
   ```
6. Start development server:
   ```bash
   npm run dev
   ```

### Seed Admin Credentials

Run the seed script after setting your database connection:

```bash
npm run prisma:seed
```

Default seeded admin:

```text
Admin Email    : admin@gearup.com
Admin Password  : Admin@12345
```

### API Docs

OpenAPI JSON is available at:

```text
/api/docs
```

### Thunder Client Test Flow

Use this sequence in Thunder Client with `http://localhost:5000/api` as the base URL:

1. `POST /auth/login` as admin
2. `POST /auth/register` as provider
3. `POST /auth/register` as customer
4. `POST /categories` as admin
5. `POST /provider/gear` as provider
6. `GET /gear`
7. `POST /rentals` as customer
8. `PATCH /provider/orders/:id` as provider with `CONFIRMED`
9. `POST /payments/create` as customer
10. `POST /payments/confirm` as customer
11. `PATCH /provider/orders/:id` as provider with `PICKED_UP`
12. `PATCH /provider/orders/:id` as provider with `RETURNED`
13. `POST /reviews` as customer
14. `GET /admin/users`
15. `GET /admin/gear`
16. `GET /admin/rentals`
17. `GET /docs`

Save the returned IDs in order:

- `ADMIN_TOKEN`
- `PROVIDER_TOKEN`
- `CUSTOMER_TOKEN`
- `CATEGORY_ID`
- `GEAR_ID`
- `RENTAL_ORDER_ID`
- `PAYMENT_ID`
- `PAYMENT_INTENT_ID`

### Thunder Client Setup

Use these shared values in every request:

- Base URL: `http://localhost:5000/api`
- `Content-Type: application/json`
- Protected routes: `Authorization: Bearer <TOKEN>`

Save these IDs as you test:

- `ADMIN_TOKEN`
- `PROVIDER_TOKEN`
- `CUSTOMER_TOKEN`
- `CATEGORY_ID`
- `GEAR_ID`
- `RENTAL_ORDER_ID`
- `PAYMENT_ID`
- `PAYMENT_INTENT_ID`

### Thunder Client Auth Flow

1. `POST /auth/login`

Admin input:

```json
{
   "email": "admin@gearup.com",
   "password": "Admin@12345"
}
```

Expected output:

```json
{
   "success": true,
   "message": "Login successful",
   "data": {
      "token": "JWT_TOKEN",
      "user": {
         "id": "ADMIN_ID",
         "name": "GearUp Admin",
         "email": "admin@gearup.com",
         "role": "ADMIN",
         "status": "ACTIVE"
      }
   }
}
```

2. `POST /auth/register`

Provider input:

```json
{
   "name": "Shawon",
   "email": "shawon@example.com",
   "password": "12345678",
   "role": "PROVIDER"
}
```

Customer input:

```json
{
   "name": "Rahim Uddin",
   "email": "rahim@example.com",
   "password": "12345678",
   "role": "CUSTOMER"
}
```

Expected output:

```json
{
   "success": true,
   "message": "Registration successful",
   "data": {
      "user": {
         "id": "USER_ID",
         "name": "...",
         "email": "...",
         "role": "PROVIDER",
         "status": "ACTIVE"
      },
      "token": "JWT_TOKEN"
   }
}
```

### Thunder Client Category And Gear Flow

1. `POST /categories`

Admin input:

```json
{
   "name": "Camping",
   "slug": "camping"
}
```

Expected output:

```json
{
   "success": true,
   "message": "Category created successfully",
   "data": {
      "id": "CATEGORY_ID",
      "name": "Camping",
      "slug": "camping"
   }
}
```

2. `POST /provider/gear`

Provider input:

```json
{
   "title": "Camping Tent",
   "description": "4 person tent",
   "brand": "Decathlon",
   "categoryId": "CATEGORY_ID",
   "pricePerDay": 250,
   "stock": 5,
   "isAvailable": true
}
```

Expected output:

```json
{
   "success": true,
   "message": "Gear created successfully",
   "data": {
      "id": "GEAR_ID",
      "title": "Camping Tent",
      "brand": "Decathlon",
      "categoryId": "CATEGORY_ID"
   }
}
```

3. `GET /gear`

Expected output:

```json
{
   "success": true,
   "message": "Gear list retrieved successfully",
   "data": [
      {
         "id": "GEAR_ID",
         "title": "Camping Tent",
         "brand": "Decathlon"
      }
   ]
}
```

4. `GET /gear/:id`

Example:

```text
GET /gear/GEAR_ID
```

Expected output:

```json
{
   "success": true,
   "message": "Gear details retrieved successfully",
   "data": {
      "id": "GEAR_ID",
      "title": "Camping Tent",
      "category": {
         "id": "CATEGORY_ID",
         "name": "Camping"
      }
   }
}
```

### Thunder Client Rental And Payment Flow

1. `POST /rentals`

Customer input:

```json
{
   "gearItemId": "GEAR_ID",
   "startDate": "2026-07-12T10:00:00.000Z",
   "endDate": "2026-07-15T10:00:00.000Z"
}
```

Expected output:

```json
{
   "success": true,
   "message": "Rental order created successfully",
   "data": {
      "id": "RENTAL_ORDER_ID",
      "status": "PLACED",
      "totalPrice": "1200.00"
   }
}
```

2. `PATCH /provider/orders/:id` with `CONFIRMED`

Provider input:

```json
{
   "status": "CONFIRMED"
}
```

Expected output:

```json
{
   "success": true,
   "message": "Rental order status updated successfully",
   "data": {
      "id": "RENTAL_ORDER_ID",
      "status": "CONFIRMED"
   }
}
```

3. `POST /payments/create`

Customer input:

```json
{
   "rentalOrderId": "RENTAL_ORDER_ID"
}
```

Expected output:

```json
{
   "success": true,
   "message": "Payment created successfully",
   "data": {
      "payment": {
         "id": "PAYMENT_ID",
         "rentalOrderId": "RENTAL_ORDER_ID",
         "status": "PENDING",
         "paymentIntentId": "PAYMENT_INTENT_ID"
      },
      "clientSecret": "...",
      "isGatewayConfigured": true
   }
}
```

4. `POST /payments/confirm`

Customer input:

```json
{
   "rentalOrderId": "RENTAL_ORDER_ID",
   "paymentIntentId": "PAYMENT_INTENT_ID"
}
```

Expected output:

```json
{
   "success": true,
   "message": "Payment confirmed successfully",
   "data": {
      "id": "PAYMENT_ID",
      "status": "COMPLETED",
      "paidAt": "..."
   }
}
```

### Thunder Client Admin Review And Error Flow

1. `POST /reviews`

Customer input:

```json
{
   "gearItemId": "GEAR_ID",
   "rating": 5,
   "comment": "Very good gear"
}
```

Expected output:

```json
{
   "success": true,
   "message": "Review created successfully",
   "data": {
      "id": "REVIEW_ID",
      "rating": 5,
      "comment": "Very good gear"
   }
}
```

2. `GET /admin/users`

Expected output:

```json
{
   "success": true,
   "message": "Users retrieved successfully",
   "data": []
}
```

3. `PATCH /admin/users/:id`

Admin input:

```json
{
   "status": "SUSPENDED"
}
```

Expected output:

```json
{
   "success": true,
   "message": "User status updated successfully",
   "data": {
      "id": "CUSTOMER_ID",
      "status": "SUSPENDED"
   }
}
```

4. `GET /admin/gear`

Expected output:

```json
{
   "success": true,
   "message": "All gear retrieved successfully",
   "data": []
}
```

5. `GET /admin/rentals`

Expected output:

```json
{
   "success": true,
   "message": "All rental orders retrieved successfully",
   "data": []
}
```

6. Error response pattern

```json
{
   "success": false,
   "message": "Validation failed",
   "errorDetails": [
      {
         "path": "body.email",
         "message": "Valid email is required"
      }
   ]
}
```

### Thunder Client Status Guide

- `200`: successful read or update
- `201`: successful create
- `400`: invalid input or validation failure
- `401`: missing or invalid token
- `403`: forbidden by role or ownership
- `404`: resource not found
- `409`: duplicate or conflict

### Thunder Client Troubleshooting

- If admin login fails, rerun `npm run prisma:seed` and verify the `DATABASE_URL` points to the correct database.
- If provider gear create fails with `Category not found`, use the category `id` from `POST /categories`, not the slug.
- If gear detail requests fail with invalid id format, use the returned gear `id` exactly as saved.
- If payment create fails, confirm the rental order first and make sure you are using the customer's token.
- If review creation fails, return the gear first and then retry the review request.

### Endpoint Quick Reference

| Area | Method | Path |
|---|---|---|
| Auth | POST | `/auth/login` |
| Auth | POST | `/auth/register` |
| Auth | GET | `/auth/me` |
| Categories | GET | `/categories` |
| Categories | POST | `/categories` |
| Gear | GET | `/gear` |
| Gear | POST | `/provider/gear` |
| Gear | GET | `/gear/:id` |
| Gear | PUT | `/provider/gear/:id` |
| Gear | DELETE | `/provider/gear/:id` |
| Rentals | POST | `/rentals` |
| Rentals | GET | `/rentals` |
| Rentals | GET | `/provider/orders` |
| Rentals | PATCH | `/provider/orders/:id` |
| Payments | POST | `/payments/create` |
| Payments | POST | `/payments/confirm` |
| Payments | GET | `/payments` |
| Reviews | POST | `/reviews` |
| Admin | GET | `/admin/users` |
| Admin | PATCH | `/admin/users/:id` |
| Admin | GET | `/admin/gear` |
| Admin | GET | `/admin/rentals` |

### Role Matrix

| Role | What to test |
|---|---|
| Customer | rental creation, payment, review, own payment history |
| Provider | gear CRUD, rental status updates |
| Admin | category create, user management, admin views |

### End To End Checklist

1. Seed the database.
2. Login as admin.
3. Register provider and customer.
4. Create category.
5. Create gear.
6. Create rental.
7. Confirm rental.
8. Create payment.
9. Confirm payment.
10. Mark gear picked up.
11. Mark gear returned.
12. Create review.
13. Verify admin views.

### Saved Value Map

| Step | Save This |
|---|---|
| Login | `ADMIN_TOKEN`, `PROVIDER_TOKEN`, `CUSTOMER_TOKEN` |
| Category create | `CATEGORY_ID` |
| Gear create | `GEAR_ID` |
| Rental create | `RENTAL_ORDER_ID` |
| Payment create | `PAYMENT_ID`, `PAYMENT_INTENT_ID` |
| Review create | no new id required for next step |

### Environment Checklist

- `DATABASE_URL` points to the database you are testing.
- `JWT_SECRET` is set.
- `npm run prisma:seed` has been executed.
- Admin login uses `admin@gearup.com` and `Admin@12345`.
- The app is running on the expected local port.

### Success Response Pattern

Successful requests usually look like this:

```json
{
   "success": true,
   "message": "...",
   "data": {}
}
```

The exact `data` shape changes by endpoint, but `success` should always be `true`.

### Request Body Notes

- Use JSON for every write request.
- `categoryId`, `gearItemId`, `rentalOrderId`, and `paymentIntentId` must be the saved IDs from earlier responses.
- `pricePerDay`, `stock`, and `rating` should be sent as numbers.
- `startDate` and `endDate` should be ISO strings.
- Do not send a slug where an ID is required.

### Submission Checklist

- Confirm the API builds with `npm run build`.
- Seed the database with `npm run prisma:seed`.
- Verify the admin login works.
- Run the full Thunder Client flow from auth to review.
- Keep the live API URL and docs URL ready for submission.

### Final Testing Recap

If everything passes in Thunder Client, the core GearUp flow is working:

1. Admin login
2. Category create
3. Provider gear create
4. Customer rental create
5. Provider rental confirm
6. Payment create and confirm
7. Provider pickup and return updates
8. Customer review
9. Admin overview checks

### Main API Groups

- `/api/auth`
- `/api/categories`
- `/api/gear`
- `/api/rentals`
- `/api/payments`
- `/api/reviews`
- `/api/admin`
