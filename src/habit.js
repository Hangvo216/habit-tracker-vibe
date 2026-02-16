/**
 * Data Model and Storage Utilities for Habit Tracker
 */

const STORAGE_KEY = 'habitTracker_habits';

/**
 * Habit structure:
 * {
 *   id: string (timestamp-based)
 *   name: string
 *   createdAt: string (ISO date)
 *   completions: string[] (ISO dates of completion)
 * }
 */

// Get today's date in YYYY-MM-DD format
export function getTodayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Calculate streak from completion dates
export function calculateStreak(completions) {
  if (!completions || completions.length === 0) return 0;
  
  // Sort dates in descending order (most recent first)
  const sortedDates = [...completions].sort((a, b) => new Date(b) - new Date(a));
  
  let streak = 0;
  let currentDate = new Date(getTodayString());
  
  // Check if completed today or yesterday to start counting
  const mostRecentCompletion = new Date(sortedDates[0]);
  const daysDiff = Math.floor((currentDate - mostRecentCompletion) / (1000 * 60 * 60 * 24));
  
  if (daysDiff > 1) {
    return 0; // Streak broken
  }
  
  // Count consecutive days backwards
  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(currentDate.getDate() - i);
    const expectedDateString = expectedDate.toISOString().split('T')[0];
    
    if (sortedDates[i] === expectedDateString) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

// Check if habit was completed today
export function isCompletedToday(habit) {
  if (!habit.completions) return false;
  return habit.completions.includes(getTodayString());
}

// Load all habits from localStorage
export function loadHabits() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
}

// Save habits to localStorage
export function saveHabits(habits) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    return true;
  } catch (error) {
    console.error('Error saving habits:', error);
    return false;
  }
}

// Add a new habit
export function addHabit(name) {
  if (!name || name.trim() === '') {
    throw new Error('Habit name cannot be empty');
  }
  
  const habits = loadHabits();
  const newHabit = {
    id: Date.now().toString(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
    completions: []
  };
  
  habits.push(newHabit);
  saveHabits(habits);
  return newHabit;
}

// Mark habit as completed today
export function markHabitComplete(habitId) {
  const habits = loadHabits();
  const habit = habits.find(h => h.id === habitId);
  
  if (!habit) {
    throw new Error('Habit not found');
  }
  
  const today = getTodayString();
  
  // Don't add if already completed today
  if (!habit.completions.includes(today)) {
    habit.completions.push(today);
    saveHabits(habits);
  }
  
  return habit;
}

// Delete a habit
export function deleteHabit(habitId) {
  const habits = loadHabits();
  const filteredHabits = habits.filter(h => h.id !== habitId);
  saveHabits(filteredHabits);
  return true;
}

// Get habit statistics
export function getHabitStats(habit) {
  return {
    streak: calculateStreak(habit.completions),
    totalCompletions: habit.completions ? habit.completions.length : 0,
    completedToday: isCompletedToday(habit)
  };
}
