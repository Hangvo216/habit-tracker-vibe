# 🎯 Tiny Habit Tracker

A simple, lightweight habit tracker that helps you build consistency one day at a time. Track your habits, build streaks, and watch your progress grow!

## Features

✅ **Add Habits** - Quickly add any habit you want to track  
✅ **Daily Tracking** - Mark habits as "done" each day  
✅ **Streak Counter** - See your consecutive day streaks with fire emoji 🔥  
✅ **Total Count** - Track total completions for each habit  
✅ **Persistent Storage** - All data saved locally in your browser (no backend needed)  
✅ **Responsive Design** - Works beautifully on mobile and desktop  
✅ **Clean UI** - Minimalist, distraction-free interface  

## Usage

### Running the App

1. Simply open `index.html` in your web browser
2. Or use a local server:
   ```bash
   npx serve .
   ```
   Then open http://localhost:3000

### Adding a Habit

1. Type your habit name in the input field (e.g., "Drink water", "Exercise", "Read")
2. Click "Add Habit" or press Enter
3. Your habit appears in the list below

### Marking Habits Complete

1. Click the "Done" button next to any habit
2. The button changes to "✓ Done" and is disabled for the day
3. Your streak counter updates automatically
4. The card gets a green background to indicate completion

### Deleting Habits

1. Click the "✕" button on any habit card
2. Confirm the deletion
3. The habit is permanently removed

## Data Model

### Habit Structure
```javascript
{
  id: string,           // Unique identifier (timestamp)
  name: string,         // Habit name
  createdAt: string,    // ISO date when created
  completions: string[] // Array of completion dates (ISO format)
}
```

### Streak Calculation
- Counts consecutive days including today
- Resets to 0 if you miss a day
- Example: Complete Mon, Tue, Wed = 3 day streak

### Storage
- Uses browser's `localStorage`
- Storage key: `habitTracker_habits`
- Data persists across sessions
- No server or database required

## Project Structure

```
habit-tracker/
├── index.html          # Main HTML file
├── src/
│   ├── habit.js        # Data model & localStorage utilities
│   ├── main.js         # Application logic & UI
│   └── style.css       # Responsive styles
├── package.json        # Project metadata
└── README.md          # This file
```

## Technical Details

### Core Functions (habit.js)

- `getTodayString()` - Returns today's date in YYYY-MM-DD format
- `calculateStreak(completions)` - Calculates consecutive day streak
- `isCompletedToday(habit)` - Checks if habit was completed today
- `loadHabits()` - Loads all habits from localStorage
- `saveHabits(habits)` - Saves habits to localStorage
- `addHabit(name)` - Creates a new habit
- `markHabitComplete(habitId)` - Marks habit as done today
- `deleteHabit(habitId)` - Removes a habit
- `getHabitStats(habit)` - Returns streak, total, and completion status

### UI Features

- **Form validation** - Prevents empty habit names
- **Visual feedback** - Green background for completed habits
- **Disabled state** - Can't mark same habit twice in one day
- **Confirmation dialogs** - Asks before deleting habits
- **Empty state** - Shows helpful message when no habits exist
- **Animations** - Smooth slide-in effect for new habits

### Responsive Breakpoints

- **Desktop** - Full layout with side-by-side buttons
- **Tablet (< 640px)** - Stacked form layout
- **Mobile (< 400px)** - Optimized font sizes and spacing

## Browser Support

Works in all modern browsers that support:
- ES6 modules
- localStorage
- CSS Grid/Flexbox
- Arrow functions

## Future Enhancements (Ideas)

- Weekly/monthly view
- Habit categories or tags
- Export/import data
- Dark mode
- Charts and statistics
- Custom streak goals
- Reminder notifications
- Multi-device sync

## License

Free to use and modify as needed. Built as a learning project.

---

**Note**: This app stores all data locally in your browser. Clearing browser data will delete your habits. Consider exporting your data periodically if you want to keep backups.
