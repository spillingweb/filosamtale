const PageWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
      {children}
    </div>
  );
};

export default PageWrap;
