import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "grapesjs/dist/css/grapes.min.css";
import { CKEditorEventAction } from "ckeditor4-react";
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// import "grapesjs/dist/css/grapes.min.css";
import GrapesJS from "grapesjs";
import ckeditorPlugin from "grapesjs-plugin-ckeditor";
console.log(ckeditorPlugin);

import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const editorRef = useRef(null);
  const { CKEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("ckeditor4-react").CKEditor,
    };
    setEditorLoaded(true);
  }, []);

  const editorReady = () => {
    GrapesJS.init({
      container: `#example-editor`,
      fromElement: true,
      plugins: ["gjs-plugin-ckeditor"],
    });
  };

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {editorLoaded ? (
          <CKEditor onInstanceReady={editorReady} />
        ) : (
          <p>Carregando...</p>
        )}
        <div id="example-editor">
          <h1>test</h1>
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
