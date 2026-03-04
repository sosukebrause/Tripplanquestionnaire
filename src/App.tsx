import { useState } from 'react';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { ResultsView } from './components/ResultsView';
import { LoginSignupModal } from './components/LoginSignupModal';

export interface Answer {
  questionId: string;
  value: string | number;
}

export default function App() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleComplete = (finalAnswers: Answer[]) => {
    setAnswers(finalAnswers);
    setIsComplete(true);
  };

  const handleRestart = () => {
    setAnswers([]);
    setIsComplete(false);
    setShowLoginModal(false);
  };

  const handleSubmit = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-rose-500 mb-3">Custom Trip Planner</h1>
          <p className="text-gray-600 text-lg">
            {isComplete 
              ? 'Review and submit your personalized chauffeur service request' 
              : 'Plan your perfect journey in Tokyo or Osaka-Kyoto'}
          </p>
        </div>

        {isComplete ? (
          <ResultsView 
            answers={answers} 
            onRestart={handleRestart}
            onSubmit={handleSubmit}
          />
        ) : (
          <QuestionnaireForm onComplete={handleComplete} />
        )}
      </div>

      <LoginSignupModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
}