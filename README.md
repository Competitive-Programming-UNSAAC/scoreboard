# Scoreboard

This scoreboard retrieves and show data from the [Parser's API](https://github.com/Competitive-Programming-UNSAAC/parser). Therefore, the Parser server must be running for the scoreboard to function properly.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Competitive-Programming-UNSAAC/scoreboard.git
cd scoreboard
```

2. Install dependencies:
```bash
npm install
```

3. Run
```bash
npm run dev
```

## Key Bindings

### (N)ext Submission (press: n)
- **1st** `n` **press**: Moves the UI to the next pending submission (from bottom to top) and highlights it as the next one to reveal.
- **2nd** `n` **press**: Reveals the selected pending submission.

### (U)nfroze Standings (press: u)
- Unfreezes and reveals the final standings.

### (T)op 10 Standings (press: t)
- Displays standings up to the top 10 in a frozen stage.
- We can then reveal results one by one.
