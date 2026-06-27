import React from 'react';
import { TestQuestion } from '../components/TestQuestion';
import { OPERATIONS_QUESTIONS } from '../lib/gameData';

export default function TestOperations() {
  return (
    <TestQuestion
      questions={OPERATIONS_QUESTIONS}
      title="Operations Test ➕"
      backTo="/test"
      progressKey="testOperations"
      accentColor="orange"
    />
  );
}
