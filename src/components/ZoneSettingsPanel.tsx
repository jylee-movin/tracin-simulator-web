import { 
  useSimulatorStore, 
  type ZoneSettings as ZoneSettingsType, 
  WIDTH_MIN, WIDTH_MAX,
  LENGTH_MIN, LENGTH_MAX,
  HEIGHT_MIN, HEIGHT_MAX,
  DISTANCE_MIN, DISTANCE_MAX 
} from '@/store/simulator-store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

// Dimension Input Component
interface DimensionInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

function DimensionInput({ label, value, onChange, min = 0, max }: DimensionInputProps) {
  return (
    <div className="flex flex-col gap-1 sm:gap-2 min-w-[80px] sm:min-w-[100px]">
      <Label htmlFor={label.toLowerCase()} className="text-xs sm:text-sm font-medium">
        {label}
      </Label>
      <div className="flex items-center gap-1 sm:gap-2">
        <Input
          id={label.toLowerCase()}
          type="number"
          value={value.toFixed(1)}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step="0.1"
          min={min}
          max={max}
          className="w-16 sm:w-20"
        />
        <span className="text-xs sm:text-sm text-muted-foreground">m</span>
      </div>
    </div>
  )
}

// Zone Settings Section
interface ZoneSettingsPanelProps {
  className?: string
}

export function ZoneSettingsPanel({ className }: ZoneSettingsPanelProps) {
  const { zoneSettings, setZoneSettings } = useSimulatorStore()

  const handleChange = (key: keyof ZoneSettingsType) => (value: number) => {
    setZoneSettings({ [key]: value })
  }

  return (
    <Card className={`flex flex-col items-center p-2 sm:p-4 rounded-none border-0 border-r ${className ?? ''}`}>
      <h3 className="text-xm font-semibold mb-2 sm:mb-2">Mocap Zone Setting</h3>
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
        <DimensionInput
          label="Width"
          value={zoneSettings.width}
          onChange={handleChange('width')}
          min={WIDTH_MIN}
          max={WIDTH_MAX}
        />
        <DimensionInput
          label="Length"
          value={zoneSettings.length}
          onChange={handleChange('length')}
          min={LENGTH_MIN}
          max={LENGTH_MAX}
        />
        <DimensionInput
          label="Height"
          value={zoneSettings.height}
          onChange={handleChange('height')}
          min={HEIGHT_MIN}
          max={HEIGHT_MAX}
        />
        <DimensionInput
          label="Distance"
          value={zoneSettings.distance}
          onChange={handleChange('distance')}
          min={DISTANCE_MIN}
          max={DISTANCE_MAX}
        />
      </div>
    </Card>
  )
}

