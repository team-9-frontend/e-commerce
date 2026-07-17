export default function AdminSettings() {
  return (
    <div className="flex flex-col gap-4">
      <div className="card space-y-2 p-4">
        <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
          settings
        </p>
        <h2 className="text-3xl">Preferences and integrations</h2>
        <p className="text-sm text-neutral-500">
          Theme mode, API credentials, and dashboard preferences are managed here.
        </p>
      </div>
    </div>
  )
}
