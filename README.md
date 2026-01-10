# Let's Connect - Real-Time Chat Application

A modern, full-stack real-time chat application built with Next.js 14, featuring instant messaging capabilities, user authentication, and live message synchronization using Supabase real-time subscriptions.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Services & Technologies Used](#services--technologies-used)
- [Engineering Challenges & Solutions](#engineering-challenges--solutions)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [Real-Time Messaging Implementation](#real-time-messaging-implementation)
- [Authentication Flow](#authentication-flow)
- [State Management](#state-management)
- [Frontend Architecture](#frontend-architecture)
- [Security Considerations](#security-considerations)
- [Performance Optimizations](#performance-optimizations)
- [Contributing](#contributing)

---

## 🎯 Overview

Let's Connect is a real-time chat application that enables users to:
- Create accounts and authenticate securely
- View and select from a list of available users
- Send and receive messages in real-time
- Experience instant message updates without page refresh

The application leverages a hybrid architecture combining traditional REST APIs for message persistence with Supabase real-time subscriptions for instant message delivery, providing a seamless chat experience.

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14.2.15** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Redux Toolkit 2.3.0** - State management
- **React Redux 9.1.2** - React bindings for Redux
- **Axios 1.7.7** - HTTP client
- **React Feather 2.0.10** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma 5.22.0** - Type-safe ORM
- **PostgreSQL** - Relational database
- **Supabase** - Real-time database subscriptions
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcrypt 5.1.1** - Password hashing

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Node.js 22** - Runtime environment

---

## 🏗 Architecture

The application follows a modern full-stack architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   React UI   │  │  Redux Store │  │  Supabase    │  │
│  │  Components  │◄─┤  (State)     │  │  Client (RT) │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└──────────────────────┬──────────────────────┬───────────┘
                       │                      │
        HTTP/REST      │                      │ WebSocket
        (Axios)        │                      │ (Supabase)
                       ▼                      ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js Server (API Routes)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Auth API   │  │  Messages    │  │   Users API  │  │
│  │  (JWT +      │  │     API      │  │     API      │  │
│  │   bcrypt)    │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ Prisma ORM
                       ▼
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL Database                         │
│  ┌──────────────┐          ┌──────────────┐            │
│  │    User      │◄─────────┤   Message    │            │
│  │   Table      │          │    Table     │            │
│  └──────────────┘          └──────────────┘            │
└─────────────────────────────────────────────────────────┘
                       ▲
                       │
                       │ Supabase Realtime
                       │ (Postgres Changes)
                       │
┌─────────────────────────────────────────────────────────┐
│              Supabase Realtime Service                  │
│  (Listens to Message table INSERT events)               │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Hybrid Messaging Approach**: Messages are persisted via REST API while real-time updates use Supabase subscriptions, ensuring reliability and instant delivery.

2. **Server-Side Rendering Ready**: Built with Next.js App Router, allowing for future SSR/SSG optimizations.

3. **Type Safety**: End-to-end TypeScript ensures type safety from database to UI components.

4. **Separation of Concerns**: Clear separation between authentication, data fetching, real-time subscriptions, and UI rendering.

---

## ✨ Features

- 🔐 **User Authentication**: Secure signup and signin with JWT tokens and bcrypt password hashing
- 👥 **User Discovery**: Browse and select from available users
- 💬 **Real-Time Messaging**: Instant message delivery using Supabase real-time subscriptions
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS
- 🔄 **State Management**: Centralized state using Redux Toolkit
- 🎨 **Component Architecture**: Modular, reusable React components
- 🐳 **Dockerized**: Complete containerization for easy deployment
- 🔒 **API Security**: JWT-based authentication on all protected routes

---

## 🔧 Services & Technologies Used

### 1. **Next.js 14**
   - **Purpose**: React framework providing SSR, routing, and API routes
   - **Usage**: 
     - App Router for file-based routing
     - API Routes (`/api/*`) for backend endpoints
     - Client-side components with `"use client"` directive
   - **Configuration**: Custom fonts (Geist Sans & Geist Mono) with optimized loading

### 2. **Prisma ORM**
   - **Purpose**: Type-safe database access and migrations
   - **Usage**:
     - Schema definition in `prisma/schema.prisma`
     - Migration management
     - Type-safe database queries
   - **Challenges Tackled**:
     - Multi-stage Docker builds requiring Prisma generation at build time and runtime
     - Ensuring Prisma Client is available in production Docker containers
     - Managing database connection pooling with `DATABASE_URL` and `DIRECT_URL`

### 3. **PostgreSQL Database**
   - **Purpose**: Persistent storage for users and messages
   - **Schema**:
     - `User` table: id, username (unique), password (hashed)
     - `Message` table: id, text, senderId, receiverId, createdAt
     - Bidirectional relationships between User and Message models
   - **Features Used**:
     - Foreign key constraints
     - Unique constraints on username
     - Timestamps for message ordering

### 4. **Supabase Real-Time**
   - **Purpose**: WebSocket-based real-time message synchronization
   - **Implementation**:
     - Uses `@supabase/ssr` for SSR-compatible client creation
     - Listens to PostgreSQL `INSERT` events on the `Message` table
     - Publishes changes to subscribed clients instantly
   - **Challenges Tackled**:
     - Setting up Postgres replication for Supabase real-time to work
     - Managing client lifecycle (subscribe/unsubscribe) to prevent memory leaks
     - Handling reconnections and channel management
     - SSR compatibility with `createBrowserClient` from `@supabase/ssr`

### 5. **JWT (JSON Web Tokens)**
   - **Purpose**: Stateless authentication
   - **Implementation**:
     - Token generation on successful login
     - Bearer token authentication on protected routes
     - Token payload includes user id and username
   - **Security**: JWT secret stored in environment variables

### 6. **bcrypt**
   - **Purpose**: Secure password hashing
   - **Implementation**:
     - 10 salt rounds for password hashing
     - Secure password comparison on login
   - **Security Best Practice**: Never store plain-text passwords

### 7. **Redux Toolkit**
   - **Purpose**: Centralized state management
   - **Implementation**:
     - User slice: Manages current user state (userId, username)
     - Friend slice: Manages selected friend state (friendId, friendName)
     - Root reducer combining all slices
     - Provider wrapping the entire app in `layout.tsx`

### 8. **Docker & Docker Compose**
   - **Purpose**: Containerization and deployment
   - **Challenges Tackled**:
     - Multi-stage builds for optimized image size
     - Prisma Client generation in both build and runtime stages
     - Installing system dependencies (openssl) for Prisma
     - Production optimization with `npm ci --omit=dev`
     - Environment variable management with `.env.local`

---

## 🎯 Engineering Challenges & Solutions

### Challenge 1: Real-Time Message Synchronization
**Problem**: How to deliver messages instantly to all users in a conversation without polling?

**Solution**: 
- Implemented Supabase real-time subscriptions that listen to PostgreSQL changes
- When a new message is inserted via REST API, Supabase automatically notifies all subscribed clients
- Clients update their local state immediately upon receiving the real-time event
- Fallback: Initial message load via REST API ensures data consistency

**Code Location**: `src/app/components/center/MessagesComp.tsx` (lines 61-71)

### Challenge 2: Prisma in Docker Production Build
**Problem**: Prisma Client needs to be generated at build time, but also available at runtime in production Docker containers.

**Solution**:
- Multi-stage Docker build:
  - **Builder stage**: Generate Prisma Client, build Next.js app
  - **Runner stage**: Copy Prisma schema, re-generate Prisma Client after installing production dependencies
- Installed `openssl` in runner stage (required for Prisma)
- Used `npm ci --omit=dev` for deterministic production installs

**Code Location**: `Dockerfile` (lines 12, 34)

### Challenge 3: State Management with Server-Side Data
**Problem**: How to manage application state that includes data from localStorage, API calls, and real-time subscriptions?

**Solution**:
- Redux Toolkit for global state (user, friend selection)
- localStorage for persistence (token, username, id)
- React state for component-level data (messages array)
- Redux actions triggered on mount to sync localStorage with Redux store
- Real-time subscription updates React state directly for immediate UI updates

**Code Location**: 
- `src/app/redux/slices/userSlices.ts`
- `src/app/components/center/MessagesComp.tsx` (lines 37-42)

### Challenge 4: Authentication Flow & Token Management
**Problem**: Securing API routes while maintaining a good user experience.

**Solution**:
- JWT tokens stored in localStorage for persistence across sessions
- Bearer token authentication on all protected routes
- Token verification middleware pattern in API routes
- Automatic token extraction from Authorization header
- Graceful error handling for missing/invalid tokens

**Code Location**: 
- `src/app/api/signin/route.ts`
- `src/app/api/messages/route.ts` (lines 15-23, 33-41)

### Challenge 5: Supabase SSR Compatibility
**Problem**: Using Supabase client in a Next.js App Router application with SSR.

**Solution**:
- Used `@supabase/ssr` package instead of `@supabase/supabase-js` directly
- `createBrowserClient` ensures the client only runs in browser context
- Environment variables prefixed with `NEXT_PUBLIC_` for client-side access
- Proper cleanup of subscriptions in `useEffect` return function

**Code Location**: `src/app/components/center/MessagesComp.tsx` (lines 5, 25-28, 69-71)

### Challenge 6: Database Relationship Modeling
**Problem**: Modeling bidirectional relationships between users and messages efficiently.

**Solution**:
- Prisma relations with named relations (`sentMessage`, `receivedMessage`)
- Foreign keys on `senderId` and `receiverId` in Message table
- Query optimization: Fetching messages using `OR` condition for bidirectional conversations
- Indexed queries on user ID lookups

**Code Location**: `prisma/schema.prisma` (lines 18-34)

### Challenge 7: Component Re-rendering Optimization
**Problem**: Preventing unnecessary re-renders when messages update.

**Solution**:
- `useEffect` dependency array includes only `state.friend` to re-subscribe when friend changes
- Real-time subscription updates state directly without re-fetching all messages
- Initial message fetch only on friend selection change
- Proper cleanup to prevent memory leaks

**Code Location**: `src/app/components/center/MessagesComp.tsx` (line 72)

---

## 📊 Database Schema

### User Model
```prisma
model User {
  id            Int       @id @default(autoincrement())
  username      String    @unique
  password      String
  sentMessage   Message[] @relation("sentMessage")
  receivedMessage Message[] @relation("receivedMessage")
}
```

**Fields**:
- `id`: Auto-incrementing primary key
- `username`: Unique username for login
- `password`: bcrypt-hashed password
- Relations: Bidirectional relationship with Message model

### Message Model
```prisma
model Message {
  id         Int      @id @default(autoincrement())
  text       String
  senderId   Int
  receiverId Int
  sender     User     @relation("sentMessage", fields: [senderId], references: [id])
  receiver   User     @relation("receivedMessage", fields: [receiverId], references: [id])
  createdAt  DateTime @default(now())
}
```

**Fields**:
- `id`: Auto-incrementing primary key
- `text`: Message content
- `senderId`: Foreign key to User (sender)
- `receiverId`: Foreign key to User (receiver)
- `createdAt`: Timestamp for message ordering

**Indexes**: 
- Automatic indexes on foreign keys
- Unique constraint on username

---

## 🔌 API Endpoints

### Authentication Endpoints

#### POST `/api/signup`
Creates a new user account.

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response**: User object with hashed password
**Status**: 200 OK

**Implementation**: `src/app/api/signup/route.ts`

---

#### POST `/api/signin`
Authenticates a user and returns JWT token.

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "user": {
    "id": number,
    "username": "string"
  },
  "token": "jwt_token_string"
}
```

**Status**: 200 OK or 400 Bad Request

**Implementation**: `src/app/api/signin/route.ts`

---

### Message Endpoints

#### POST `/api/messages`
Creates a new message (protected route).

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Request Body**:
```json
{
  "senderId": number,
  "receiverId": number,
  "text": "string"
}
```

**Response**: Created message object with id and timestamp
**Status**: 200 OK or 401 Unauthorized

**Implementation**: `src/app/api/messages/route.ts` (lines 14-30)

---

#### GET `/api/messages?friendId=<id>`
Retrieves all messages between current user and a friend (protected route).

**Headers**:
```
Authorization: Bearer <jwt_token>
userId: <current_user_id>
```

**Query Parameters**:
- `friendId`: ID of the friend to get conversation with

**Response**: Array of message objects
```json
[
  {
    "id": number,
    "text": "string",
    "senderId": number,
    "receiverId": number,
    "createdAt": "ISO_date_string"
  }
]
```

**Status**: 200 OK or 401 Unauthorized

**Implementation**: `src/app/api/messages/route.ts` (lines 32-56)

**Query Logic**: Fetches messages where user is either sender or receiver using `OR` condition

---

### User Endpoints

#### GET `/api/users/all`
Retrieves all users (protected route).

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response**: Array of all user objects
```json
[
  {
    "id": number,
    "username": "string"
  }
]
```

**Status**: 200 OK or 401 Unauthorized

**Implementation**: `src/app/api/users/all/route.ts`

**Use Case**: Displaying list of available users to chat with

---

## 📁 Project Structure

```
letsconnect/
├── prisma/
│   ├── schema.prisma              # Database schema definition
│   └── migrations/                # Database migration history
│       ├── 20241107165340_user_message_model/
│       ├── 20241108180915_user_message_updated/
│       └── ...
├── src/
│   └── app/
│       ├── api/                   # Next.js API Routes
│       │   ├── messages/
│       │   │   └── route.ts       # POST/GET messages
│       │   ├── signin/
│       │   │   └── route.ts       # Authentication
│       │   ├── signup/
│       │   │   └── route.ts       # User registration
│       │   └── users/
│       │       └── all/
│       │           └── route.ts   # Get all users
│       ├── components/            # React components
│       │   ├── center/            # Chat center area
│       │   │   ├── CenterBar.tsx
│       │   │   ├── MessagesComp.tsx    # Real-time messages
│       │   │   ├── CenterBottom.tsx    # Message input
│       │   │   └── FriendChatBox.tsx
│       │   ├── left/              # Left sidebar
│       │   │   ├── LeftBar.tsx
│       │   │   ├── ProfileSection.tsx
│       │   │   └── ...
│       │   └── right/             # Right sidebar
│       │       ├── RightBar.tsx
│       │       ├── Chats.tsx      # User list
│       │       └── ...
│       ├── redux/                 # Redux state management
│       │   ├── store.ts           # Redux store configuration
│       │   ├── rootReducer.ts     # Combined reducers
│       │   └── slices/
│       │       ├── userSlices.ts  # User state
│       │       └── friendSlice.ts # Friend selection state
│       ├── chat/
│       │   └── page.tsx           # Main chat page
│       ├── signin/
│       │   └── page.tsx           # Login page
│       ├── signup/
│       │   └── page.tsx           # Registration page
│       ├── layout.tsx             # Root layout with Redux Provider
│       └── globals.css            # Global styles
├── Dockerfile                     # Multi-stage Docker build
├── docker-compose.yml             # Docker Compose configuration
├── next.config.mjs                # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ (or Node.js 22 as specified in Dockerfile)
- PostgreSQL database (or use Supabase hosted PostgreSQL)
- npm or yarn package manager
- Docker and Docker Compose (for containerized deployment)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd letsconnect
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"
DIRECT_URL="postgresql://user:password@host:5432/dbname"

# JWT Secret (use a strong random string)
JWT_SECRET_KEY="your-super-secret-jwt-key-here"

# Supabase (for real-time subscriptions)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-supabase-anon-key"
```

### Step 4: Set Up Database
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### Step 5: Configure Supabase Real-Time
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Link your PostgreSQL database (or use Supabase's hosted database)
3. Enable Realtime for the `Message` table in Supabase Dashboard
4. Go to Database → Replication → Enable replication for `Message` table

### Step 6: Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 🔐 Environment Variables

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string (with connection pooling) | Yes | `postgresql://user:pass@host:5432/db?pgbouncer=true` |
| `DIRECT_URL` | PostgreSQL direct connection (for migrations) | Yes | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET_KEY` | Secret key for JWT token signing | Yes | `my-super-secret-key-123` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Supabase anon/public key | Yes | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the client-side code.

---

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
- Runs Next.js development server
- Hot reload enabled
- Accessible at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```
- Creates optimized production build
- Runs production server on port 3000 (default)

### Linting
```bash
npm run lint
```
- Runs ESLint with Next.js configuration

---

## 🐳 Docker Deployment

### Building the Docker Image
```bash
docker build -t letsconnect:latest .
```

### Running with Docker Compose
```bash
docker-compose up -d
```

### Docker Compose Configuration
The `docker-compose.yml` file:
- Uses pre-built image `geekyoswald/letsconnect`
- Maps port 3000 to host
- Loads environment variables from `.env.local`
- Sets production environment

### Key Docker Features

#### Multi-Stage Build
- **Builder Stage**: Installs all dependencies, generates Prisma Client, builds Next.js app
- **Runner Stage**: Only production dependencies, smaller image size

#### Prisma in Docker
- Prisma Client generated twice: once during build, once in production container
- Ensures compatibility with production Node.js environment
- `openssl` installed for Prisma's crypto requirements

#### Production Optimizations
- `npm ci --omit=dev` for faster, deterministic installs
- Only `.next` build output and Prisma schema copied to runner
- Environment variables managed via Docker Compose

---

## ⚡ Real-Time Messaging Implementation

### Architecture Overview
The real-time messaging uses a hybrid approach:
1. **Message Persistence**: REST API (`POST /api/messages`) writes to PostgreSQL
2. **Real-Time Delivery**: Supabase listens to PostgreSQL changes and broadcasts via WebSocket
3. **Client Subscription**: React component subscribes to Supabase channel for instant updates

### Implementation Details

#### Step 1: Message Creation (REST API)
```typescript
// User sends message via CenterBottom component
await axios.post('/api/messages', {
  senderId, receiverId, text
}, {
  headers: { authorization: `Bearer ${token}` }
});
```

#### Step 2: Database Insert
```typescript
// API route persists message
await prisma.message.create({
  data: { senderId, receiverId, text }
});
```

#### Step 3: Supabase Realtime Detection
- Supabase Realtime service (configured via Supabase Dashboard) detects INSERT event
- Publishes change to subscribed clients via WebSocket

#### Step 4: Client Receives Update
```typescript
// MessagesComp.tsx subscribes to changes
const subscription = supabase
  .channel("MessageTable")
  .on("postgres_changes", {
    event: "INSERT",
    schema: "public",
    table: "Message"
  }, handleInserts)
  .subscribe();

// handleInserts updates React state
const handleInserts = (payload: { new: Message }) => {
  setAllMessages(prev => [...prev, payload.new]);
};
```

### Why This Approach?
- **Reliability**: Messages are always persisted via REST API
- **Real-Time**: Supabase provides instant delivery without polling
- **Scalability**: WebSocket connections handled by Supabase infrastructure
- **Separation**: Clear separation between persistence and real-time delivery

---

## 🔑 Authentication Flow

### Sign Up Flow
1. User enters username and password
2. Frontend sends POST request to `/api/signup`
3. Server hashes password with bcrypt (10 rounds)
4. User created in database
5. User redirected to signin page

### Sign In Flow
1. User enters credentials
2. Frontend sends POST request to `/api/signin`
3. Server:
   - Finds user by username
   - Compares password with bcrypt
   - Generates JWT token with user id and username
4. Frontend stores token and user info in localStorage
5. User redirected to `/chat` page

### Protected Route Access
1. User makes API request
2. Frontend includes token in Authorization header: `Bearer <token>`
3. API route extracts token from header
4. Server verifies token with JWT_SECRET
5. If valid, request proceeds; otherwise, returns 401 Unauthorized

### Client-Side State Sync
- On chat page mount, Redux store is updated from localStorage
- Ensures UI reflects authenticated user state
- Token persists across page refreshes

---

## 🗂 State Management

### Redux Store Structure
```typescript
{
  user: {
    userId: number,
    username: string
  },
  friend: {
    friendId: number,
    friendName: string
  }
}
```

### State Updates

#### User State
- Updated on signin: Token and user info saved to localStorage
- Synced on mount: `MessagesComp` dispatches `updateUser` action from localStorage
- Used for: Identifying current user, API requests, message filtering

#### Friend State
- Updated on friend selection: User clicks friend in `Chats` component
- Dispatches `updateFriend` action with friend ID and name
- Used for: Filtering messages, displaying active conversation

### Local Storage Usage
- `token`: JWT authentication token
- `username`: Current user's username
- `id`: Current user's ID

### React State (Component Level)
- `allMessages`: Array of messages for current conversation
- Updated via:
  - Initial fetch on friend selection
  - Real-time subscription updates

---

## 🎨 Frontend Architecture

### Component Hierarchy
```
RootLayout (Redux Provider)
├── SignIn Page
├── SignUp Page
└── Chat Page
    ├── LeftBar (Profile, Features)
    ├── CenterBar
    │   ├── FriendChatBox (Active friend display)
    │   ├── MessagesComp (Real-time message list)
    │   └── CenterBottom (Message input)
    └── RightBar
        ├── RecentlyContacted
        ├── Chats (User list)
        └── Groups
```

### Key Components

#### MessagesComp
- **Purpose**: Displays messages and handles real-time subscriptions
- **State**: Local state for messages array
- **Effects**: 
  - Fetches messages on friend change
  - Subscribes to Supabase real-time channel
  - Cleans up subscription on unmount or friend change

#### CenterBottom
- **Purpose**: Message input and submission
- **Features**: 
  - Enter key submission
  - Real-time message sending via REST API
  - Automatic input clearing after send

#### Chats
- **Purpose**: Displays list of available users
- **Features**: 
  - Fetches all users on mount
  - Updates Redux friend state on selection
  - Friend selection triggers message reload

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Custom Colors**: Custom color scheme (cyan, green, amber)
- **Fonts**: Geist Sans and Geist Mono from local font files

---

## 🔒 Security Considerations

### Implemented Security Measures

1. **Password Hashing**
   - bcrypt with 10 salt rounds
   - Passwords never stored in plain text
   - Secure comparison on login

2. **JWT Authentication**
   - Tokens signed with secret key
   - Bearer token authentication
   - Token verification on all protected routes

3. **API Route Protection**
   - All message and user endpoints require valid JWT
   - Graceful error handling for missing/invalid tokens
   - User ID extracted from token payload (future enhancement)

4. **Environment Variables**
   - Sensitive data stored in environment variables
   - JWT secret not exposed to client
   - Database credentials secured

### Security Improvements (Future)
- Extract senderId from JWT token instead of client-provided value
- Add rate limiting on authentication endpoints
- Implement token refresh mechanism
- Add CSRF protection
- Input sanitization and validation
- SQL injection prevention (already handled by Prisma)

---

## ⚡ Performance Optimizations

### Current Optimizations

1. **Database Query Optimization**
   - Prisma generates optimized SQL queries
   - Indexed foreign keys for fast lookups
   - Efficient `OR` condition for bidirectional message queries

2. **React Optimizations**
   - `useEffect` dependency arrays prevent unnecessary re-renders
   - Real-time updates only trigger when relevant changes occur
   - Message list updates via immutable state updates

3. **Docker Image Optimization**
   - Multi-stage build reduces final image size
   - Production dependencies only in runner stage
   - Cached Docker layers for faster rebuilds

4. **Next.js Optimizations**
   - Production build with code splitting
   - Optimized font loading with local fonts
   - Static asset optimization

### Potential Future Optimizations
- Implement message pagination for large conversations
- Add message caching strategy
- Implement optimistic UI updates
- Add database connection pooling configuration
- Implement lazy loading for user list
- Add service worker for offline support

---


## 🚧 Known Limitations & Future Enhancements

### Current Limitations
1. No message pagination (loads all messages at once)
2. No message editing or deletion
3. No file/image attachments
4. No typing indicators
5. No message read receipts
6. No group chat functionality (despite UI placeholder)
7. No user online/offline status
8. Token stored in localStorage (XSS vulnerability)

### Planned Enhancements
- [ ] Message pagination with infinite scroll
- [ ] Message editing and deletion
- [ ] File and image uploads
- [ ] Typing indicators using Supabase presence
- [ ] Read receipts and message status
- [ ] Group chat implementation
- [ ] User presence (online/offline)
- [ ] Token refresh mechanism
- [ ] Message search functionality
- [ ] Emoji support
- [ ] Message reactions
- [ ] User profiles with avatars
- [ ] Dark mode theme

---

## 🤝 Contributing

### Contribution Guidelines

1. **Issue Assignment**: Only contribute after issue is officially assigned
2. **Timeline**: Wait 3 days after project video goes live before requesting assignment
3. **Target Branch**: All PRs must target the `test` branch
4. **Requirements**: Ensure code meets all issue requirements
5. **Testing**: Test thoroughly before submitting PR

### Development Workflow
1. Fork the repository
2. Create a feature branch from `test` branch
3. Make your changes
4. Test locally
5. Submit PR to `test` branch
6. Await review and merge

For more details, see the existing contribution guidelines in the repository.

---
