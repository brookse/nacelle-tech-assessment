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

This project can also be viewed on [Netlify](https://lyzzibrooks-nacelle-tech-assessment.netlify.app/search)!

# Brief explanation of approach
General
- The products and their categories are shared across both features, and designed to share keywords across multiple categories (e.g. `peppermint` can be found in chocolate, hard candy, and taffy).
- Designed to be responsive, so both features work well on mobile and small screens.
- I went light on design to put more focus on each feature, but I wanted theming to be clean, soft, and whimsical to couple with the candy subject.
- There are two functions (`trapFocus` in `Modal.tsx` and `useDebounce` hook in `Searchbar.tsx`) that - if this project were to grow and more features be added - should be pulled out into their own files so that they can be reused. I'm a big proponent of reusability and the DRY principle, but only if the component/function will actually be reused. If something is not being reused yet - even if it's self-encapsulated like these functions - I prefer to stick them where they're actively being used. There's always room for iteration!
- In regards to Tailwind, I try to group similar classes together. Tailwind and similar libraries can very quickly get overwhelming when an element has several classes, I'll add any logical groupings to make deciphering easier. For example, all positioning/display classes are first, followed by width, height, margin, and padding classes, background and border classes, text/font classes, and then anything else. Any modifying classes like `hover:` or `sm:` live next to their normal class. I prefer to do similar groupings with CSS too!

Searchbar
- By using type="search" instead of "input", we can use built-in features such as the clear button.
- In order to see the loading state, I put in a small timeout.
- Enter "error" to see the error state.

Search Results
- I used the `<mark>` tag instead of `<span>` to help increase accessibilty; `mark` is used to highlight text, so it gives a tip to screen readers that this text is important.

# Technologies used

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) using React as a framework.

I used Jest for testing, including the `jest-axe` package for accessibility testing.