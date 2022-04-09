# Tailwind Labeled Groups

A plugin that allows to create multiple `group`s utilities such as `group-card` or `group-1` and works with Tailwind 3 features and all variations.

---


## Installation

Install the plugin:

```bash
# npm
npm install -D tailwindcss-labeled-groups
```

```bash
# yarn
yarn add -D tailwindcss-labeled-groups
```

Then add the plugin to your `tailwind.config.js` file:

```js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    // This plugin allows you to create custom Tailwind groups.
    // e.g. if you use ['custom'], you could use it as follows:
    //      In the parent: group-custom
    //      In the child:  group-custom-hover:
    require('tailwindcss-labeled-groups')(['custom', '1', /* RENAME ME! */ ])
    // ...
  ],
}
```

Remember to rename your custom groups!

You are ready to use it

## Usage

Assuming we have registered the plugin as follows

```js
require('tailwindcss-labeled-groups')(['custom', '1'])
```

We now can use:

- `group` (default Tailwind value)
- `group-custom` and `group-1` (registered in the plugin) with every possible combination of variation

```html
<div class="group-custom">
    <div class="group-1">
        <div class="group-1-active:text-slate-500"></div>
    </div>
    <div class="group-custom-focus:bg-pink-200"></div>
</div>
```

## Demo

You can see how it works here: https://play.tailwindcss.com/SMCKXsGYsg

## Acknowledgement

Inspired by: [`tailwindcss-named-groups`](https://www.npmjs.com/package/tailwindcss-named-groups)
