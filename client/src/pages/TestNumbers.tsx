import React from 'react';
import { TestQuestion } from '../components/TestQuestion';
import { NUMBERS_QUESTIONS } from '../lib/gameData';

export default function TestNumbers() {
  return (
    <TestQuestion
      questions={NUMBERS_QUESTIONS}
      title="Numbers Test 🔢"
      backTo="/test"
      progressKey="testNumbers"
      accentColor="sky"
    />
  );
}
