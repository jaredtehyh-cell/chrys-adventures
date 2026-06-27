export interface PlayerProgress {
  completed: boolean;
  stars: number;
  lessonsCompleted: number[];
}

export interface PlayerTestProgress {
  completed: boolean;
  stars: number;
  score: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: 'monkey' | 'lion' | 'rabbit' | 'dog';
  starsTotal: number;
  progress: {
    numbers: PlayerProgress;
    operations: PlayerProgress;
    realworld: PlayerProgress;
    testNumbers: PlayerTestProgress;
    testOperations: PlayerTestProgress;
    testRealworld: PlayerTestProgress;
    testFinal: PlayerTestProgress;
  };
}

export const NUMBER_NAMES = [
  'zero','one','two','three','four','five','six','seven','eight','nine',
  'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty',
];

export const PRAISE_MESSAGES = [
  "Brilliant! 🌟", "You're a math superstar!", "Chrys is SO proud of you!",
  "Keep going, champ!", "Wow, look at you go!", "Amazing work!",
  "You got it! That's right!", "Super smart!", "Fantastic!", "Outstanding!",
  "You're on fire! 🔥", "That's correct!", "Excellent thinking!", "Yes! Well done!",
];

export const WRONG_MESSAGES = [
  "Nice try! The answer is", "Almost! The right answer is",
  "Good effort! It's actually", "Keep trying! The answer was",
];

/* ─── Visual types ─── */
export type QuestionVisual =
  | { kind: 'count';       emoji: string; n: number }
  | { kind: 'sequence';    nums: (number | string)[] }
  | { kind: 'equation';    lhs: number; op: '+' | '−'; rhs: number }
  | { kind: 'split';       leftEmoji: string; leftN: number; op: '+' | '−'; rightEmoji: string; rightN: number }
  | { kind: 'number';      value: number }
  | { kind: 'dot-array';   n: number }
  | { kind: 'number-line'; marked: number; max: number }
  | { kind: 'missing';     lhs: number | null; op: '+' | '−'; rhs: number | null; result: number };

export interface Question {
  id: string;
  type: 'multiple-choice';
  text: string;
  options: (string | number)[];
  correctAnswer: string | number;
  hint?: string;
  visual?: QuestionVisual;
}

