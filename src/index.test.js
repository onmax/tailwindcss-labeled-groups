const path = require('path')
const tailwind = require('tailwindcss')
const postcss = require('postcss')
const labeledGroupsPlugin = require('.')

let html = String.raw
let css = String.raw

let defaults = css`
  *,
  ::before,
  ::after {
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
  }
`

function run(config, plugin = tailwind) {
    let { currentTestName } = expect.getState()
    config = {
        ...{ plugins: [labeledGroupsPlugin], corePlugins: { preflight: false } },
        ...config,
    }

    return postcss(plugin(config)).process(
        ['@tailwind base;', '@tailwind components;', '@tailwind utilities'].join('\n'),
        {
            from: `${path.resolve(__filename)}?test=${currentTestName}`,
        }
    )
}

test('creates custom named group', async () => {
    let config = {
        content: [{ raw: html`<div class="group-custom"><div class="group-custom-hover:bg-pink-200"></div></div>` }],
        plugins: [labeledGroupsPlugin(['custom'])],
    }

    return run(config).then((result) => {
        expect(result.css).toMatchFormattedCss(
            css`
                ${defaults}

                .group-custom:hover .group-custom-hover\:bg-pink-200 {
                    --tw-bg-opacity: 1;
                    background-color: rgb(251 207 232 / var(--tw-bg-opacity));
                }
            `
        )
    })
})

test('creates multiple custom named groups', async () => {
    let config = {
        content: [{
            raw: html`
            <div class="group-custom-1">
                <div class="group-custom-2">
                    <div class="group-custom-2-active:bg-pink-200"></div>
                </div>
                <div class="group-custom-1-focus:bg-pink-200"></div>
            </div>` }],
        plugins: [labeledGroupsPlugin(['custom-1', 'custom-2'])],
    }

    return run(config).then((result) => {
        expect(result.css).toMatchFormattedCss(
            css`
                ${defaults}

                .group-custom-1:focus .group-custom-1-focus\:bg-pink-200 {
                    --tw-bg-opacity: 1;
                    background-color: rgb(251 207 232 / var(--tw-bg-opacity));
                }

                .group-custom-2:active .group-custom-2-active\:bg-pink-200 {
                    --tw-bg-opacity: 1;
                    background-color: rgb(251 207 232 / var(--tw-bg-opacity));
                }
            `
        )
    })
})