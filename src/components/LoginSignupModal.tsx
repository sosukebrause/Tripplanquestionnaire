import { X } from 'lucide-react';
import loginImage from 'figma:asset/9b48c76263bb541e49eb48d94f61ae5c716cd006.png';

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginSignupModal({ isOpen, onClose }: LoginSignupModalProps) {
  if (!isOpen) return null;

  const handleAuth = (method: string) => {
    // Placeholder for authentication logic
    console.log(`Authenticating with ${method}`);
    // In a real app, this would trigger OAuth flows or email authentication
    alert(`Authentication with ${method} would be initiated here. For demo purposes, this is a placeholder.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-gray-900 mb-6 text-center">Log in or sign up</h2>

        {/* Authentication options */}
        <div className="space-y-3">
          <button
            onClick={() => handleAuth('Google')}
            className="w-full flex items-center gap-3 px-6 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-900 flex-1 text-left">Continue with Google</span>
          </button>

          <button
            onClick={() => handleAuth('Email')}
            className="w-full flex items-center gap-3 px-6 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-2xl">@</span>
            </div>
            <span className="text-gray-900 flex-1 text-left">Continue with email</span>
          </button>

          <button
            onClick={() => handleAuth('Apple')}
            className="w-full flex items-center gap-3 px-6 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-gray-900 flex-1 text-left">Continue with Apple</span>
          </button>

          <button
            onClick={() => handleAuth('Phone')}
            className="w-full flex items-center gap-3 px-6 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <span className="text-gray-900 flex-1 text-left">Continue with phone</span>
          </button>
        </div>

        {/* Terms and privacy */}
        <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
          By registering, you agree to our{' '}
          <a href="#" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          , as well as the{' '}
          <a href="#" className="underline hover:text-gray-700">
            Service Agreement
          </a>
        </p>
      </div>
    </div>
  );
}
