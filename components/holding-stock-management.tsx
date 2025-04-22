"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { HoldingStockAddModal } from "./holding-stock-add-modal"

interface HoldingStock {
  name: string
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
  profit: number
  profitPercentage: number
  purchaseDate: string
  selected?: boolean
}

interface HoldingStockManagementProps {
  stocks: HoldingStock[]
  onStocksChange: (stocks: HoldingStock[]) => void
}

export function HoldingStockManagement({ stocks, onStocksChange }: HoldingStockManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])

  const handleAddStock = (symbol: string, quantity: number, purchaseDate: string) => {
    // 이미 존재하는 심볼인지 확인
    const existingStock = stocks.find((stock) => stock.symbol === symbol)

    if (existingStock) {
      // 실제 구현에서는 API를 통해 해당 날짜의 가격을 가져와서 평균 단가를 계산합니다
      // 여기서는 간단히 시뮬레이션합니다
      const purchasePrice = getPriceForDate(symbol, purchaseDate)

      // 평균 단가 계산
      const totalQuantity = existingStock.quantity + quantity
      const totalCost = existingStock.quantity * existingStock.avgPrice + quantity * purchasePrice
      const newAvgPrice = totalCost / totalQuantity

      // 현재 가격은 그대로 유지하고 수익률 재계산
      const newProfit = (existingStock.currentPrice - newAvgPrice) * totalQuantity
      const newProfitPercentage = (existingStock.currentPrice / newAvgPrice - 1) * 100

      const updatedStocks = stocks.map((stock) => {
        if (stock.symbol === symbol) {
          return {
            ...stock,
            quantity: totalQuantity,
            avgPrice: newAvgPrice,
            profit: newProfit,
            profitPercentage: newProfitPercentage,
          }
        }
        return stock
      })

      onStocksChange(updatedStocks)

      toast({
        title: "보유주식이 업데이트되었습니다",
        description: `${getStockName(symbol)} ${quantity}주가 추가되어 총 ${totalQuantity}주가 되었습니다.`,
      })
    } else {
      // 새로운 주식 추가
      const purchasePrice = getPriceForDate(symbol, purchaseDate)
      const currentPrice = getCurrentPrice(symbol)

      const profit = (currentPrice - purchasePrice) * quantity
      const profitPercentage = (currentPrice / purchasePrice - 1) * 100

      const newStock: HoldingStock = {
        name: getStockName(symbol),
        symbol,
        quantity,
        avgPrice: purchasePrice,
        currentPrice,
        profit,
        profitPercentage,
        purchaseDate,
        selected: false,
      }

      onStocksChange([...stocks, newStock])

      toast({
        title: "보유주식이 추가되었습니다",
        description: `${getStockName(symbol)} ${quantity}주가 보유주식에 추가되었습니다.`,
      })
    }
  }

  const handleDeleteSelected = () => {
    if (selectedStocks.length === 0) {
      toast({
        title: "선택된 주식이 없습니다",
        description: "삭제할 주식을 먼저 선택해주세요.",
        variant: "destructive",
      })
      return
    }

    const updatedStocks = stocks.filter((stock) => !selectedStocks.includes(stock.symbol))
    onStocksChange(updatedStocks)
    setSelectedStocks([])

    toast({
      title: "보유주식이 삭제되었습니다",
      description: `${selectedStocks.length}개의 주식이 목록에서 삭제되었습니다.`,
    })
  }

  const handleCheckboxChange = (symbol: string, checked: boolean) => {
    if (checked) {
      setSelectedStocks((prev) => [...prev, symbol])
    } else {
      setSelectedStocks((prev) => prev.filter((s) => s !== symbol))
    }
  }

  // 주식 심볼에 따른 이름 반환 (예시)
  function getStockName(symbol: string): string {
    const stockNames: { [key: string]: string } = {
      "005930": "삼성전자",
      "035420": "네이버",
      "035720": "카카오",
      AAPL: "Apple Inc.",
      TSLA: "Tesla Inc.",
      NVDA: "NVIDIA Corp.",
    }
    return stockNames[symbol] || symbol
  }

  // 특정 날짜의 주식 가격 반환 (예시 - 실제로는 API 호출)
  function getPriceForDate(symbol: string, date: string): number {
    // 실제 구현에서는 API를 통해 해당 날짜의 종가를 가져옵니다
    // 여기서는 간단히 시뮬레이션합니다
    const basePrice =
      {
        "005930": 70000,
        "035420": 220000,
        "035720": 50000,
        AAPL: 150,
        TSLA: 200,
        NVDA: 400,
      }[symbol] || 100000

    // 날짜에 따라 약간의 변동을 줍니다 (예시)
    const dateObj = new Date(date)
    const dayOffset = dateObj.getDate() % 10
    return basePrice * (1 + (dayOffset - 5) / 100)
  }

  // 현재 주식 가격 반환 (예시 - 실제로는 API 호출)
  function getCurrentPrice(symbol: string): number {
    return (
      {
        "005930": 78000,
        "035420": 234500,
        "035720": 56700,
        AAPL: 187.32,
        TSLA: 243.64,
        NVDA: 487.85,
      }[symbol] || 110000
    )
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>보유주식 관리</CardTitle>
            <CardDescription>보유하고 있는 주식을 관리합니다.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDeleteSelected} disabled={selectedStocks.length === 0}>
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </Button>
            <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              추가
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {stocks.length > 0 ? (
            <div className="space-y-2">
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedStocks.includes(stock.symbol)}
                      onCheckedChange={(checked) => handleCheckboxChange(stock.symbol, checked === true)}
                    />
                    <div>
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{stock.quantity}주</p>
                    <p className={`text-sm ${stock.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.profitPercentage >= 0 ? "+" : ""}
                      {stock.profitPercentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">추가된 보유주식이 없습니다. 주식을 추가해주세요.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <HoldingStockAddModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAddStock={handleAddStock} />
    </>
  )
}
