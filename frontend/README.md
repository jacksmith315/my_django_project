# Inventory Pro Frontend

The frontend application for Inventory Pro, built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

4. Start the development server:
```bash
npm run dev -- --port 5173
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Root component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── .env.example          # Environment variables template
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🔒 Authentication

The application uses Google OAuth for authentication. Make sure to:
1. Set up a Google OAuth 2.0 Client ID in the Google Cloud Console
2. Add the client ID to your `.env` file
3. Configure allowed origins and redirect URIs in the Google Cloud Console

## 🎨 Styling

- Using Tailwind CSS for styling
- Custom components follow Tailwind's design system
- Responsive design for all screen sizes

## 🔗 API Integration

- All API calls are made to the backend service
- Base API URL is configured through `VITE_API_URL` environment variable
- Axios is used for HTTP requests
- Authentication state is managed globally

## 📝 Development Guidelines

1. **TypeScript**
   - Use TypeScript for all new code
   - Define interfaces for all data structures
   - Avoid using `any` type

2. **Components**
   - Use functional components with hooks
   - Keep components small and focused
   - Use TypeScript props interfaces

3. **State Management**
   - Use React Context for global state
   - Keep component state local when possible
   - Use custom hooks for shared logic

4. **Testing**
   - Write unit tests for utilities
   - Test components in isolation
   - Use React Testing Library

## 🐛 Troubleshooting

1. **Port Already in Use**
   - Use a different port: `npm run dev -- --port <port>`
   - Check for other running processes
   - Default port is 5173

2. **Environment Variables**
   - Ensure `.env` file exists
   - Check variable names start with `VITE_`
   - Restart dev server after changes

3. **Build Issues**
   - Clear `node_modules` and reinstall
   - Check TypeScript errors
   - Verify import paths
