import { Heading, Paragraph } from '@/presentation/components/ui/typography';

export interface ILandingPageProps {
  title: string;
  description?: string;
}

export const LandingPage: React.FC<ILandingPageProps> = ({
  title,
  description,
}) => {
  return (
    <main className="app-container min-h-screen flex flex-col items-center justify-center py-20">
      <section className="text-center space-y-6">
        <Heading level={1} className="text-foreground">
          {title}
        </Heading>
        {description && (
          <Paragraph className="text-muted-foreground max-w-xl mx-auto">
            {description}
          </Paragraph>
        )}
      </section>
    </main>
  );
};
