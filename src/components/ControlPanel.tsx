import { ZoneSettingsPanel } from './ZoneSettingsPanel'
import { InstallationHeightPanel } from './InstallationHeightPanel'
import { MocapModePanel } from './MocapModePanel'
import { LightConditionPanel } from './LightConditionPanel'

// Main Control Panel Component
export function ControlPanel() {
  return (
    <div className="flex border-b bg-card">
      <ZoneSettingsPanel className="flex-[2]" />
      <InstallationHeightPanel className="flex-1" />
      <LightConditionPanel className="flex-1" />
      <MocapModePanel className="flex-[1.5]" />
    </div>
  )
}
