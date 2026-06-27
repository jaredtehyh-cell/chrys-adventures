import React from 'react';
import { TestQuestion } from '../components/TestQuestion';
import { FINAL_QUESTIONS } from '../lib/gameData';

export default function TestFinal() {
  return (
    <TestQuestion
      questions={FINAL_QUESTIONS}
      title="Final Challenge 🏆"
      backTo="/test"
      progressKey="testFinal"
      accentColor="red"
    />
  );
}
