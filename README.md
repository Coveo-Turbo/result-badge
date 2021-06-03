# ResultBadge

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

Options:
- field: field you want to display on the result template
- textColor: color of the text inside the badge, any valid CSS values such as "white" or hex like "#ffffff" is acceptable
- backgroundColor: color of the background, any valid CSS values such as "white" or hex like "#ffffff" is acceptable
- shouldBeLocalized: boolean that tells us whether we should attempt to localize the field name within the component. By default set to `false`.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/result-badge
```

2. Use the Component or extend it

Typescript:

```javascript
import { ResultBadge, IResultBadgeOptions } from '@coveops/result-badge';
```

Javascript

```javascript
const ResultBadge = require('@coveops/result-badge').ResultBadge;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/result-badge'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/result-badge@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the CSS in the root `index.scss`

```css
@import '../../node_modules/@coveops/result-badge/dist/css/index.css';
```

Or for quick testing, you can add the styles from unpkg

```css
 <link rel="stylesheet" href="https://unpkg.com/@coveops/result-badge@latest/dist/css/index.css" />
```

6. Include the component in your template as follows:

Place the component in your markup:

```html
<div class="CoveoResultBadge"></div>
```

## Extending

Extending the component can be done as follows:

```javascript
import { ResultBadge, IResultBadgeOptions } from "@coveops/result-badge";

export interface IExtendedResultBadgeOptions extends IResultBadgeOptions {}

export class ExtendedResultBadge extends ResultBadge {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`
