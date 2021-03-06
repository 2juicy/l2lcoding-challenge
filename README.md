Coding challenge for [Link to Learn](https://linktolearn.org/)
###### Completed on Friday, September 17, 2021 08:01 PM (PDT)

## `Quick start`

In the project directory terminal, you can run:

### `npm install`

Install all Node dependencies.

### `yarn start` or `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## `Instructions`

<details>
  <summary>Click for instructions</summary>

## `Overview:`

- [x] Build a React UI interface that closely resembles the Search & Filter UI of this site: https://plexuss.com

- [x] The UI should properly manipulate rendered data of the Post model from this dummy data api: https://dummyapi.io/docs/models

Feel free to use React-based design and UI libraries to rapidly prototype.
Be ready to discuss why you chose them.

## `UI should include:`

- [x] A Single Text Search Input that filters table for any matching text across Owner, Text, Tags data
- [x] Simple dropdown menus
- [x] A slider UI to filter for minimum # of Likes
- [x] Selectable Filter for owner (multi-select - button/checkbox/radio/select input)
- [x] Selectable Filter for tags (multi-select - button/checkbox/radio/select input)

All filters including the Search input’s string match should be additive.

Use Case Example:

- If user sets [Minimum Likes] filter slider to 10, then only posts with 10 or more likes should be shown.
- Then if user selects [owner filter] to “Joe Smith”, then only Joe Smith posts with 10 or more likes should be shown.
- Then if user searches for “Foobar” in the [search input], then only Joe Smith posts with 10 or more likes AND Text or Tags that include “Foobar” should be shown
- Then if user selects “Tag 1” and “Tag 2” in the [tag filter], then then only Joe Smith posts with 10 or more likes AND Text or Tags that include “Foobar” AND Tags that include both Tag 1 and Tag 2 should be shown

NOTE: The order that a user selects filters should not matter

## `Bonus`

- [x] Show off UX design capabilities
- [x] Lazy load data below view screen on scroll
- [x] Clear All Filters Btn
- [x] Optimize code or be ready to discuss Optimization improvements you would make if allowed more time.
- [x] Launch mini-app on [live URL](https://2juicy.github.io/l2lcoding-challenge/)

</details>
