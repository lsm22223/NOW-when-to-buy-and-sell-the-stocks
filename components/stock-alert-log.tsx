import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AlertLog {
  type: string
  message: string
  indicator?: string
  timestamp: string
  severity: "low" | "medium" | "high"
}

interface StockAlertLogProps {
  logs: AlertLog[]
}

export function StockAlertLog({ logs }: StockAlertLogProps) {
  if (logs.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">알림 로그가 없습니다</p>
      </div>
    )
  }

  // 알림 타입에 따른 매수/매도 관련 여부를 반환하는 함수
  function getAlertActionType(type: string): { action: "매수" | "매도"; color: string } {
    switch (type) {
      case "price_drop":
      case "rsi_oversold":
      case "rsi_breakout":
      case "macd_golden_cross":
      case "price_target":
        return { action: "매수", color: "bg-sky-500" } // 매수는 하늘색으로 변경
      case "price_surge":
      case "rsi_overbought":
      case "macd_death_cross":
      case "price_highest":
        return { action: "매도", color: "bg-rose-500" } // 매도는 장미색으로 변경
      default:
        return { action: "매수", color: "bg-sky-500" }
    }
  }

  // 타임스탬프를 읽기 쉬운 형식으로 변환
  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {logs.map((log, index) => {
          const actionType = getAlertActionType(log.type)

          return (
            <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={`${actionType.color} text-white`}>{actionType.action}</Badge>
                    {log.indicator && (
                      <Badge variant="outline" className="text-xs">
                        {log.indicator}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                </div>
                <p className="mt-1">{log.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
