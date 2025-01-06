# Setup Instructions
```
  npm i
  npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

```
  npm run test
```
To run test suites.

# Brief explanation of approach
General
- The products and their categories are shared across both features, and designed to share keywords across multiple categories (e.g. `peppermint` can be found in chocolate, hard candy, and taffy).
- Designed to be responsive, so both features work well on mobile and small screens.
- I went light on design to put more focus on each feature, but I wanted theming to be clean, soft, and whimsical to couple with the candy subject.

Searchbar
- By using type="search" instead of "input", we can use built-in features such as the clear button.
- In order to see the loading state, I put in a small timeout.
- Enter "error" to see the error state.

Search Results
- I used the `<mark>` tag instead of `<span>` to help increase accessibilty; `mark` is used to highlight text, so it gives a tip to screen readers that this text is important.

# Technologies used

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) using React as a framework.

I used Jest for testing, including the `jest-axe` package for accessibility testing.