/* ─── Numbers Bank (50 questions, 0–19) ─── */
export const NUMBERS_QUESTIONS: Question[] = [
  { id: 'n1',  type: 'multiple-choice', text: 'Which number comes after 5?',              options: [4,5,6,7],                       correctAnswer: 6,       visual: { kind: 'sequence', nums: [3,4,5,'?'] } },
  { id: 'n2',  type: 'multiple-choice', text: 'Which number is bigger — 3 or 7?',         options: [1,3,5,7],                       correctAnswer: 7,       visual: { kind: 'dot-array', n: 7 } },
  { id: 'n3',  type: 'multiple-choice', text: 'What number comes before 9?',               options: [6,7,8,9],                       correctAnswer: 8,       visual: { kind: 'sequence', nums: [6,7,'?',9] } },
  { id: 'n4',  type: 'multiple-choice', text: 'Which number is smaller — 4 or 2?',        options: [1,2,4,6],                       correctAnswer: 2,       visual: { kind: 'dot-array', n: 4 } },
  { id: 'n5',  type: 'multiple-choice', text: 'What is the biggest number here?',          options: [2,5,8,4],                       correctAnswer: 8,       visual: { kind: 'sequence', nums: [2,4,5,8] } },
  { id: 'n6',  type: 'multiple-choice', text: 'Fill the blank: 1, 2, 3, ___',             options: [2,4,5,6],                       correctAnswer: 4,       visual: { kind: 'sequence', nums: [1,2,3,'?'] } },
  { id: 'n7',  type: 'multiple-choice', text: 'How many bananas are there?',               options: [2,3,4,5],                       correctAnswer: 4,       visual: { kind: 'count', emoji: '🍌', n: 4 } },
  { id: 'n8',  type: 'multiple-choice', text: 'What is the word for the number 6?',        options: ['four','five','six','seven'],    correctAnswer: 'six',   visual: { kind: 'number', value: 6 } },
  { id: 'n9',  type: 'multiple-choice', text: 'Which number comes after 8?',               options: [7,8,9,10],                      correctAnswer: 9,       visual: { kind: 'sequence', nums: [6,7,8,'?'] } },
  { id: 'n10', type: 'multiple-choice', text: 'Count the dots in the frame!',              options: [1,2,3,4],                       correctAnswer: 3,       visual: { kind: 'dot-array', n: 3 } },
  { id: 'n11', type: 'multiple-choice', text: 'Which is the smallest number?',             options: [7,4,9,1],                       correctAnswer: 1,       visual: { kind: 'sequence', nums: [1,4,7,9] } },
  { id: 'n12', type: 'multiple-choice', text: 'What number comes before 5?',               options: [3,4,5,6],                       correctAnswer: 4,       visual: { kind: 'sequence', nums: ['?',5,6,7] } },
  { id: 'n13', type: 'multiple-choice', text: 'ZERO means…',                               options: ['one thing','two things','nothing','everything'], correctAnswer: 'nothing', visual: { kind: 'number', value: 0 } },
  { id: 'n14', type: 'multiple-choice', text: 'Count the dots!',                           options: [4,5,6,7],                       correctAnswer: 6,       visual: { kind: 'dot-array', n: 6 } },
  { id: 'n15', type: 'multiple-choice', text: 'Which is greater — 8 or 5?',               options: [3,5,8,9],                       correctAnswer: 8,       visual: { kind: 'dot-array', n: 8 } },
  { id: 'n16', type: 'multiple-choice', text: 'What is the word for 9?',                   options: ['seven','eight','nine','ten'],   correctAnswer: 'nine',  visual: { kind: 'number', value: 9 } },
  { id: 'n17', type: 'multiple-choice', text: 'Fill in: 6, 7, 8, ___',                    options: [7,8,9,10],                      correctAnswer: 9,       visual: { kind: 'sequence', nums: [6,7,8,'?'] } },
  { id: 'n18', type: 'multiple-choice', text: 'Which number is between 3 and 5?',          options: [2,4,6,7],                       correctAnswer: 4,       visual: { kind: 'number-line', marked: 4, max: 8 } },
  { id: 'n19', type: 'multiple-choice', text: 'How many fingers on one hand?',             options: [3,4,5,6],                       correctAnswer: 5,       visual: { kind: 'dot-array', n: 5 } },
  { id: 'n20', type: 'multiple-choice', text: 'Which is greater — 0 or 9?',               options: [0,3,6,9],                       correctAnswer: 9,       visual: { kind: 'sequence', nums: [0,9] } },
  { id: 'n21', type: 'multiple-choice', text: 'What number comes after 6?',                options: [5,6,7,8],                       correctAnswer: 7,       visual: { kind: 'sequence', nums: [4,5,6,'?'] } },
  { id: 'n22', type: 'multiple-choice', text: 'Count the dots!',                           options: [5,6,7,8],                       correctAnswer: 7,       visual: { kind: 'dot-array', n: 7 } },
  { id: 'n23', type: 'multiple-choice', text: 'Which number is less than 4?',              options: [4,5,6,3],                       correctAnswer: 3,       visual: { kind: 'number-line', marked: 3, max: 6 } },
  { id: 'n24', type: 'multiple-choice', text: 'Fill in: 1, 2, 3, 4, ___',                 options: [3,4,5,6],                       correctAnswer: 5,       visual: { kind: 'sequence', nums: [1,2,3,4,'?'] } },
  { id: 'n25', type: 'multiple-choice', text: 'What is the word for 2?',                   options: ['one','two','three','four'],     correctAnswer: 'two',   visual: { kind: 'number', value: 2 } },
  { id: 'n26', type: 'multiple-choice', text: 'Count the dots in the frame!',              options: [6,7,8,9],                       correctAnswer: 8,       visual: { kind: 'dot-array', n: 8 } },
  { id: 'n27', type: 'multiple-choice', text: 'What is the word for 4?',                   options: ['two','three','four','five'],    correctAnswer: 'four',  visual: { kind: 'number', value: 4 } },
  { id: 'n28', type: 'multiple-choice', text: 'Fill in: 0, 1, 2, ___',                    options: [0,1,2,3],                       correctAnswer: 3,       visual: { kind: 'sequence', nums: [0,1,2,'?'] } },
  { id: 'n29', type: 'multiple-choice', text: 'What comes before 7?',                      options: [5,6,7,8],                       correctAnswer: 6,       visual: { kind: 'number-line', marked: 6, max: 10 } },
  { id: 'n30', type: 'multiple-choice', text: 'Count the dots!',                           options: [3,4,5,6],                       correctAnswer: 5,       visual: { kind: 'dot-array', n: 5 } },
  /* Teen numbers */
  { id: 'n31', type: 'multiple-choice', text: 'What number comes after 10?',               options: [9,10,11,12],                    correctAnswer: 11,      visual: { kind: 'sequence', nums: [8,9,10,'?'] } },
  { id: 'n32', type: 'multiple-choice', text: 'What is the word for 10?',                  options: ['nine','ten','eleven','twelve'], correctAnswer: 'ten',   visual: { kind: 'number', value: 10 } },
  { id: 'n33', type: 'multiple-choice', text: 'Count the dots!',                           options: [9,10,11,12],                    correctAnswer: 10,      visual: { kind: 'dot-array', n: 10 } },
  { id: 'n34', type: 'multiple-choice', text: 'Fill in: 10, 11, 12, ___',                 options: [11,12,13,14],                   correctAnswer: 13,      visual: { kind: 'sequence', nums: [10,11,12,'?'] } },
  { id: 'n35', type: 'multiple-choice', text: 'What number comes before 15?',              options: [12,13,14,15],                   correctAnswer: 14,      visual: { kind: 'number-line', marked: 14, max: 18 } },
  { id: 'n36', type: 'multiple-choice', text: 'Which is bigger — 12 or 15?',              options: [10,12,14,15],                   correctAnswer: 15,      visual: { kind: 'sequence', nums: [12,15] } },
  { id: 'n37', type: 'multiple-choice', text: 'What is the word for 13?',                  options: ['eleven','twelve','thirteen','fourteen'], correctAnswer: 'thirteen', visual: { kind: 'number', value: 13 } },
  { id: 'n38', type: 'multiple-choice', text: 'Count the dots!',                           options: [10,11,12,13],                   correctAnswer: 12,      visual: { kind: 'dot-array', n: 12 } },
  { id: 'n39', type: 'multiple-choice', text: 'Fill in: 13, 14, 15, ___',                 options: [14,15,16,17],                   correctAnswer: 16,      visual: { kind: 'sequence', nums: [13,14,15,'?'] } },
  { id: 'n40', type: 'multiple-choice', text: 'Which number is between 17 and 19?',        options: [15,16,18,20],                   correctAnswer: 18,      visual: { kind: 'number-line', marked: 18, max: 20 } },
  { id: 'n41', type: 'multiple-choice', text: 'What is the word for 16?',                  options: ['fourteen','fifteen','sixteen','seventeen'], correctAnswer: 'sixteen', visual: { kind: 'number', value: 16 } },
  { id: 'n42', type: 'multiple-choice', text: 'Count the dots!',                           options: [13,14,15,16],                   correctAnswer: 14,      visual: { kind: 'dot-array', n: 14 } },
  { id: 'n43', type: 'multiple-choice', text: 'What comes after 18?',                      options: [17,18,19,20],                   correctAnswer: 19,      visual: { kind: 'sequence', nums: [16,17,18,'?'] } },
  { id: 'n44', type: 'multiple-choice', text: 'Which number is smallest: 11, 17, 14?',    options: [11,14,15,17],                   correctAnswer: 11,      visual: { kind: 'sequence', nums: [11,14,17] } },
  { id: 'n45', type: 'multiple-choice', text: 'What comes before 11?',                     options: [8,9,10,11],                     correctAnswer: 10,      visual: { kind: 'number-line', marked: 10, max: 14 } },
  { id: 'n46', type: 'multiple-choice', text: 'Count the dots!',                           options: [7,8,9,10],                      correctAnswer: 9,       visual: { kind: 'dot-array', n: 9 } },
  { id: 'n47', type: 'multiple-choice', text: 'What number is 10 + 5?',                    options: [13,14,15,16],                   correctAnswer: 15,      visual: { kind: 'dot-array', n: 15 } },
  { id: 'n48', type: 'multiple-choice', text: 'Which is bigger — 18 or 11?',              options: [11,14,17,18],                   correctAnswer: 18,      visual: { kind: 'sequence', nums: [11,18] } },
  { id: 'n49', type: 'multiple-choice', text: 'Fill in: 15, 16, 17, ___',                 options: [16,17,18,19],                   correctAnswer: 18,      visual: { kind: 'sequence', nums: [15,16,17,'?'] } },
  { id: 'n50', type: 'multiple-choice', text: 'What number is shown?',                     options: [10,11,12,13],                   correctAnswer: 11,      visual: { kind: 'dot-array', n: 11 } },
];

