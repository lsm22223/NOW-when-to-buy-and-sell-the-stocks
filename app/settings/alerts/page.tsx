import { ArrowLeft, Bell } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AlertSettings() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로 가기</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          <span className="text-lg font-semibold">알림 설정</span>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">알림 설정</h1>
          <p className="text-muted-foreground">주식 가격 변동, 기술적 지표, 배당금 등에 대한 알림을 설정하세요.</p>
        </div>
        <Tabs defaultValue="price">
          <TabsList className="mb-4">
            <TabsTrigger value="price">가격 알림</TabsTrigger>
            <TabsTrigger value="technical">기술적 지표</TabsTrigger>
            <TabsTrigger value="dividend">배당금</TabsTrigger>
            <TabsTrigger value="news">뉴스</TabsTrigger>
          </TabsList>
          <TabsContent value="price" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>가격 상승 알림</CardTitle>
                <CardDescription>주식 가격이 특정 비율 이상 상승할 때 알림을 받습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-surge" className="flex flex-col gap-1">
                    <span>가격 상승 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      가격이 설정한 비율 이상 상승할 때 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="price-surge" defaultChecked />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price-surge-threshold">상승 비율 (%)</Label>
                  <Input id="price-surge-threshold" type="number" defaultValue="5" min="0" max="100" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>가격 하락 알림</CardTitle>
                <CardDescription>주식 가격이 특정 비율 이상 하락할 때 알림을 받습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-drop" className="flex flex-col gap-1">
                    <span>가격 하락 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      가격이 설정한 비율 이상 하락할 때 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="price-drop" defaultChecked />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price-drop-threshold">하락 비율 (%)</Label>
                  <Input id="price-drop-threshold" type="number" defaultValue="5" min="0" max="100" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="technical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>RSI 알림</CardTitle>
                <CardDescription>RSI(상대강도지수)가 특정 수준에 도달할 때 알림을 받습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rsi-overbought" className="flex flex-col gap-1">
                    <span>과매수 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      RSI가 설정한 수준 이상일 때 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="rsi-overbought" defaultChecked />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rsi-overbought-threshold">과매수 수준</Label>
                  <Input id="rsi-overbought-threshold" type="number" defaultValue="70" min="50" max="100" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="rsi-oversold" className="flex flex-col gap-1">
                    <span>과매도 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      RSI가 설정한 수준 이하일 때 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="rsi-oversold" defaultChecked />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rsi-oversold-threshold">과매도 수준</Label>
                  <Input id="rsi-oversold-threshold" type="number" defaultValue="30" min="0" max="50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>MACD 알림</CardTitle>
                <CardDescription>MACD(이동평균수렴확산)가 특정 조건을 만족할 때 알림을 받습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="macd-crossover" className="flex flex-col gap-1">
                    <span>골든 크로스 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      MACD가 시그널 라인을 상향 돌파할 때 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="macd-crossover" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="macd-crossunder" className="flex flex-col gap-1">
                    <span>데드 크로스 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      MACD가 시그널 라인을 하향 돌파할 때 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="macd-crossunder" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="dividend" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>배당금 알림</CardTitle>
                <CardDescription>배당금 관련 이벤트에 대한 알림을 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dividend-announcement" className="flex flex-col gap-1">
                    <span>배당금 발표 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      회사가 배당금을 발표할 때 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="dividend-announcement" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dividend-ex-date" className="flex flex-col gap-1">
                    <span>배당락일 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      배당락일 하루 전에 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="dividend-ex-date" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dividend-payment" className="flex flex-col gap-1">
                    <span>배당금 지급일 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">배당금 지급일에 알림을 받습니다.</span>
                  </Label>
                  <Switch id="dividend-payment" defaultChecked />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dividend-yield-threshold">배당 수익률 임계값 (%)</Label>
                  <Input id="dividend-yield-threshold" type="number" defaultValue="3" min="0" max="20" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>뉴스 알림</CardTitle>
                <CardDescription>주식 관련 뉴스에 대한 알림을 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="news-all" className="flex flex-col gap-1">
                    <span>모든 뉴스 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      관심 주식에 관한 모든 뉴스를 받습니다.
                    </span>
                  </Label>
                  <Switch id="news-all" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="news-important" className="flex flex-col gap-1">
                    <span>중요 뉴스만 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      주가에 큰 영향을 미칠 수 있는 중요 뉴스만 받습니다.
                    </span>
                  </Label>
                  <Switch id="news-important" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="news-sentiment" className="flex flex-col gap-1">
                    <span>감정 분석 기반 알림</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      긍정적이거나 부정적인 뉴스에 대해서만 알림을 받습니다.
                    </span>
                  </Label>
                  <Switch id="news-sentiment" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-4">
          <Button variant="outline">취소</Button>
          <Button>저장</Button>
        </div>
      </main>
    </div>
  )
}
