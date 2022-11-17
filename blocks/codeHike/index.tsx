import { FileBlockProps } from "@githubnext/blocks";
import { Box } from "@primer/react";
import { compile, CompileOptions, run } from "@mdx-js/mdx";
import { remarkCodeHike } from "@code-hike/mdx";
import * as runtime from "react/jsx-runtime";
// @ts-ignore
import theme from "shiki/themes/github-dark.json";
import { PluggableList } from "@mdx-js/mdx/lib/core";
import { Fragment, useEffect, useState } from "react";
import { CH } from "@code-hike/mdx/components";
import "@code-hike/mdx/styles.css";

export default function (props: FileBlockProps) {
  const { content } = props;
  const [mdxComponent, setMdxComponent] = useState<any>(undefined);

  const remarkPlugins: PluggableList  = [[remarkCodeHike, { theme: theme,  lineNumbers: true, autoImport: false, }]];
  const options: CompileOptions  = {
    remarkPlugins,
    outputFormat: "function-body"
  };

  const getContentComponent = async () => {
    console.log("getContentComponent");
    const m = await compile(content, options);
    const r = await run(String(m), runtime);
    setMdxComponent(r);
  };

  useEffect(() => {
    getContentComponent();
  }, []);

  let component = mdxComponent ? <mdxComponent.default components={{ CH }}/> : <Fragment />;

  return (
    <Box style={{padding: 20}}>
      {component}
    </Box>
  );
}