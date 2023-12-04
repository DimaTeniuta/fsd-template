declare module '*.svg' {
  import { FunctionComponent, SVGAttributes } from 'react';
  export const ReactComponent: FunctionComponent<SVGAttributes<SVGElement>>;
}
