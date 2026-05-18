export function IconButton({ icon: Icon, label, title, variant = 'default' }) {
  return (
    <button
      className={variant === 'profile' ? 'profile-button' : 'icon-button'}
      type="button"
      aria-label={label}
      title={title ?? label}
    >
      <Icon size={20} />
    </button>
  );
}
