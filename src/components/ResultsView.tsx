import { MapPin, Clock, Users, Star, ArrowLeft } from 'lucide-react';
import { Answer } from '../App';
import { questions } from '../data/questions';

interface ResultsViewProps {
  answers: Answer[];
  onRestart: () => void;
  onSubmit: () => void;
}

export function ResultsView({ answers, onRestart, onSubmit }: ResultsViewProps) {
  const getAnswerDisplay = (questionId: string) => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.value || 'Not provided';
  };

  const destination = getAnswerDisplay('destination');
  const groupSize = getAnswerDisplay('group-size');

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Review Your Trip Details</h2>
        <p className="text-gray-600">
          Please review your custom trip plan below. Once you're ready, submit to finalize your booking.
        </p>
      </div>

      {/* Key highlights */}
      <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl border-2 border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Destination</p>
            <p className="text-gray-900 font-semibold">{destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Group Size</p>
            <p className="text-gray-900 font-semibold">{groupSize} {Number(groupSize) === 1 ? 'person' : 'people'}</p>
          </div>
        </div>
      </div>

      {/* Detailed summary */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-rose-500" />
          Trip Summary
        </h3>
        <div className="space-y-4">
          {questions.map((question) => {
            const answer = answers.find(a => a.questionId === question.id);
            if (!answer || question.id === 'destination' || question.id === 'group-size') return null;

            // Skip optional fields if empty
            if ((question.id === 'specific-places' || question.id === 'special-requirements') && 
                (!answer.value || answer.value === '')) {
              return null;
            }

            return (
              <div key={question.id} className="border-l-4 border-rose-300 bg-rose-50/50 pl-4 py-3 rounded-r-xl">
                <p className="text-sm text-gray-600 mb-1 font-medium">{question.text}</p>
                <p className="text-gray-900">
                  {typeof answer.value === 'number' ? answer.value : answer.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info message */}
      <div className="mb-8 p-4 bg-gradient-to-r from-rose-50 to-orange-50 border-l-4 border-rose-400 rounded-r-xl">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Next step:</span> Submit your trip plan and create an account to finalize your chauffeur service booking. Our team will contact you within 24 hours to confirm details and pricing.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Edit Responses
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Submit & Continue
        </button>
      </div>
    </div>
  );
}