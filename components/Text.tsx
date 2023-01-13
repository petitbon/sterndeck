'use client';

import { useSystem } from '@context/SystemProvider';

const fontSizes = { small: '0.8rem', medium: '1rem', large: '11.2rem' };

export function Text({
  href,
  children,
  ...restProps
}: {
  href?: string,
  children: React.ReactNode,
} & React.HTMLAttributes<HTMLElement>) {
  const Element = href ? 'a' : 'span';
  const { fontSize } = useSystem();

  return (
    <Element href={href} style={{ fontSize: fontSizes[fontSize] }} {...restProps}>
      {children}
    </Element>
  );
}
