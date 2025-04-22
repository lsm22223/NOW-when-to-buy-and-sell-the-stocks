import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function UserSettings() {
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
          <User className="h-6 w-6" />
          <span className="text-lg font-semibold">알림 설정</span>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">알림 설정</h1>
          <p className="text-muted-foreground">알림 방법 및 빈도를 설정하세요.</p>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>알림 방법</CardTitle>
              <CardDescription>알림을 받을 방법을 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="push">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="push" id="push" />
                  <Label htmlFor="push">푸시 알림</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">이메일</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">푸시 알림 및 이메일</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>알림 빈도</CardTitle>
              <CardDescription>알림을 받을 빈도를 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="frequency">알림 빈도</Label>
                <Select defaultValue="realtime">
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="알림 빈도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">실시간</SelectItem>
                    <SelectItem value="hourly">시간별 요약</SelectItem>
                    <SelectItem value="daily">일별 요약</SelectItem>
                    <SelectItem value="weekly">주간 요약</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="quiet-hours" className="flex flex-col gap-1">
                  <span>방해 금지 시간</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    설정한 시간 동안 알림을 받지 않습니다.
                  </span>
                </Label>
                <Switch id="quiet-hours" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quiet-start">시작 시간</Label>
                  <Select defaultValue="22">
                    <SelectTrigger id="quiet-start">
                      <SelectValue placeholder="시작 시간" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quiet-end">종료 시간</Label>
                  <Select defaultValue="7">
                    <SelectTrigger id="quiet-end">
                      <SelectValue placeholder="종료 시간" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button>저장</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
