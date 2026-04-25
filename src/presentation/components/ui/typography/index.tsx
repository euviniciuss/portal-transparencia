import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ITypographyProps {
  children: ReactNode;
  className?: string;
}

export interface IHeadingProps extends ITypographyProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

const headingStyles: Record<IHeadingProps['level'], string> = {
  1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-semibold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg md:text-xl font-medium',
  6: 'text-base md:text-lg font-medium',
};

export const Heading: React.FC<IHeadingProps> = ({
  children,
  className,
  level,
}) => {
  const Tag = `h${level}` as React.ElementType;
  return (
    <Tag className={twMerge(headingStyles[level], className)}>{children}</Tag>
  );
};

export const Paragraph: React.FC<ITypographyProps> = ({
  children,
  className,
}) => {
  return (
    <p className={twMerge('text-base leading-relaxed', className)}>
      {children}
    </p>
  );
};

export const Text: React.FC<ITypographyProps> = ({ children, className }) => {
  return <span className={twMerge('text-sm', className)}>{children}</span>;
};

export const LabelText: React.FC<ITypographyProps> = ({
  children,
  className,
}) => {
  return (
    <span className={twMerge('text-sm font-medium leading-none', className)}>
      {children}
    </span>
  );
};

export const Caption: React.FC<ITypographyProps> = ({
  children,
  className,
}) => {
  return (
    <span className={twMerge('text-xs text-muted-foreground', className)}>
      {children}
    </span>
  );
};

export const LargeText: React.FC<ITypographyProps> = ({
  children,
  className,
}) => {
  return <div className={twMerge('text-lg', className)}>{children}</div>;
};

export const SmallText: React.FC<ITypographyProps> = ({
  children,
  className,
}) => {
  return <small className={twMerge('text-sm', className)}>{children}</small>;
};
