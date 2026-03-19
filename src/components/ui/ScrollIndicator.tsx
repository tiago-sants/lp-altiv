export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 animate-bounce">
      <span className="text-label font-body uppercase tracking-[2px] text-accent">Scroll</span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-accent">
        <path d="M8 0v20m0 0l6-6m-6 6L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
