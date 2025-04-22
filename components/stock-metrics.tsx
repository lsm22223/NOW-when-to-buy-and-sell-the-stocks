import { Card, CardContent } from "@/components/ui/card"

interface StockMetricsProps {
  stockData: any
}

export function StockMetrics({ stockData }: StockMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">고점 대비 하락률</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stockData.highestPrice.dropPercentage.toFixed(2)}%</span>
              <span className="text-xs text-muted-foreground">
                고점:{" "}
                {stockData.currency === "KRW"
                  ? `${stockData.highestPrice.price.toLocaleString()}원`
                  : `${stockData.highestPrice.price}`}
                ({stockData.highestPrice.date})
              </span>
            </div>
            <div className="relative h-10 mt-2">
              {/* -100% 표시 */}
              <div className="absolute top-0 left-0 flex flex-col items-center">
                <div className="w-0.5 h-3 bg-gray-400"></div>
                <span className="text-xs text-gray-500 mt-1">-100%</span>
              </div>

              {/* 100% 표시 */}
              <div className="absolute top-0 right-0 flex flex-col items-center">
                <div className="w-0.5 h-3 bg-gray-400"></div>
                <span className="text-xs text-gray-500 mt-1">100%</span>
              </div>

              {/* 기준선 */}
              <div className="absolute top-1.5 left-0 right-0 h-0.5 bg-gray-200"></div>

              {/* 현재 하락률 표시 */}
              <div
                className="absolute top-0 flex flex-col items-center"
                style={{
                  left: `${50 - stockData.highestPrice.dropPercentage / 2}%`,
                }}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-500 mt-1">-{stockData.highestPrice.dropPercentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">배당 수익률(연)</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stockData.dividend.yield}%</span>
              <span className="text-xs text-muted-foreground">목표: {stockData.dividend.targetYield}%</span>
            </div>
            <div className="relative h-10 mt-2">
              {/* 목표 배당률 표시 */}
              <div className="absolute top-0 right-0 flex flex-col items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-500 mt-1 -mr-6">목표</span>
              </div>

              {/* 현재 배당률 표시 */}
              <div
                className="absolute top-0 flex flex-col items-center"
                style={{
                  left: `${Math.min((stockData.dividend.yield / stockData.dividend.targetYield) * 100, 90)}%`,
                }}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-500 mt-1">{stockData.dividend.yield}%</span>
              </div>

              {/* 진행 바 */}
              <div
                className="absolute top-1.5 left-0 h-0.5 bg-blue-300"
                style={{
                  width: `${(stockData.dividend.yield / stockData.dividend.targetYield) * 100}%`,
                }}
              ></div>

              {/* 목표선 */}
              <div className="absolute top-0 right-0 h-3 border-r border-dashed border-green-500"></div>
            </div>
            <p className="text-xs text-muted-foreground">다음 배당락일: {stockData.dividend.nextExDate}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">RSI</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stockData.indicators.rsi.value}</span>
              <span className={`text-xs ${getRsiStatusColor(stockData.indicators.rsi.value)}`}>
                {getRsiStatus(stockData.indicators.rsi.value)}
              </span>
            </div>
            <div className="relative h-10 mt-2">
              {/* 과매도 영역 */}
              <div className="absolute top-1.5 left-0 h-0.5 w-[30%] bg-green-200"></div>

              {/* 중립 영역 */}
              <div className="absolute top-1.5 left-[30%] h-0.5 w-[40%] bg-gray-200"></div>

              {/* 과매수 영역 */}
              <div className="absolute top-1.5 left-[70%] h-0.5 w-[30%] bg-red-200"></div>

              {/* 30 표시 */}
              <div className="absolute top-0 left-[30%] flex flex-col items-center">
                <div className="w-0.5 h-3 bg-gray-400"></div>
                <span className="text-xs text-gray-500 mt-1">30</span>
              </div>

              {/* 70 표시 */}
              <div className="absolute top-0 left-[70%] flex flex-col items-center">
                <div className="w-0.5 h-3 bg-gray-400"></div>
                <span className="text-xs text-gray-500 mt-1">70</span>
              </div>

              {/* 현재 RSI 표시 */}
              <div
                className="absolute top-0 flex flex-col items-center"
                style={{ left: `${stockData.indicators.rsi.value}%` }}
              >
                <div className={`w-3 h-3 rounded-full ${getRsiDotColor(stockData.indicators.rsi.value)}`}></div>
                <span className={`text-xs mt-1 ${getRsiStatusColor(stockData.indicators.rsi.value)}`}>
                  {stockData.indicators.rsi.value}
                </span>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">* 30 이하 과매도 구간: 저평가된 주식을 싸게 살 수 있는 구간</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">MACD 오실레이터</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {(stockData.indicators.macd.value - stockData.indicators.macd.signal).toFixed(2)}
              </span>
              <span
                className={`text-xs ${
                  stockData.indicators.macd.value - stockData.indicators.macd.signal > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stockData.indicators.macd.value - stockData.indicators.macd.signal > 0 ? "상승세" : "하락세"}
              </span>
            </div>
            <div className="relative h-24 mt-2">
              {/* 0선 표시 */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-300">
                <div className="absolute -top-1 left-0 text-xs text-gray-500">0</div>
              </div>

              {/* 오실레이터 선 그래프 - 간단한 예시 그래프 */}
              <svg className="absolute top-0 left-0 w-full h-24" viewBox="0 0 100 24" preserveAspectRatio="none">
                <path
                  d={`M 0 12 L 10 14 L 20 10 L 30 8 L 40 13 L 50 15 L 60 11 L 70 9 L 80 12 L 90 14 L 100 ${
                    stockData.indicators.macd.value - stockData.indicators.macd.signal > 0 ? 10 : 14
                  }`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
              </svg>

              {/* 현재 값 표시 */}
              <div
                className={`absolute right-0 px-1 py-0.5 text-xs font-medium rounded ${
                  stockData.indicators.macd.value - stockData.indicators.macd.signal > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                style={{
                  top: `${stockData.indicators.macd.value - stockData.indicators.macd.signal > 0 ? 10 : 14}px`,
                }}
              >
                {(stockData.indicators.macd.value - stockData.indicators.macd.signal).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs mt-2">
              <div className="flex justify-between">
                <span>
                  MACD (12,26): <span className="font-medium">{stockData.indicators.macd.value}</span>
                </span>
                <span>
                  시그널 (9): <span className="font-medium">{stockData.indicators.macd.signal}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>
                  오실레이터:{" "}
                  <span className="font-medium">
                    {(stockData.indicators.macd.value - stockData.indicators.macd.signal).toFixed(2)}
                  </span>
                </span>
                <span className="text-xs text-gray-500">MACD - 시그널</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">* 오실레이터가 음수에서 양수로 전환되면 매수 타이밍</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// RSI 상태에 따른 텍스트 반환
function getRsiStatus(value: number): string {
  if (value >= 70) return "과매수"
  if (value <= 30) return "과매도"
  return "중립"
}

// RSI 상태에 따른 색상 반환
function getRsiStatusColor(value: number): string {
  if (value >= 70) return "text-red-500"
  if (value <= 30) return "text-green-500"
  return "text-yellow-500"
}

// RSI 점 색상
function getRsiDotColor(value: number): string {
  if (value >= 70) return "bg-red-500"
  if (value <= 30) return "bg-green-500"
  return "bg-yellow-500"
}
