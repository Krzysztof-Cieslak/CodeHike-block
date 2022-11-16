import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { Button, Box } from "@primer/react";
import {evaluateSync} from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import * as provider from '@mdx-js/react'

export default function (props: FileBlockProps) {
  const { context, content, metadata, onUpdateMetadata } = props;

  // @ts-ignore
  const {default: Content} = evaluateSync(content, {...provider, ...runtime});

  return (
    <Content />
  );
}