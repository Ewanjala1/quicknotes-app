# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes of up to 200 characters, sort them into Personal, Work or Study categories, search through them, and delete the ones you no longer need. Your notes are stored in the browser with localStorage, so they are still there after you refresh the page.

## Features

- Add notes with a category (Personal, Work or Study)
- Validation: empty notes and notes over 200 characters show an error message
- Each note is a card showing its text, category label, date and time, and a Delete button
- Colour-coded left border for each category
- Live search that ignores upper and lower case, with a "No notes match your search." message
- Note counter: "You have no notes yet.", "You have 1 note." or "You have N notes."
- Notes saved to and loaded from localStorage
- Responsive layout: the form stacks vertically on screens 600px wide or narrower
- Bonus: "Clear all" button with a confirmation prompt
