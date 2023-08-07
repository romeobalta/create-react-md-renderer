import React from "react";
import { createMarkdownRenderer } from "create-react-md-renderer";

const DEFAULT_MARKDOWN = `# Heading level 1	
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

# Paragraphs
Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, \`monospace\`, ~~strikethrough~~.
# Lists
- this one
- that one
- the other one
  - nested
  - sub-nested
    - sub-sub-nested
    - sub-sub-nested

1. this one
2. that one
3. the other one
  1. nested
  2. sub-nested
    1. sub-sub-nested
    2. sub-sub-nested

# Blockquotes
> Block quotes are written like so.
>
> They can span multiple paragraphs,

# Code
\`\`\`js
// Code blocks are like this:
function sum(a, b) {
  return a + b;
}
\`\`\`

# Links
[Links](http://google.com)
[Links with title](http://google.com "Google's Homepage")
`;

function App() {
  const MarkdownRenderer = createMarkdownRenderer();

  const [markdown, setMarkdown] = React.useState(DEFAULT_MARKDOWN);

  return (
    <div className="App grid grid-cols-2 border-box h-full gap-4 p-4">
      <div className="h-full box-border col-span-1 flex flex-col box-border">
        <h1 className="text-2xl font-bold">Markdown</h1>
        <textarea
          className="flex-1 w-full border border-slate-900/20 p-2 h-full box-border"
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
        />
      </div>
      <div className='box-border h-full overflow-scroll'>
        <h1 className="text-2xl font-bold">Rendered</h1>
        <MarkdownRenderer markdown={markdown} />
      </div>
    </div>
  );
}

export default App;
