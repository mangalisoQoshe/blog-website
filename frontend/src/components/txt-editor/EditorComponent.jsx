import { Editor } from "@tinymce/tinymce-react";

function EditorComponent({ input, handleEditor }) {
 
  return (
    <Editor
      apiKey="rfvabu9tkel58kg3a1obhmpzlfitavaxdbjw5dlmo3u28cpz"
      value={input.body}
      menu={true}
      onEditorChange={(newValue) => handleEditor(newValue)}
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
