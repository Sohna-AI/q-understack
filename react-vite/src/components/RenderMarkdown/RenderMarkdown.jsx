import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import 'highlight.js/styles/atom-one-dark.css';

export default function RenderMarkdown({ text }) {
    return <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{text}</ReactMarkdown>
}
