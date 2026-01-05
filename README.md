Web Calculator

A small static web calculator (HTML/CSS/JS).

Files:
- index.html — main UI
- style.css — styles
- script.js — interaction logic

Run:
- Open `index.html` in your browser, or serve the folder:

```bash
# from the project folder
python -m http.server 8000
# then open http://localhost:8000
```

Notes:
- The calculator sanitizes input to digits, operators, parentheses, and dot before evaluating.
- If you want more advanced parsing, I can add a math parser instead of `Function`/`eval`.