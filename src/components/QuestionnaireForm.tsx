import { useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Heart, Clock, Users, MessageSquare, Map } from 'lucide-react';
import { Answer } from '../App';
import { questions } from '../data/questions';
import { QuestionCard } from './QuestionCard';

interface QuestionnaireFormProps {
  onComplete: (answers: Answer[]) => void;
}

// Step labels for progress indicator
const stepLabels = [
  { icon: MapPin, label: 'Area' },
  { icon: Map, label: 'Places' },
  { icon: Heart, label: 'Activities' },
  { icon: Clock, label: 'Duration' },
  { icon: Calendar, label: 'Service' },
  { icon: Users, label: 'Group' },
  { icon: MessageSquare, label: 'Details' }
];

export function QuestionnaireForm({ onComplete }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: string | number) => {
    const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    newAnswers.push({ questionId: currentQuestion.id, value });
    setAnswers(newAnswers);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id)?.value;
  };

  const canProceed = () => {
    const currentAnswer = getCurrentAnswer();
    
    // For optional text fields, allow proceeding even if empty
    if (currentQuestion.type === 'text' && 
        (currentQuestion.id === 'specific-places' || currentQuestion.id === 'special-requirements')) {
      return true;
    }
    
    // Require at least one selection for multiple-choice (multi-select)
    if (currentQuestion.type === 'multiple-choice') {
      return typeof currentAnswer === 'string' && currentAnswer.trim() !== '';
    }

    return currentAnswer !== undefined;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleSkip = () => {
    // Remove any existing answer for this step and advance
    setAnswers(answers.filter(a => a.questionId !== currentQuestion.id));
    handleNext();
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
      {/* Step Indicator */}
      <div className="mb-10">
        <div className="flex justify-between items-center relative">
          {/* Progress line background */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" style={{ zIndex: 0 }} />
          {/* Active progress line */}
          <div 
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500" 
            style={{ width: `${(currentStep / (questions.length - 1)) * 100}%`, zIndex: 0 }} 
          />
          
          {stepLabels.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center relative" style={{ zIndex: 1 }}>
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-rose-400 to-rose-500 shadow-lg scale-110' 
                      : isCompleted 
                        ? 'bg-rose-100 border-2 border-rose-400' 
                        : 'bg-white border-2 border-gray-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-white' : isCompleted ? 'text-rose-500' : 'text-gray-400'
                  }`} />
                </div>
                <span className={`text-xs font-medium hidden md:block ${
                  isActive ? 'text-rose-500' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        value={getCurrentAnswer()}
        onChange={handleAnswer}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center mt-10 pt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 ${
            currentStep === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <div className="flex items-center gap-3">
          {currentQuestion.type !== 'multiple-choice' && (
            <button
              onClick={handleSkip}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <span>Skip</span>
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-200 ${
              canProceed()
                ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === questions.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}