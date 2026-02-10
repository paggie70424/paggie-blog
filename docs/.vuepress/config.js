import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'

const __dirname = getDirname(import.meta.url)

export default {
    lang: 'en-US',
    title: "Paggie's Blog",
    base: '/paggie-blog/',
    description: 'Sharing my journey in tech and life.',
    head: [
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }],
        ['link', { href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
    ],
    bundler: viteBundler(),
    theme: defaultTheme({
        logo: '/images/logo.png', // Place your logo.png in docs/.vuepress/public/images/
        navbar: [
            { text: 'Home', link: '/' },
            { text: 'About Me', link: '/about-me.md' },
            { text: 'Background', link: '/background.md' },
            { text: 'Project', link: '/project.md' },
            { text: 'Trial', link: '/trial.md' },
        ],
        sidebar: {
            '/': [
                {
                    text: 'Menu',
                    children: [
                        {
                            text: 'About Me',
                            link: '/about-me.md',
                            collapsible: true,
                            children: [
                                { text: 'My Journey 🇦🇺', link: '/about-me.html#my-journey' },
                                { text: 'My Path 🛤️', link: '/about-me.html#my-path' },
                                { text: 'My Interests 🏓', link: '/about-me.html#my-interests' }
                            ]
                        },
                        {
                            text: 'Background',
                            link: '/background.md',
                            collapsible: true,
                            children: [
                                { text: 'Experience 💼', link: '/background.html#experience' },
                                { text: 'Education 🎓', link: '/background.html#education' },
                                { text: 'Other Experience 🛠', link: '/background.html#other-experience' }
                            ]
                        },
                        '/project.md',
                        '/trial.md',
                    ],
                },
            ],
        },
    }),
    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
    ],
}
