export default function AdminSettings() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="card col-span-full p-4">
        <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
          settings
        </p>
        <h2 className="text-3xl">Preferences and integrations</h2>
        <p className="text-muted text-sm">
          Theme mode, API credentials, and dashboard preferences are managed here.
        </p>
      </div>
    </div>
  )
}
