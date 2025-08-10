import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-twilight.css"; // or prism-okaidia.css, prism-tomorrow.css etc.

// Optional: load extra languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";

const CodeBlock = ({
  children,
  language = "javascript",
}: {
  children: React.ReactNode;
  language?: string;
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [children, language]);

  return (
    <pre
      style={{
        border: "2px solid #ccc",
        borderRadius: "0px",
        boxShadow: "none",
        height: "100%",
        maxHeight: "90%",
        flex: 1,
        overflow: "auto",
      }}
      className=""
    >
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
};

export default CodeBlock;
