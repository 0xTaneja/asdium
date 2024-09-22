import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import '../App.css';

interface SubTextEditorProps {
  content: string;
  setContent: (markdown: string) => void;
}

export function SubTextEditor({ content, setContent }: SubTextEditorProps) {
  const handleChange = (markdown: string) => {
    setContent(markdown);
  };

  return (
    <div className="w-full mb-30">
      <MDXEditor
        placeholder="Tell your story..."
        markdown={content}
        onChange={handleChange}
        plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]}
        contentEditableClassName={`prose text-xl ml-1 ${content ? 'text-black' : 'text-customGray'}`}
      />
    </div>
  );
}