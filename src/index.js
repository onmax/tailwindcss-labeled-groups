const plugin = require('tailwindcss/plugin')

// List copied from https://github.com/tailwindlabs/tailwindcss/blob/ba24bccfd892675277e52fa418715b9014dd8cf9/src/corePlugins.js#L64
const pseudoVariants = [
    // Positional
    ['first', ':first-child'],
    ['last', ':last-child'],
    ['only', ':only-child'],
    ['odd', ':nth-child(odd)'],
    ['even', ':nth-child(even)'],
    'first-of-type',
    'last-of-type',
    'only-of-type',

    // State
    [
        'visited',
        ({ container }) => {
            let toRemove = ['--tw-text-opacity', '--tw-border-opacity', '--tw-bg-opacity']

            container.walkDecls((decl) => {
                if (toRemove.includes(decl.prop)) {
                    decl.remove()

                    return
                }

                for (const varName of toRemove) {
                    if (decl.value.includes(`/ var(${varName})`)) {
                        decl.value = decl.value.replace(`/ var(${varName})`, '')
                    }
                }
            })

            return ':visited'
        },
    ],
    'target',
    ['open', '[open]'],

    // Forms
    'default',
    'checked',
    'indeterminate',
    'placeholder-shown',
    'autofill',
    'required',
    'valid',
    'invalid',
    'in-range',
    'out-of-range',
    'read-only',

    // Content
    'empty',

    // Interactive
    'focus-within',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'enabled',
    'disabled',
].map((variant) => (Array.isArray(variant) ? variant : [variant, `:${variant}`]))

module.exports = plugin.withOptions((groups = []) => {
    return ({ addVariant }) => {
        pseudoVariants.forEach(([variantName, state]) => {
            groups.forEach(groupName => {
                addVariant(`group-${groupName}-${variantName}`, (ctx) => {
                    let result = typeof state === 'function' ? state(ctx) : state

                    return `:merge(.group-${groupName})${result} &`
                })
            })
        })
    }
})

