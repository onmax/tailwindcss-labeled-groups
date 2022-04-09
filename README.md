# Tailwind Labeled Groups

A plugin that allows you to create label `group` utilities like `group-card` or `group-1` and works with Tailwind 3 features.

---


## Installation

Install the plugin from npm:

```bash
# npm
npm install -D tailwindcss-labeled-groups
```

```bash
# yarn
yarn add -D tailwindcss-labeled-groups
```

Then add the plugin to your tailwind.config.js file:

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

You are ready to use it!

```html
<div class="group-custom">
    <div class="group-1">
        <div class="group-1-active:text-slate-500"></div>
    </div>
    <div class="group-custom-focus:bg-pink-200"></div>
</div>
```
