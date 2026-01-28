import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedIntro } from './components/AnimatedIntro';
import { HomePage } from './components/HomePage';
import { SignupScreen } from './components/SignupScreen';
import { LoginScreen } from './components/LoginScreen';
import { BasicDetails } from './components/BasicDetails';
import { PCODScreen } from './components/PCODScreen';
import { LastPeriodDate } from './components/LastPeriodDate';
import { PeriodSymptoms } from './components/PeriodSymptoms';
import { CycleDetails } from './components/CycleDetails';
import { SuccessScreen } from './components/SuccessScreen';
import { SymptomLogScreen } from './components/SymptomLogScreen';
import { MoodLogScreen } from './components/MoodLogScreen';
import { ChatBot } from './components/ChatBot';


function App() {
  const [view, setView] = useState('intro'); // intro, home, signup, login, questions, symptomLog, moodLog
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(0); // For question flow

  const [formData, setFormData] = useState({
    age: '',
    heightValue: '',
    heightUnit: 'cm',
    heightFeet: '',
    heightInches: '',
    weightValue: '',
    weightUnit: 'kg',
    pcod: '',
    lastPeriod: '',
    symptoms: [],
    periodDuration: '',
    cycleLength: '',
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Data Persistence State
  const [symptomLogs, setSymptomLogs] = useState({}); // { 'YYYY-MM-DD': ['headache', 'cramps'] }
  const [moodLogs, setMoodLogs] = useState({});       // { 'YYYY-MM-DD': 'happy' }

  // Flow Handlers
  const handleIntroComplete = () => {
    setView('home');
  };

  const handleSignupClick = () => {
    setView('signup');
  };

  const handleLoginClick = () => {
    setView('login');
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  const handleSignupSuccess = () => {
    // Navigate to questions immediately after signup
    setView('questions');
    setStep(0);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setView('home');
  };

  const handleQuestionsComplete = () => {
    setIsLoggedIn(true);
    setView('home');
  };

  // Logging Handlers
  const handleLogSymptomsClick = () => setView('symptomLog');
  const handleLogMoodClick = () => setView('moodLog');
  const handleBackToHome = () => setView('home');

  const handleSaveSymptomLog = (date, symptoms) => {
    setSymptomLogs(prev => ({
      ...prev,
      [date]: symptoms
    }));
    setView('home');
  };

  const handleSaveMoodLog = (date, mood) => {
    setMoodLogs(prev => ({
      ...prev,
      [date]: mood
    }));
    setView('home');
  };

  // Question Steps
  const questionSteps = [
    { component: BasicDetails, props: { formData, updateFormData, onNext: nextStep } },
    { component: PCODScreen, props: { formData, updateFormData, onNext: nextStep, onBack: prevStep } },
    { component: LastPeriodDate, props: { formData, updateFormData, onNext: nextStep, onBack: prevStep } },
    { component: PeriodSymptoms, props: { formData, updateFormData, onNext: nextStep, onBack: prevStep } },
    { component: CycleDetails, props: { formData, updateFormData, onNext: nextStep, onBack: prevStep } },
    { component: SuccessScreen, props: { onContinue: handleQuestionsComplete } },
  ];

  // Render Logic
  const renderContent = () => {
    if (view === 'intro') {
      return <AnimatedIntro onComplete={handleIntroComplete} />;
    }

    if (view === 'signup') {
      return <SignupScreen onSignupSuccess={handleSignupSuccess} />;
    }

    if (view === 'login') {
      return (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onGoToSignup={handleSignupClick}
        />
      );
    }

    if (view === 'symptomLog') {
      return (
        <SymptomLogScreen
          onSave={handleSaveSymptomLog}
          onBack={handleBackToHome}
          historyLog={symptomLogs}
        />
      );
    }

    if (view === 'moodLog') {
      return (
        <MoodLogScreen
          onSave={handleSaveMoodLog}
          onBack={handleBackToHome}
          historyLog={moodLogs}
        />
      );
    }

    if (view === 'questions') {
      if (step >= questionSteps.length) {
        handleQuestionsComplete();
        return null;
      }

      const CurrentComponent = questionSteps[step].component;

      return (
        <div className="min-h-screen w-full bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg mx-auto"
            >
              <CurrentComponent {...questionSteps[step].props} />
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator for questions only */}
          {step < questionSteps.length - 1 && (
            <div className="flex gap-2 mt-8">
              {questionSteps.slice(0, -1).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#FF6F91]' : i < step ? 'w-2 bg-[#FFD6E0]' : 'w-2 bg-slate-200'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    // Default: Home (Logged in or out state handled inside HomePage)
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        userData={formData}
        onSignup={handleSignupClick}
        onLogin={handleLoginClick}
        onLogout={handleLogoutClick}
        onLogSymptoms={handleLogSymptomsClick}
        onLogMood={handleLogMoodClick}
      />
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      {isLoggedIn && <ChatBot />}
    </>

  );
}

export default App;
