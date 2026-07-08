import { createContext, useContext, useState } from 'react';

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [interviewConfig, setInterviewConfig] = useState({
    domain: 'Java',
    difficulty: 'Intermediate',
    resumeName: 'No resume attached',
    resumeStatus: 'idle',
  });

  return (
    <InterviewContext.Provider value={{ interviewConfig, setInterviewConfig }}>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(InterviewContext);
}
