import React from 'react';
import { TestQuestion } from '../components/TestQuestion';
import { REAL_WORLD_QUESTIONS } from '../lib/gameData';

export default function TestRealWorld() {
  return (
    <TestQuestion
      questions={REAL_WORLD_QUESTIONS}
      title="Real World Test 🌍"
      backTo="/test"
      progressKey="testRealworld"
      accentColor="emerald"
    />
  );
}
