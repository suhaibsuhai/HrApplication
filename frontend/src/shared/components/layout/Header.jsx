import { Bell, Settings, UserRound } from 'lucide-react';
import { IconButton } from '../ui/IconButton.jsx';

export function Header() {
  return (
    <header className="app-header">
      <div className="brand" aria-label="HR Application">
        <div className="brand-mark">HR</div>
        <span>HR Application</span>
      </div>

      <div className="header-actions" aria-label="Global actions">
        <IconButton label="Settings" title="Settings" icon={Settings} />
        <IconButton label="Notifications" title="Notifications" icon={Bell} />
        <IconButton label="Profile" title="Profile" icon={UserRound} variant="profile" />
      </div>
    </header>
  );
}
