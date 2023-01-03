import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const editorRef = useRef(null);
  const { CKEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("ckeditor4-react").CKEditor, //Added .CKEditor
    };
    setEditorLoaded(true);
  }, []);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {editorLoaded ? <CKEditor /> : <p>Carregando...</p>}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