/* ─── Operations Bank (50 questions, up to 20) ─── */
export const OPERATIONS_QUESTIONS: Question[] = [
  { id: 'o1',  type: 'multiple-choice', text: '2 + 3 = ?',                                                     options: [4,5,6,7],      correctAnswer: 5,  visual: { kind: 'equation', lhs: 2, op: '+', rhs: 3 } },
  { id: 'o2',  type: 'multiple-choice', text: '7 − 4 = ?',                                                     options: [2,3,4,5],      correctAnswer: 3,  visual: { kind: 'equation', lhs: 7, op: '−', rhs: 4 } },
  { id: 'o3',  type: 'multiple-choice', text: '4 + 4 = ?',                                                     options: [6,7,8,9],      correctAnswer: 8,  visual: { kind: 'equation', lhs: 4, op: '+', rhs: 4 } },
  { id: 'o4',  type: 'multiple-choice', text: 'Chrys had 5 bananas and ate 2. How many are left?',             options: [2,3,4,5],      correctAnswer: 3,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 5, op: '−', rightEmoji: '🍌', rightN: 2 } },
  { id: 'o5',  type: 'multiple-choice', text: '9 + 1 = ?',                                                     options: [9,10,11,12],   correctAnswer: 10, visual: { kind: 'equation', lhs: 9, op: '+', rhs: 1 } },
  { id: 'o6',  type: 'multiple-choice', text: '8 − 3 = ?',                                                     options: [3,4,5,6],      correctAnswer: 5,  visual: { kind: 'equation', lhs: 8, op: '−', rhs: 3 } },
  { id: 'o7',  type: 'multiple-choice', text: '3 + 6 = ?',                                                     options: [7,8,9,10],     correctAnswer: 9,  visual: { kind: 'equation', lhs: 3, op: '+', rhs: 6 } },
  { id: 'o8',  type: 'multiple-choice', text: 'Chrys has 6 bananas and gives 2 away. How many remain?',        options: [3,4,5,6],      correctAnswer: 4,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 6, op: '−', rightEmoji: '🍌', rightN: 2 } },
  { id: 'o9',  type: 'multiple-choice', text: '1 + 7 = ?',                                                     options: [6,7,8,9],      correctAnswer: 8,  visual: { kind: 'equation', lhs: 1, op: '+', rhs: 7 } },
  { id: 'o10', type: 'multiple-choice', text: '9 − 5 = ?',                                                     options: [3,4,5,6],      correctAnswer: 4,  visual: { kind: 'equation', lhs: 9, op: '−', rhs: 5 } },
  { id: 'o11', type: 'multiple-choice', text: 'Chrys found 3 bananas then 4 more. Total?',                     options: [5,6,7,8],      correctAnswer: 7,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 3, op: '+', rightEmoji: '🍌', rightN: 4 } },
  { id: 'o12', type: 'multiple-choice', text: '6 − 6 = ?',                                                     options: [0,1,2,3],      correctAnswer: 0,  visual: { kind: 'equation', lhs: 6, op: '−', rhs: 6 } },
  { id: 'o13', type: 'multiple-choice', text: '5 + 4 = ?',                                                     options: [7,8,9,10],     correctAnswer: 9,  visual: { kind: 'equation', lhs: 5, op: '+', rhs: 4 } },
  { id: 'o14', type: 'multiple-choice', text: '7 − 2 = ?',                                                     options: [4,5,6,7],      correctAnswer: 5,  visual: { kind: 'equation', lhs: 7, op: '−', rhs: 2 } },
  { id: 'o15', type: 'multiple-choice', text: 'Fill in: ___ + 3 = 8',                                         options: [4,5,6,7],      correctAnswer: 5,  visual: { kind: 'missing', lhs: null, op: '+', rhs: 3, result: 8 } },
  { id: 'o16', type: 'multiple-choice', text: 'Chrys has 8 bananas and gives 5 away. How many left?',          options: [2,3,4,5],      correctAnswer: 3,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 8, op: '−', rightEmoji: '🍌', rightN: 5 } },
  { id: 'o17', type: 'multiple-choice', text: '6 + 7 = ?',                                                     options: [11,12,13,14],  correctAnswer: 13, visual: { kind: 'equation', lhs: 6, op: '+', rhs: 7 } },
  { id: 'o18', type: 'multiple-choice', text: '15 − 6 = ?',                                                    options: [7,8,9,10],     correctAnswer: 9,  visual: { kind: 'equation', lhs: 15, op: '−', rhs: 6 } },
  { id: 'o19', type: 'multiple-choice', text: '8 + 9 = ?',                                                     options: [15,16,17,18],  correctAnswer: 17, visual: { kind: 'equation', lhs: 8, op: '+', rhs: 9 } },
  { id: 'o20', type: 'multiple-choice', text: '12 − 5 = ?',                                                    options: [5,6,7,8],      correctAnswer: 7,  visual: { kind: 'equation', lhs: 12, op: '−', rhs: 5 } },
  { id: 'o21', type: 'multiple-choice', text: '9 + 3 = ?',                                                     options: [10,11,12,13],  correctAnswer: 12, visual: { kind: 'equation', lhs: 9, op: '+', rhs: 3 } },
  { id: 'o22', type: 'multiple-choice', text: 'Chrys picks 4 bananas and finds 6 more. Total?',                options: [8,9,10,11],    correctAnswer: 10, visual: { kind: 'split', leftEmoji: '🍌', leftN: 4, op: '+', rightEmoji: '🍌', rightN: 6 } },
  { id: 'o23', type: 'multiple-choice', text: '0 + 8 = ?',                                                     options: [0,6,7,8],      correctAnswer: 8,  visual: { kind: 'equation', lhs: 0, op: '+', rhs: 8 } },
  { id: 'o24', type: 'multiple-choice', text: 'Fill in: 10 − ___ = 6',                                        options: [2,3,4,5],      correctAnswer: 4,  visual: { kind: 'missing', lhs: 10, op: '−', rhs: null, result: 6 } },
  { id: 'o25', type: 'multiple-choice', text: '8 − 8 = ?',                                                     options: [0,1,2,3],      correctAnswer: 0,  visual: { kind: 'equation', lhs: 8, op: '−', rhs: 8 } },
  { id: 'o26', type: 'multiple-choice', text: '2 + 7 = ?',                                                     options: [7,8,9,10],     correctAnswer: 9,  visual: { kind: 'equation', lhs: 2, op: '+', rhs: 7 } },
  { id: 'o27', type: 'multiple-choice', text: 'Chrys has 9 bananas. 3 fall down. How many left?',              options: [5,6,7,8],      correctAnswer: 6,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 9, op: '−', rightEmoji: '🍌', rightN: 3 } },
  { id: 'o28', type: 'multiple-choice', text: '5 + 5 = ?',                                                     options: [8,9,10,11],    correctAnswer: 10, visual: { kind: 'equation', lhs: 5, op: '+', rhs: 5 } },
  { id: 'o29', type: 'multiple-choice', text: '6 + 3 = ?',                                                     options: [7,8,9,10],     correctAnswer: 9,  visual: { kind: 'equation', lhs: 6, op: '+', rhs: 3 } },
  { id: 'o30', type: 'multiple-choice', text: 'Fill in: ___ + 4 = 11',                                        options: [6,7,8,9],      correctAnswer: 7,  visual: { kind: 'missing', lhs: null, op: '+', rhs: 4, result: 11 } },
  /* Numbers beyond 10 */
  { id: 'o31', type: 'multiple-choice', text: '10 + 4 = ?',                                                    options: [12,13,14,15],  correctAnswer: 14, visual: { kind: 'equation', lhs: 10, op: '+', rhs: 4 } },
  { id: 'o32', type: 'multiple-choice', text: '16 − 7 = ?',                                                    options: [7,8,9,10],     correctAnswer: 9,  visual: { kind: 'equation', lhs: 16, op: '−', rhs: 7 } },
  { id: 'o33', type: 'multiple-choice', text: '7 + 8 = ?',                                                     options: [13,14,15,16],  correctAnswer: 15, visual: { kind: 'equation', lhs: 7, op: '+', rhs: 8 } },
  { id: 'o34', type: 'multiple-choice', text: '18 − 9 = ?',                                                    options: [7,8,9,10],     correctAnswer: 9,  visual: { kind: 'equation', lhs: 18, op: '−', rhs: 9 } },
  { id: 'o35', type: 'multiple-choice', text: 'Fill in: ___ + 6 = 14',                                        options: [6,7,8,9],      correctAnswer: 8,  visual: { kind: 'missing', lhs: null, op: '+', rhs: 6, result: 14 } },
  { id: 'o36', type: 'multiple-choice', text: '11 + 5 = ?',                                                    options: [14,15,16,17],  correctAnswer: 16, visual: { kind: 'equation', lhs: 11, op: '+', rhs: 5 } },
  { id: 'o37', type: 'multiple-choice', text: '14 − 8 = ?',                                                    options: [5,6,7,8],      correctAnswer: 6,  visual: { kind: 'equation', lhs: 14, op: '−', rhs: 8 } },
  { id: 'o38', type: 'multiple-choice', text: '6 + 6 = ?',                                                     options: [10,11,12,13],  correctAnswer: 12, visual: { kind: 'equation', lhs: 6, op: '+', rhs: 6 } },
  { id: 'o39', type: 'multiple-choice', text: '13 − 4 = ?',                                                    options: [7,8,9,10],     correctAnswer: 9,  visual: { kind: 'equation', lhs: 13, op: '−', rhs: 4 } },
  { id: 'o40', type: 'multiple-choice', text: 'Fill in: 17 − ___ = 9',                                        options: [7,8,9,10],     correctAnswer: 8,  visual: { kind: 'missing', lhs: 17, op: '−', rhs: null, result: 9 } },
  { id: 'o41', type: 'multiple-choice', text: '9 + 7 = ?',                                                     options: [14,15,16,17],  correctAnswer: 16, visual: { kind: 'equation', lhs: 9, op: '+', rhs: 7 } },
  { id: 'o42', type: 'multiple-choice', text: '20 − 8 = ?',                                                    options: [10,11,12,13],  correctAnswer: 12, visual: { kind: 'equation', lhs: 20, op: '−', rhs: 8 } },
  { id: 'o43', type: 'multiple-choice', text: '4 + 9 = ?',                                                     options: [11,12,13,14],  correctAnswer: 13, visual: { kind: 'equation', lhs: 4, op: '+', rhs: 9 } },
  { id: 'o44', type: 'multiple-choice', text: '15 − 8 = ?',                                                    options: [5,6,7,8],      correctAnswer: 7,  visual: { kind: 'equation', lhs: 15, op: '−', rhs: 8 } },
  { id: 'o45', type: 'multiple-choice', text: 'Fill in: 8 + ___ = 20',                                        options: [10,11,12,13],  correctAnswer: 12, visual: { kind: 'missing', lhs: 8, op: '+', rhs: null, result: 20 } },
  { id: 'o46', type: 'multiple-choice', text: '3 + 3 = ?',                                                     options: [4,5,6,7],      correctAnswer: 6,  visual: { kind: 'equation', lhs: 3, op: '+', rhs: 3 } },
  { id: 'o47', type: 'multiple-choice', text: '10 + 10 = ?',                                                   options: [18,19,20,21],  correctAnswer: 20, visual: { kind: 'equation', lhs: 10, op: '+', rhs: 10 } },
  { id: 'o48', type: 'multiple-choice', text: '11 − 3 = ?',                                                    options: [6,7,8,9],      correctAnswer: 8,  visual: { kind: 'equation', lhs: 11, op: '−', rhs: 3 } },
  { id: 'o49', type: 'multiple-choice', text: '7 + 6 = ?',                                                     options: [11,12,13,14],  correctAnswer: 13, visual: { kind: 'equation', lhs: 7, op: '+', rhs: 6 } },
  { id: 'o50', type: 'multiple-choice', text: 'Fill in: ___ − 5 = 7',                                         options: [10,11,12,13],  correctAnswer: 12, visual: { kind: 'missing', lhs: null, op: '−', rhs: 5, result: 7 } },
];

