import { useSimulatorStore } from '@/store/simulator-store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface MocapModePanelProps {
  className?: string
}

export function MocapModePanel({ className }: MocapModePanelProps) {
  const { mocapMode, setMocapMode, lightCondition } = useSimulatorStore()

  // Hands On is available for bright and less light conditions, disabled only for dark
  // Note: In hands-on mode, the quality of hand gesture tracking depends on light conditions:
  // - Bright light: Complicated hand gestures are possible with accurate tracking
  // - Less light: Only simple hand gestures are available due to reduced visibility
  // - Dark: Hands-on mode is completely disabled as hand tracking is not feasible
  const isHandsOnDisabled = lightCondition === 'dark'

  const getModeDescription = () => {
    switch (mocapMode) {
      case 'setup':
        return 'Setup Mode'
      case 'bodyOnly':
        return 'Body Only'
      case 'handsOn':
        return 'Full Body with Hands'
    }
  }

  return (
    <Card className={`flex flex-col items-center justify-start p-2 sm:p-4 rounded-none border-0 border-r ${className ?? ''}`}>
      <h3 className="text-xm font-semibold mb-2 sm:mb-2">Mocap Mode</h3>
      <div className="flex flex-col gap-2 sm:gap-3 items-center">
        <div className="flex flex-col min-[900px]:flex-row gap-1 sm:gap-2">
          <Button
            onClick={() => setMocapMode('setup')}
            variant={mocapMode === 'setup' ? 'default' : 'outline'}
            size="sm"
            className="min-w-[60px] sm:min-w-[90px]"
          >
            Setup
          </Button>
          <Button
            onClick={() => setMocapMode('bodyOnly')}
            variant={mocapMode === 'bodyOnly' ? 'default' : 'outline'}
            size="sm"
            className="min-w-[60px] sm:min-w-[90px]"
          >
            Body Only
          </Button>
          <Button
            onClick={() => setMocapMode('handsOn')}
            variant={mocapMode === 'handsOn' ? 'default' : 'outline'}
            size="sm"
            className="min-w-[60px] sm:min-w-[90px] relative"
            disabled={isHandsOnDisabled}
          >
            Hands On
            {isHandsOnDisabled && (
              <span className="absolute inset-0 flex items-center justify-center text-destructive font-bold text-base sm:text-lg">
                ✕
              </span>
            )}
          </Button>
        </div>
        <Label className="text-xs sm:text-sm text-muted-foreground self-start">
          {getModeDescription()}
        </Label>
      </div>
    </Card>
  )
}

