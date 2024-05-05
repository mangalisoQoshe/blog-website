import { Editor } from "@tinymce/tinymce-react";

function EditorComponent({ input, handleEditor }) {
  const API_KEY = import.meta.env.VITE_REACT_APP_RICH_TXT_EDITOR_API_KEY;

  return (
    <Editor
      apiKey={API_KEY}
      value={input.body}
      menu={true}
      //onInit={()=>{setIsLoading(false);}}
      // onEditorChange={(newValue, editor) => {
      //   handleEditor(editor.getContent({ format: "text" }));
      // }}
      onEditorChange={(newValue) => {
        handleEditor(newValue);
      }}
      init={{
        height: 300,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}

export default EditorComponent;