/* ─── Real World Bank (40 questions) ─── */
export const REAL_WORLD_QUESTIONS: Question[] = [
  { id: 'r1',  type: 'multiple-choice', text: 'Chrys has 3 bananas in one hand and 4 in the other. How many in total?',   options: [5,6,7,8],    correctAnswer: 7,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 3, op: '+', rightEmoji: '🍌', rightN: 4 } },
  { id: 'r2',  type: 'multiple-choice', text: '8 birds sit on a tree. 3 fly away. How many stay?',                        options: [4,5,6,7],    correctAnswer: 5,  visual: { kind: 'split', leftEmoji: '🐦', leftN: 8, op: '−', rightEmoji: '🐦', rightN: 3 } },
  { id: 'r3',  type: 'multiple-choice', text: 'You buy a toy for 4 coins and another for 3 coins. Total coins spent?',    options: [5,6,7,8],    correctAnswer: 7,  visual: { kind: 'split', leftEmoji: '🪙', leftN: 4, op: '+', rightEmoji: '🪙', rightN: 3 } },
  { id: 'r4',  type: 'multiple-choice', text: 'Chrys picks 4 bananas in the morning and 5 in the afternoon. Total?',     options: [7,8,9,10],   correctAnswer: 9,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 4, op: '+', rightEmoji: '🍌', rightN: 5 } },
  { id: 'r5',  type: 'multiple-choice', text: '7 fish in a pond. 4 swim away. How many are left?',                        options: [2,3,4,5],    correctAnswer: 3,  visual: { kind: 'split', leftEmoji: '🐟', leftN: 7, op: '−', rightEmoji: '🐟', rightN: 4 } },
  { id: 'r6',  type: 'multiple-choice', text: 'A basket has 6 bananas. Chrys eats 2. How many remain?',                   options: [3,4,5,6],    correctAnswer: 4,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 6, op: '−', rightEmoji: '🍌', rightN: 2 } },
  { id: 'r7',  type: 'multiple-choice', text: 'Chrys sees 5 monkeys in one tree and 3 in another. Total?',                options: [6,7,8,9],    correctAnswer: 8,  visual: { kind: 'split', leftEmoji: '🐒', leftN: 5, op: '+', rightEmoji: '🐒', rightN: 3 } },
  { id: 'r8',  type: 'multiple-choice', text: '9 balloons. 5 float away. How many left?',                                 options: [3,4,5,6],    correctAnswer: 4,  visual: { kind: 'split', leftEmoji: '🎈', leftN: 9, op: '−', rightEmoji: '🎈', rightN: 5 } },
  { id: 'r9',  type: 'multiple-choice', text: 'Chrys has 2 bananas. His friend gives him 7 more. Total?',                 options: [7,8,9,10],   correctAnswer: 9,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 2, op: '+', rightEmoji: '🍌', rightN: 7 } },
  { id: 'r10', type: 'multiple-choice', text: '10 coconuts. Chrys uses 3. How many left?',                                options: [6,7,8,9],    correctAnswer: 7,  visual: { kind: 'split', leftEmoji: '🥥', leftN: 10, op: '−', rightEmoji: '🥥', rightN: 3 } },
  { id: 'r11', type: 'multiple-choice', text: '6 boys and 5 girls in class. How many students in total?',                 options: [9,10,11,12], correctAnswer: 11, visual: { kind: 'split', leftEmoji: '👦', leftN: 6, op: '+', rightEmoji: '👧', rightN: 5 } },
  { id: 'r12', type: 'multiple-choice', text: 'Chrys has 8 stickers. He gives 3 to a friend. How many does he keep?',    options: [4,5,6,7],    correctAnswer: 5,  visual: { kind: 'split', leftEmoji: '🌟', leftN: 8, op: '−', rightEmoji: '🌟', rightN: 3 } },
  { id: 'r13', type: 'multiple-choice', text: '4 cats and 6 dogs at the park. How many animals total?',                   options: [8,9,10,11],  correctAnswer: 10, visual: { kind: 'split', leftEmoji: '🐱', leftN: 4, op: '+', rightEmoji: '🐶', rightN: 6 } },
  { id: 'r14', type: 'multiple-choice', text: 'Chrys collects 7 shells. He loses 2. How many left?',                      options: [4,5,6,7],    correctAnswer: 5,  visual: { kind: 'split', leftEmoji: '🐚', leftN: 7, op: '−', rightEmoji: '🐚', rightN: 2 } },
  { id: 'r15', type: 'multiple-choice', text: '5 red flowers and 8 yellow flowers. Total flowers?',                        options: [11,12,13,14],correctAnswer: 13, visual: { kind: 'split', leftEmoji: '🌸', leftN: 5, op: '+', rightEmoji: '🌻', rightN: 8 } },
  { id: 'r16', type: 'multiple-choice', text: 'Chrys bakes 9 cookies. He eats 4. How many cookies are left?',             options: [4,5,6,7],    correctAnswer: 5,  visual: { kind: 'split', leftEmoji: '🍪', leftN: 9, op: '−', rightEmoji: '🍪', rightN: 4 } },
  { id: 'r17', type: 'multiple-choice', text: 'A box holds 6 pencils. 3 are used up. How many remain?',                   options: [2,3,4,5],    correctAnswer: 3,  visual: { kind: 'split', leftEmoji: '✏️', leftN: 6, op: '−', rightEmoji: '✏️', rightN: 3 } },
  { id: 'r18', type: 'multiple-choice', text: 'Chrys sees 4 butterflies, then 5 more land. Total?',                       options: [7,8,9,10],   correctAnswer: 9,  visual: { kind: 'split', leftEmoji: '🦋', leftN: 4, op: '+', rightEmoji: '🦋', rightN: 5 } },
  { id: 'r19', type: 'multiple-choice', text: '12 mangoes. Chrys shares 5. How many are left?',                           options: [6,7,8,9],    correctAnswer: 7,  visual: { kind: 'split', leftEmoji: '🥭', leftN: 12, op: '−', rightEmoji: '🥭', rightN: 5 } },
  { id: 'r20', type: 'multiple-choice', text: '3 boats near 5 boats. How many boats in total?',                           options: [6,7,8,9],    correctAnswer: 8,  visual: { kind: 'split', leftEmoji: '⛵', leftN: 3, op: '+', rightEmoji: '⛵', rightN: 5 } },
  { id: 'r21', type: 'multiple-choice', text: 'Chrys has 5 bananas and finds 3 more. Total?',                             options: [6,7,8,9],    correctAnswer: 8,  visual: { kind: 'split', leftEmoji: '🍌', leftN: 5, op: '+', rightEmoji: '🍌', rightN: 3 } },
  { id: 'r22', type: 'multiple-choice', text: '10 frogs. 4 jump away. How many stay?',                                    options: [5,6,7,8],    correctAnswer: 6,  visual: { kind: 'split', leftEmoji: '🐸', leftN: 10, op: '−', rightEmoji: '🐸', rightN: 4 } },
  { id: 'r23', type: 'multiple-choice', text: 'Chrys has 3 books and buys 6 more. Total?',                                options: [7,8,9,10],   correctAnswer: 9,  visual: { kind: 'split', leftEmoji: '📚', leftN: 3, op: '+', rightEmoji: '📚', rightN: 6 } },
  { id: 'r24', type: 'multiple-choice', text: '8 apples. 5 are eaten. How many left?',                                    options: [2,3,4,5],    correctAnswer: 3,  visual: { kind: 'split', leftEmoji: '🍎', leftN: 8, op: '−', rightEmoji: '🍎', rightN: 5 } },
  { id: 'r25', type: 'multiple-choice', text: 'Chrys counts 7 stars then sees 4 more. Total?',                            options: [9,10,11,12], correctAnswer: 11, visual: { kind: 'split', leftEmoji: '⭐', leftN: 7, op: '+', rightEmoji: '⭐', rightN: 4 } },
  /* More word problems with larger numbers */
  { id: 'r26', type: 'multiple-choice', text: '14 birds. 6 fly away. How many stay?',                                     options: [6,7,8,9],    correctAnswer: 8,  visual: { kind: 'split', leftEmoji: '🐦', leftN: 14, op: '−', rightEmoji: '🐦', rightN: 6 } },
  { id: 'r27', type: 'multiple-choice', text: 'Chrys collects 8 red berries and 7 blue berries. Total?',                  options: [13,14,15,16],correctAnswer: 15, visual: { kind: 'split', leftEmoji: '🍓', leftN: 8, op: '+', rightEmoji: '🫐', rightN: 7 } },
  { id: 'r28', type: 'multiple-choice', text: '15 mangoes in a basket. Chrys eats 7. How many left?',                     options: [6,7,8,9],    correctAnswer: 8,  visual: { kind: 'split', leftEmoji: '🥭', leftN: 15, op: '−', rightEmoji: '🥭', rightN: 7 } },
  { id: 'r29', type: 'multiple-choice', text: 'Chrys sees 9 monkeys in the morning and 6 in the afternoon. Total?',      options: [13,14,15,16],correctAnswer: 15, visual: { kind: 'split', leftEmoji: '🐒', leftN: 9, op: '+', rightEmoji: '🐒', rightN: 6 } },
  { id: 'r30', type: 'multiple-choice', text: 'There are 18 fish. 9 swim away. How many remain?',                         options: [7,8,9,10],   correctAnswer: 9,  visual: { kind: 'split', leftEmoji: '🐟', leftN: 18, op: '−', rightEmoji: '🐟', rightN: 9 } },
  { id: 'r31', type: 'multiple-choice', text: 'Chrys has 10 coins and earns 6 more. Total?',                              options: [14,15,16,17],correctAnswer: 16, visual: { kind: 'split', leftEmoji: '🪙', leftN: 10, op: '+', rightEmoji: '🪙', rightN: 6 } },
  { id: 'r32', type: 'multiple-choice', text: '20 flowers in a vase. 11 wilt. How many are fresh?',                       options: [8,9,10,11],  correctAnswer: 9,  visual: { kind: 'split', leftEmoji: '🌸', leftN: 20, op: '−', rightEmoji: '🌸', rightN: 11 } },
  { id: 'r33', type: 'multiple-choice', text: 'Chrys earns 8 stars on Monday and 7 on Tuesday. Total?',                   options: [13,14,15,16],correctAnswer: 15, visual: { kind: 'split', leftEmoji: '⭐', leftN: 8, op: '+', rightEmoji: '⭐', rightN: 7 } },
  { id: 'r34', type: 'multiple-choice', text: '13 cookies in a jar. Chrys eats 6. How many left?',                        options: [5,6,7,8],    correctAnswer: 7,  visual: { kind: 'split', leftEmoji: '🍪', leftN: 13, op: '−', rightEmoji: '🍪', rightN: 6 } },
  { id: 'r35', type: 'multiple-choice', text: 'Chrys plants 7 trees and his friend plants 8. Total trees?',               options: [13,14,15,16],correctAnswer: 15, visual: { kind: 'split', leftEmoji: '🌳', leftN: 7, op: '+', rightEmoji: '🌳', rightN: 8 } },
];

export const FINAL_QUESTIONS: Question[] = [
  ...NUMBERS_QUESTIONS.slice(0, 6),
  ...OPERATIONS_QUESTIONS.slice(0, 6),
  ...REAL_WORLD_QUESTIONS.slice(0, 6),
];
