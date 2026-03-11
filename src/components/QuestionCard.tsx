import { Question } from '../data/questions';
import { useState, useEffect } from 'react';
import { User, Check, Palmtree, ShoppingBag, UtensilsCrossed, Camera, Music, Mountain, Baby, Sparkles, Heart, X, Ticket, Waves, Landmark } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
}

// Category icons mapping
const categoryIcons: Record<string, any> = {
  'Cultural Immersion': Palmtree,
  'Shopping': ShoppingBag,
  'Food Tours': UtensilsCrossed,
  'Photography': Camera,
  'Temples & Shrines': Landmark,
  'Nightlife': Music,
  'Nature & Scenery': Mountain,
  'Family Activities': Baby,
  'Relaxation & Wellness': Sparkles,
  'Amusement': Ticket,
  'Photography & Scenery': Camera,
  'Nature & Outdoors': Mountain,
  'Beaches': Waves,
};

// Pool of new options that progressively appear as selections are made
const NEW_OPTIONS_POOL = ['Amusement', 'Photography & Scenery', 'Nature & Outdoors', 'Beaches'];

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const [inputMode, setInputMode] = useState<'categories' | 'text' | 'unsure'>('categories');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');
  const [otherText, setOtherText] = useState('');
  const [revealedNewCount, setRevealedNewCount] = useState(0);

  // Reset new option reveal count when question changes
  useEffect(() => {
    setRevealedNewCount(0);
    setOtherText('');
  }, [question.id]);

  // Initialize from existing value for category-selection
  useState(() => {
    if (question.type === 'category-selection' && value) {
      const valueStr = value.toString();
      if (valueStr === 'Unsure') {
        setInputMode('unsure');
      } else if (question.categories && question.categories.some(cat => valueStr.includes(cat))) {
        setInputMode('categories');
        setSelectedCategories(valueStr.split(', '));
      } else {
        setInputMode('text');
        setCustomText(valueStr);
      }
    }
  });

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    if (newCategories.length > 0) {
      onChange(newCategories.join(', '));
    }
  };

  const handleCustomTextChange = (text: string) => {
    setCustomText(text);
    if (text.trim()) {
      onChange(text);
    }
  };

  const handleInputModeChange = (mode: 'categories' | 'text' | 'unsure') => {
    setInputMode(mode);
    if (mode === 'unsure') {
      onChange('Unsure');
    } else if (mode === 'categories' && selectedCategories.length > 0) {
      onChange(selectedCategories.join(', '));
    } else if (mode === 'text' && customText.trim()) {
      onChange(customText);
    }
  };

  return (
    <div className="min-h-[320px]">
      <h2 className="mb-8 text-gray-900 text-center">{question.text}</h2>

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-3 max-w-xl mx-auto">
          {question.options.map((option) => {
            const selectedValues = value ? value.toString().split(', ').filter(Boolean) : [];
            const isSelected =
              option === 'Other'
                ? selectedValues.some(v => v === 'Other' || !question.options?.includes(v))
                : selectedValues.includes(option);
            return (
              <label
                key={option}
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-rose-400 bg-rose-50 shadow-md scale-[1.02]'
                    : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center flex-1">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-all ${
                    isSelected ? 'border-rose-500 bg-rose-500' : 'border-gray-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{option}</span>
                </div>
                <input
                  type="checkbox"
                  name={question.id}
                  value={option}
                  checked={isSelected}
                  onChange={(e) => {
                    const opt = e.target.value;
                    const currentValues = value ? value.toString().split(', ').filter(Boolean) : [];
                    if (opt === 'Other') {
                      const otherIsSelected = currentValues.some(v => v === 'Other' || !question.options?.includes(v));
                      if (otherIsSelected) {
                        const newValues = currentValues.filter(v => question.options?.includes(v) && v !== 'Other');
                        setOtherText('');
                        onChange(newValues.join(', ') || '');
                      } else {
                        setOtherText('');
                        const newValues = [...currentValues.filter(v => question.options?.includes(v)), 'Other'];
                        onChange(newValues.join(', '));
                      }
                    } else {
                      const newValues = currentValues.includes(opt)
                        ? currentValues.filter(v => v !== opt)
                        : [...currentValues, opt];
                      onChange(newValues.join(', ') || '');
                    }
                  }}
                  className="sr-only"
                />
              </label>
            );
          })}

          {/* Show text input when "Other" is selected */}
          {(() => {
            const selectedValues = value ? value.toString().split(', ').filter(Boolean) : [];
            const otherIsSelected = selectedValues.some(v => v === 'Other' || !question.options?.includes(v));
            const customVal = selectedValues.find(v => !question.options?.includes(v) && v !== '') || '';
            return otherIsSelected ? (
              <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  value={otherText || customVal}
                  onChange={(e) => {
                    const currentValues = value ? value.toString().split(', ').filter(Boolean) : [];
                    const knownValues = currentValues.filter(v => question.options?.includes(v) && v !== 'Other');
                    setOtherText(e.target.value);
                    const newValues = e.target.value
                      ? [...knownValues, e.target.value]
                      : [...knownValues, 'Other'];
                    onChange(newValues.join(', '));
                  }}
                  placeholder="Please specify..."
                  className="w-full px-4 py-3 border-2 border-rose-300 rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                  autoFocus
                />
              </div>
            ) : null;
          })()}
        </div>
      )}

      {question.type === 'category-selection' && question.categories && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Mode selector */}
          <div className="flex gap-2 p-1.5 bg-gray-100 rounded-xl">
            <button
              onClick={() => handleInputModeChange('categories')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                inputMode === 'categories'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Choose from categories
            </button>
            <button
              onClick={() => handleInputModeChange('text')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                inputMode === 'text'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Enter custom
            </button>
            <button
              onClick={() => handleInputModeChange('unsure')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                inputMode === 'unsure'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Unsure
            </button>
          </div>

          {/* Content based on mode */}
          {inputMode === 'categories' && (() => {
            const revealedNewCategories = NEW_OPTIONS_POOL.slice(0, revealedNewCount);
            const visibleCategories = [
              ...question.categories!.filter(c => !selectedCategories.includes(c)),
              ...revealedNewCategories.filter(c => !selectedCategories.includes(c)),
            ];
            return (
              <div className="space-y-4">
                {/* Selected category badges */}
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryToggle(cat)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-sm font-medium shadow-sm hover:bg-rose-600 transition-all duration-200 animate-in fade-in zoom-in-75"
                      >
                        {cat}
                        <X className="w-3 h-3 opacity-80" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Unselected category grid */}
                <div className="grid grid-cols-2 gap-3">
                  {visibleCategories.map((category) => {
                    const Icon = categoryIcons[category] || Heart;
                    const isNew = NEW_OPTIONS_POOL.includes(category);
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          handleCategoryToggle(category);
                          setRevealedNewCount(prev => Math.min(prev + 1, NEW_OPTIONS_POOL.length));
                        }}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 bg-white text-gray-700 border-gray-200 hover:border-rose-300 hover:shadow-md ${isNew ? 'animate-in slide-in-from-bottom-2 duration-300' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-rose-400" />
                          <span className="font-medium text-sm leading-tight">{category}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {inputMode === 'text' && (
            <textarea
              value={customText}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder="Tell us what you'd like to do or see..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none"
            />
          )}

          {inputMode === 'unsure' && (
            <div className="p-6 bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-200 rounded-xl text-center">
              <Sparkles className="w-8 h-8 text-rose-400 mx-auto mb-3" />
              <p className="text-gray-700 font-medium">
                No problem! Our team will help you plan the perfect itinerary based on your preferences.
              </p>
            </div>
          )}
        </div>
      )}

      {question.type === 'text' && (
        <div className="max-w-xl mx-auto">
          <textarea
            value={value as string || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer here..."
            rows={2}
            maxLength={500}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none"
          />
        </div>
      )}

      {question.type === 'number' && (
        <div className="flex gap-4 max-w-md mx-auto">
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            min="1"
            max="50"
            placeholder="Enter number of travelers"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 text-center text-xl"
          />
        </div>
      )}

      {question.type === 'group-size' && (
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center px-8 py-6">
            {/* Slider track with person icon indicator */}
            <div className="relative w-full max-w-2xl">
              {/* Person icon indicator */}
              <div 
                className="absolute -top-12 transition-all duration-300 ease-out"
                style={{ 
                  left: `${(['1', '2', '3', '4', '5', '6', '7-9', '10+'].indexOf(value as string) / 7) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Slider input */}
              <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={['1', '2', '3', '4', '5', '6', '7-9', '10+'].indexOf(value as string)}
                onChange={(e) => {
                  const options = ['1', '2', '3', '4', '5', '6', '7-9', '10+'];
                  onChange(options[parseInt(e.target.value)]);
                }}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #fb7185 0%, #fb7185 ${((['1', '2', '3', '4', '5', '6', '7-9', '10+'].indexOf(value as string) / 7) * 100)}%, #e5e7eb ${((['1', '2', '3', '4', '5', '6', '7-9', '10+'].indexOf(value as string) / 7) * 100)}%, #e5e7eb 100%)`
                }}
              />
              
              {/* Labels */}
              <div className="relative w-full mt-6">
                <div className="flex justify-between items-center">
                  {['1', '2', '3', '4', '5', '6', '7-9', '10+'].map((option, index) => (
                    <button
                      key={option}
                      onClick={() => onChange(option)}
                      className="flex flex-col items-center gap-1 min-w-[40px] group"
                    >
                      {/* Tick mark */}
                      <div className={`w-0.5 h-3 rounded-full transition-colors ${
                        value === option ? 'bg-rose-500' : 'bg-gray-300 group-hover:bg-rose-300'
                      }`} style={{ marginTop: '-1.25rem' }} />
                      {/* Label */}
                      <span className={`text-sm font-medium transition-colors ${
                        value === option ? 'text-rose-500' : 'text-gray-600 group-hover:text-rose-400'
                      }`}>
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Custom slider styles */}
            <style jsx>{`
              .slider-thumb::-webkit-slider-thumb {
                appearance: none;
                width: 0;
                height: 0;
              }
              .slider-thumb::-moz-range-thumb {
                appearance: none;
                width: 0;
                height: 0;
                border: none;
                background: transparent;
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
}