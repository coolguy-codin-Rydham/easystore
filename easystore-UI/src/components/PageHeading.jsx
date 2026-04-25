import PageTitle from "./PageTitle";

export default function PageHeading({ title, eyebrow, children }) {
  return (
    <div className="text-center max-w-2xl mx-auto px-4 py-8">
      <PageTitle title={title} eyebrow={eyebrow} />
      {children && (
        <p className="font-primary leading-7 text-sepia dark:text-paper/70 -mt-4">
          {children}
        </p>
      )}
    </div>
  );
}
