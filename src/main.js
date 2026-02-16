/**
 * Main Application Logic for Tiny Habit Tracker
 */

import {
  loadHabits,
  addHabit,
  markHabitComplete,
  deleteHabit,
  getHabitStats,
  isCompletedToday
} from './habit.js';

// DOM Elements
const habitForm = document.getElementById('addHabitForm');
const habitInput = document.getElementById('habitInput');
const habitsList = document.getElementById('habitsList');
const emptyState = document.getElementById('emptyState');

// Initialize app
function init() {
  renderHabits();
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  habitForm.addEventListener('submit', handleAddHabit);
}

// Handle adding a new habit
function handleAddHabit(event) {
  event.preventDefault();
  
  const habitName = habitInput.value.trim();
  
  if (!habitName) {
    return;
  }
  
  try {
    addHabit(habitName);
    habitInput.value = '';
    renderHabits();
    
    // Show success feedback
    habitInput.placeholder = '✓ Habit added! Add another...';
    setTimeout(() => {
      habitInput.placeholder = 'Enter a new habit...';
    }, 2000);
  } catch (error) {
    alert('Error adding habit: ' + error.message);
  }
}

// Handle marking habit as complete
function handleMarkComplete(habitId) {
  try {
    markHabitComplete(habitId);
    renderHabits();
  } catch (error) {
    alert('Error marking habit complete: ' + error.message);
  }
}

// Handle deleting a habit
function handleDeleteHabit(habitId, habitName) {
  const confirmed = confirm(`Are you sure you want to delete "${habitName}"?`);
  
  if (confirmed) {
    try {
      deleteHabit(habitId);
      renderHabits();
    } catch (error) {
      alert('Error deleting habit: ' + error.message);
    }
  }
}

// Render all habits
function renderHabits() {
  const habits = loadHabits();
  
  // Show/hide empty state
  if (habits.length === 0) {
    habitsList.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  
  // Render habit cards
  habitsList.innerHTML = habits.map(habit => createHabitCard(habit)).join('');
  
  // Add event listeners to buttons
  habits.forEach(habit => {
    const completeBtn = document.getElementById(`complete-${habit.id}`);
    const deleteBtn = document.getElementById(`delete-${habit.id}`);
    
    if (completeBtn) {
      completeBtn.addEventListener('click', () => handleMarkComplete(habit.id));
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => handleDeleteHabit(habit.id, habit.name));
    }
  });
}

// Create a habit card HTML
function createHabitCard(habit) {
  const stats = getHabitStats(habit);
  const completedClass = stats.completedToday ? 'completed-today' : '';
  const streakBadgeClass = stats.streak > 0 ? 'active' : '';
  
  return `
    <div class="habit-card ${completedClass}">
      <div class="habit-info">
        <div class="habit-name">${escapeHtml(habit.name)}</div>
        <div class="habit-stats">
          <span class="streak-badge ${streakBadgeClass}">
            🔥 ${stats.streak} day${stats.streak !== 1 ? 's' : ''}
          </span>
          <span>•</span>
          <span>${stats.totalCompletions} total</span>
        </div>
      </div>
      <div class="habit-actions">
        <button 
          id="complete-${habit.id}"
          class="btn btn-success" 
          ${stats.completedToday ? 'disabled' : ''}
          title="${stats.completedToday ? 'Already completed today!' : 'Mark as done today'}"
        >
          ${stats.completedToday ? '✓ Done' : 'Done'}
        </button>
        <button 
          id="delete-${habit.id}"
          class="btn btn-delete"
          title="Delete habit"
        >
          ✕
        </button>
      </div>
    </div>
  `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Start the app
init();
