import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import '../App.css';
interface TextEditorProps {
  title: string;
  setTitle: (markdown: string) => void;
}

export function TextEditor({ title, setTitle }: TextEditorProps) {
  const handleChange = (markdown: string) => {
    setTitle(markdown);
  };

  return (
    <div className="flex flex-col w-full">
      <MDXEditor
        placeholder="Title"
        markdown={title}
        onChange={handleChange}
        plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]}
        contentEditableClassName={`prose text-5xl ${title ? 'text-black text-semibold' : 'text-customGray'} leading-tight w-full`}
      />
    </div>
  );
}