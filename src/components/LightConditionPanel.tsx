import { useSimulatorStore } from '@/store/simulator-store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface LightConditionPanelProps {
  className?: string
}

export function LightConditionPanel({ className }: LightConditionPanelProps) {
  const { lightCondition, setLightCondition, mocapMode } = useSimulatorStore()

  const isDarkDisabled = mocapMode === 'handsOn'

  const getLightLabel = () => {
    switch (lightCondition) {
      case 'bright': return 'Bright Light'
      case 'less': return 'Less Light'
      case 'dark': return 'Dark'
    }
  }

  const getGestureComment = () => {
    if (mocapMode === 'handsOn') {
      switch (lightCondition) {
        case 'bright': return 'Complicated gestures available'
        case 'less': return 'Only simple gestures available'
        default: return null
      }
    }
    return null
  }

  return (
    <Card className={`flex flex-col items-center p-4 rounded-none border-0 border-r ${className ?? ''}`}>
      <h3 className="text-sm font-semibold mb-4">Light Condition</h3>
      <div className="flex flex-col gap-3 items-center">
        <div className="flex flex-col min-[900px]:flex-row gap-2">
          <Button
            onClick={() => setLightCondition('bright')}
            variant={lightCondition === 'bright' ? 'default' : 'outline'}
            size="sm"
            className="min-w-[70px]"
          >
            Bright
          </Button>
          <Button
            onClick={() => setLightCondition('less')}
            variant={lightCondition === 'less' ? 'default' : 'outline'}
            size="sm"
            className="min-w-[70px]"
          >
            Less
          </Button>
          <Button
            onClick={() => setLightCondition('dark')}
            variant={lightCondition === 'dark' ? 'default' : 'outline'}
            size="sm"
            className="min-w-[70px] relative"
            disabled={isDarkDisabled}
          >
            Dark
            {isDarkDisabled && (
              <span className="absolute inset-0 flex items-center justify-center text-destructive font-bold text-lg">
                ✕
              </span>
            )}
          </Button>
        </div>
        <div className="flex flex-col gap-1 self-start">
          <Label className="text-sm text-muted-foreground">
            {getLightLabel()}
          </Label>
          {getGestureComment() && (
            <span className="text-xs text-muted-foreground/80">
              {getGestureComment()}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

