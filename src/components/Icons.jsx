function Solid({ d, className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={d} />
    </svg>
  );
}

function Outline({ d, className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

export const GitHubIcon = (props) => (
  <Solid
    {...props}
    d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
  />
);

export const LinkedInIcon = (props) => (
  <Solid
    {...props}
    d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1ZM7.1 20.4H3.6V9h3.5v11.4Z"
  />
);

export const DownloadIcon = (props) => <Outline {...props} d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" />;
export const ExternalIcon = (props) => <Outline {...props} d="M7 17 17 7M8 7h9v9" />;
export const ChevronLeftIcon = (props) => <Outline {...props} d="m15 18-6-6 6-6" />;
export const ChevronRightIcon = (props) => <Outline {...props} d="m9 18 6-6-6-6" />;
export const MenuIcon = (props) => <Outline {...props} d="M4 7h16M4 12h16M4 17h16" />;
export const WhatsAppIcon = (props) => (
  <Solid
    {...props}
    d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.7 14.2c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.3.5-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.8-.1 1.5Z"
  />
);

export const ChatIcon = (props) => <Outline {...props} d="M4 5h16v11H9l-5 4V5Z" />;
export const MutedIcon = (props) => <Outline {...props} d="M4 9v6h4l5 4V5L8 9H4Zm12 0 5 6m0-6-5 6" />;
export const MusicIcon = (props) => <Solid {...props} d="M9 3v12.3A3.5 3.5 0 1 0 11 18.5V8h8v7.3a3.5 3.5 0 1 0 2 3.2V3H9Z" />;
export const ClockIcon = (props) => <Outline {...props} d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5" />;
export const CloseIcon = (props) => <Outline {...props} d="M6 6l12 12M18 6 6 18" />;
