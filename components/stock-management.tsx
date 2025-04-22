"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { StockAddModal } from "./stock-add-modal"

interface Stock {
  name: string
  symbol: string
  selected: boolean
}

interface StockManagementProps {
  title: string
  description: string
  stocks: Stock[]
  onStocksChange: (stocks: Stock[]) => void
}

export function StockManagement({ title, description, stocks, onStocksChange }: StockManagementProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])

  const handleAddStock = (symbol: string) => {
    // 이미 존재하는 심볼인지 확인
    if (stocks.some((stock) => stock.symbol === symbol)) {
      toast({
        title: "이미 추가된 주식",
        description: `${symbol} 심볼은 이미 목록에 존재합니다.`,
        variant: "destructive",
      })
      return
    }

    // 실제 구현에서는 API를 통해 주식 정보를 가져옵니다
    // 여기서는 간단히 심볼만 사용하여 추가합니다
    const newStock = {
      name: getStockName(symbol) || symbol,
      symbol,
      selected: false,
    }

    onStocksChange([...stocks, newStock])
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
      title: "주식이 삭제되었습니다",
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

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
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
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">추가된 주식이 없습니다. 주식을 추가해주세요.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <StockAddModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddStock={handleAddStock}
        title={`${title} 추가`}
        description={`${description}에 새로운 주식을 추가합니다.`}
      />
    </>
  )
}
