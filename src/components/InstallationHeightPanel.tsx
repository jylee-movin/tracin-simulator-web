import { useSimulatorStore } from '@/store/simulator-store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface InstallationHeightPanelProps {
  className?: string
}

export function InstallationHeightPanel({ className }: InstallationHeightPanelProps) {
  const { installationHeight, setInstallationHeight } = useSimulatorStore()

  return (
    <Card className={`flex flex-col items-center p-2 sm:p-4 rounded-none border-0 border-r ${className ?? ''}`}>
      <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-4">Installation Height</h3>
      <div className="flex flex-col gap-2 sm:gap-3 items-center">
        <div className="flex flex-col min-[900px]:flex-row gap-1 sm:gap-2">
          <Button
            onClick={() => setInstallationHeight('tripod')}
            variant={installationHeight === 'tripod' ? 'default' : 'outline'}
            size="sm"
            className="min-w-[60px] sm:min-w-[90px]"
          >
            Tripod
          </Button>
          <Button
            onClick={() => setInstallationHeight('ceiling')}
            variant={installationHeight === 'ceiling' ? 'default' : 'outline'}
            size="sm"
            className="min-w-[60px] sm:min-w-[90px]"
          >
            Ceiling
          </Button>
        </div>
        <Label className="text-xs sm:text-sm text-muted-foreground self-start">
          {installationHeight === 'tripod' ? 'On Tripod' : 'On Ceiling'}
        </Label>
      </div>
    </Card>
  )
}

