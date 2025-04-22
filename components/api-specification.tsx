import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ApiSpecification() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">주식 알림 대시보드 시스템 - API 명세서</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">API 개요</h2>
        <p className="text-muted-foreground mb-4">
          주식 알림 대시보드 시스템의 API는 RESTful 원칙을 따르며, JSON 형식으로 데이터를 주고받습니다. 모든 API 요청은
          기본 URL <code>https://api.stockalert.com/v1</code>을 통해 이루어집니다.
        </p>
      </div>

      <Tabs defaultValue="stocks">
        <TabsList className="mb-4">
          <TabsTrigger value="stocks">주식 API</TabsTrigger>
          <TabsTrigger value="alerts">알림 API</TabsTrigger>
          <TabsTrigger value="portfolio">포트폴리오 API</TabsTrigger>
          <TabsTrigger value="news">뉴스 API</TabsTrigger>
          <TabsTrigger value="user">사용자 API</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>주식 정보 API</CardTitle>
              <CardDescription>주식 정보 조회 및 관리를 위한 API 엔드포인트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* 주식 목록 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/stocks</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">주식 목록을 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">쿼리 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>market</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>시장 필터 (예: KOSPI, NASDAQ)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>limit</TableCell>
                        <TableCell>integer</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>반환할 최대 항목 수 (기본값: 20)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>offset</TableCell>
                        <TableCell>integer</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>페이지네이션 오프셋 (기본값: 0)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          stocks: [
                            {
                              id: "stock_001",
                              symbol: "005930",
                              name: "삼성전자",
                              market: "KOSPI",
                              price: 78000,
                              change: 2.1,
                              volume: "12345678",
                              marketCap: "465000000000000",
                            },
                            {
                              id: "stock_002",
                              symbol: "AAPL",
                              name: "Apple Inc.",
                              market: "NASDAQ",
                              price: 187.32,
                              change: 1.2,
                              volume: "45678912",
                              marketCap: "2900000000000",
                            },
                          ],
                          total: 2,
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 주식 상세 정보 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/stocks/{"{symbol}"}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">특정 주식의 상세 정보를 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">경로 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>symbol</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>예</TableCell>
                        <TableCell>주식 심볼 (예: 005930, AAPL)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          id: "stock_001",
                          symbol: "005930",
                          name: "삼성전자",
                          market: "KOSPI",
                          price: 78000,
                          change: 2.1,
                          volume: "12345678",
                          marketCap: "465000000000000",
                          highestPrice: {
                            price: 85000,
                            date: "2023-05-15",
                            dropPercentage: 8.24,
                          },
                          dividend: {
                            yield: 2.1,
                            targetYield: 2.5,
                            nextExDate: "2023-12-15",
                          },
                          indicators: {
                            macd: {
                              value: 1.23,
                              signal: 0.98,
                              histogram: 0.25,
                              trend: "bullish",
                            },
                            rsi: {
                              value: 58,
                              previousValue: 48,
                              trend: "상승",
                              isBreakout: true,
                            },
                          },
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 주식 가격 히스토리 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/stocks/{"{symbol}"}/history</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">특정 주식의 가격 히스토리를 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">경로 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>symbol</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>예</TableCell>
                        <TableCell>주식 심볼 (예: 005930, AAPL)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">쿼리 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>interval</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>데이터 간격 (1d, 1w, 1m, 기본값: 1d)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>from</TableCell>
                        <TableCell>string (ISO 날짜)</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>시작 날짜 (기본값: 1년 전)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>to</TableCell>
                        <TableCell>string (ISO 날짜)</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>종료 날짜 (기본값: 현재)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          symbol: "005930",
                          name: "삼성전자",
                          interval: "1d",
                          history: [
                            {
                              date: "2023-07-01",
                              open: 75000,
                              high: 76500,
                              low: 74800,
                              close: 76000,
                              volume: 12345678,
                            },
                            {
                              date: "2023-07-02",
                              open: 76000,
                              high: 77200,
                              low: 75800,
                              close: 77000,
                              volume: 13456789,
                            },
                          ],
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>알림 API</CardTitle>
              <CardDescription>주식 알림 조회 및 관리를 위한 API 엔드포인트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* 알림 목록 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/alerts</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">사용자의 알림 목록을 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">쿼리 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>symbol</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>특정 주식 심볼로 필터링</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>type</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>알림 유형 (price_surge, rsi_oversold 등)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>limit</TableCell>
                        <TableCell>integer</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>반환할 최대 항목 수 (기본값: 20)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>offset</TableCell>
                        <TableCell>integer</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>페이지네이션 오프셋 (기본값: 0)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          alerts: [
                            {
                              id: "alert_001",
                              stockId: "stock_001",
                              stockSymbol: "005930",
                              stockName: "삼성전자",
                              type: "rsi_breakout",
                              message: "RSI 상향돌파 감지: 48 → 58",
                              indicator: "RSI",
                              timestamp: "2023-07-15T10:30:00Z",
                              severity: "medium",
                              isRead: false,
                            },
                            {
                              id: "alert_002",
                              stockId: "stock_003",
                              stockSymbol: "NVDA",
                              stockName: "NVIDIA Corp.",
                              type: "rsi_overbought",
                              message: "RSI 과매수 구간 진입 (78)",
                              indicator: "RSI",
                              timestamp: "2023-07-15T13:45:00Z",
                              severity: "high",
                              isRead: true,
                            },
                          ],
                          total: 2,
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 알림 설정 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/alert-settings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">사용자의 알림 설정을 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          notificationMethod: "push",
                          frequency: "realtime",
                          quietHours: {
                            enabled: true,
                            start: "22:00",
                            end: "07:00",
                          },
                          priceAlerts: {
                            priceSurge: {
                              enabled: true,
                              threshold: 5,
                            },
                            priceDrop: {
                              enabled: true,
                              threshold: 5,
                            },
                          },
                          technicalAlerts: {
                            rsiOverbought: {
                              enabled: true,
                              threshold: 70,
                            },
                            rsiOversold: {
                              enabled: true,
                              threshold: 30,
                            },
                            macdCrossover: {
                              enabled: true,
                            },
                            macdCrossunder: {
                              enabled: true,
                            },
                          },
                          dividendAlerts: {
                            announcement: {
                              enabled: true,
                            },
                            exDate: {
                              enabled: true,
                            },
                            payment: {
                              enabled: true,
                            },
                            yieldThreshold: 3,
                          },
                          newsAlerts: {
                            all: {
                              enabled: false,
                            },
                            important: {
                              enabled: true,
                            },
                            sentiment: {
                              enabled: true,
                            },
                          },
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 알림 설정 업데이트 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">PUT</Badge>
                    <h3 className="text-lg font-semibold">/alert-settings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">사용자의 알림 설정을 업데이트합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">요청 본문 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        notificationMethod: "email",
                        frequency: "daily",
                        quietHours: {
                          enabled: true,
                          start: "23:00",
                          end: "08:00",
                        },
                        priceAlerts: {
                          priceSurge: {
                            enabled: true,
                            threshold: 3,
                          },
                          priceDrop: {
                            enabled: true,
                            threshold: 3,
                          },
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        message: "알림 설정이 업데이트되었습니다.",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 알림 읽음 표시 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">PUT</Badge>
                    <h3 className="text-lg font-semibold">/alerts/{"{alertId}"}/read</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">특정 알림을 읽음으로 표시합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">경로 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>alertId</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>예</TableCell>
                        <TableCell>알림 ID</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        message: "알림이 읽음으로 표시되었습니다.",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>포트폴리오 API</CardTitle>
              <CardDescription>보유 주식 및 관심 주식 관리를 위한 API 엔드포인트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* 관심 주식 목록 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/watchlist</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">사용자의 관심 주식 목록을 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">쿼리 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>market</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>시장 필터 (예: KOSPI, NASDAQ)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          watchlist: [
                            {
                              id: "watchlist_001",
                              stockId: "stock_001",
                              symbol: "005930",
                              name: "삼성전자",
                              price: 78000,
                              change: 2.1,
                              priceHistory: [75000, 76000, 77000, 78000],
                              alerts: [
                                {
                                  type: "rsi_oversold",
                                  message: "RSI 과매도 구간 진입 (28)",
                                  timestamp: "2023-07-15T10:30:00Z",
                                },
                              ],
                            },
                            {
                              id: "watchlist_002",
                              stockId: "stock_002",
                              symbol: "AAPL",
                              name: "Apple Inc.",
                              price: 187.32,
                              change: 1.2,
                              priceHistory: [180, 182, 185, 187.32],
                              alerts: [
                                {
                                  type: "price_target",
                                  message: "목표가 $200 도달 가능성",
                                  timestamp: "2023-07-15T14:10:00Z",
                                },
                              ],
                            },
                          ],
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 관심 주식 추가 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-500">POST</Badge>
                    <h3 className="text-lg font-semibold">/watchlist</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">관심 주식을 추가합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">요청 본문 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        symbol: "035420",
                      },
                      null,
                      2,
                    )}
                  </pre>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          id: "watchlist_003",
                          stockId: "stock_004",
                          symbol: "035420",
                          name: "네이버",
                          price: 234500,
                          change: 2.9,
                        },
                        message: "관심 주식이 추가되었습니다.",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 관심 주식 삭제 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-500">DELETE</Badge>
                    <h3 className="text-lg font-semibold">/watchlist/{"{symbol}"}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">관심 주식을 삭제합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">경로 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>symbol</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>예</TableCell>
                        <TableCell>주식 심볼 (예: 005930, AAPL)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        message: "관심 주식이 삭제되었습니다.",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 보유 주식 목록 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/holdings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">사용자의 보유 주식 목록을 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          holdings: [
                            {
                              id: "holding_001",
                              stockId: "stock_001",
                              symbol: "005930",
                              name: "삼성전자",
                              quantity: 100,
                              avgPrice: 65000,
                              currentPrice: 78000,
                              profit: 1300000,
                              profitPercentage: 20,
                              priceHistory: [75000, 76000, 77000, 78000],
                              isHighestPrice: true,
                              highestPrice: {
                                price: 78000,
                                date: "2023-07-15",
                              },
                              purchaseDate: "2023-01-15",
                            },
                            {
                              id: "holding_002",
                              stockId: "stock_002",
                              symbol: "AAPL",
                              name: "Apple Inc.",
                              quantity: 50,
                              avgPrice: 150.25,
                              currentPrice: 187.32,
                              profit: 1853.5,
                              profitPercentage: 24.67,
                              priceHistory: [180, 182, 185, 187.32],
                              isHighestPrice: false,
                              highestPrice: {
                                price: 198.23,
                                date: "2023-05-15",
                              },
                              purchaseDate: "2023-02-10",
                            },
                          ],
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 보유 주식 추가 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-500">POST</Badge>
                    <h3 className="text-lg font-semibold">/holdings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">보유 주식을 추가합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">요청 본문 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        symbol: "035420",
                        quantity: 20,
                        purchaseDate: "2023-03-22",
                      },
                      null,
                      2,
                    )}
                  </pre>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          id: "holding_003",
                          stockId: "stock_004",
                          symbol: "035420",
                          name: "네이버",
                          quantity: 20,
                          avgPrice: 220000,
                          currentPrice: 234500,
                          profit: 290000,
                          profitPercentage: 6.59,
                          purchaseDate: "2023-03-22",
                        },
                        message: "보유 주식이 추가되었습니다.",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 보유 주식 삭제 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-500">DELETE</Badge>
                    <h3 className="text-lg font-semibold">/holdings/{"{holdingId}"}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">보유 주식을 삭제합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">경로 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>holdingId</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>예</TableCell>
                        <TableCell>보유 주식 ID</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        message: "보유 주식이 삭제되었습니다.",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>뉴스 API</CardTitle>
              <CardDescription>주식 관련 뉴스 조회를 위한 API 엔드포인트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* 뉴스 목록 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/news</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">주식 관련 뉴스 목록을 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">쿼리 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>symbol</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>특정 주식 심볼로 필터링</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>sentiment</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>감정 분석 필터 (positive, neutral, negative)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>keyword</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>키워드 검색</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>limit</TableCell>
                        <TableCell>integer</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>반환할 최대 항목 수 (기본값: 20)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>offset</TableCell>
                        <TableCell>integer</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>페이지네이션 오프셋 (기본값: 0)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          news: [
                            {
                              id: "news_001",
                              title: "삼성전자, 2분기 실적 예상치 상회. 반도체 부문 회복세 뚜렷.",
                              summary:
                                "삼성전자가 발표한 2분기 실적이 시장 예상치를 크게 상회했습니다. 특히 반도체 부문의 회복세가 뚜렷하게 나타나며 전체 실적을 견인했습니다. 메모리 반도체 가격 상승과 AI 관련 수요 증가가 주요 원인으로 분석됩니다.",
                              source: "한국경제",
                              time: "2023-07-15T10:30:00Z",
                              sentiment: "positive",
                              relatedStocks: ["005930", "000660"],
                              url: "https://example.com/news/001",
                            },
                            {
                              id: "news_002",
                              title: "현대차, 글로벌 공급망 이슈로 생산량 감소 예상. 주가 하락.",
                              summary:
                                "현대자동차가 글로벌 공급망 문제로 인해 3분기 생산량 감소가 예상된다고 밝혔습니다. 특히 반도체 부품 수급 문제가 지속되면서 일부 모델의 생산 일정이 지연될 것으로 보입니다. 이에 따라 현대차 주가는 오늘 4.1% 하락했습니다.",
                              source: "매일경제",
                              time: "2023-07-15T09:45:00Z",
                              sentiment: "negative",
                              relatedStocks: ["005380", "000270"],
                              url: "https://example.com/news/002",
                            },
                          ],
                          total: 2,
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 주식별 뉴스 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/stocks/{"{symbol}"}/news</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">특정 주식에 관련된 뉴스를 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">경로 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>symbol</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>예</TableCell>
                        <TableCell>주식 심볼 (예: 005930, AAPL)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">쿼리 파라미터</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파라미터</TableHead>
                        <TableHead>타입</TableHead>
                        <TableHead>필수</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>type</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>뉴스 유형 (stock, market)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>limit</TableCell>
                        <TableCell>integer</TableCell>
                        <TableCell>아니오</TableCell>
                        <TableCell>반환할 최대 항목 수 (기본값: 10)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          symbol: "005930",
                          name: "삼성전자",
                          news: [
                            {
                              id: "news_001",
                              title: "삼성전자, 2분기 실적 예상치 상회. 반도체 부문 회복세 뚜렷.",
                              summary:
                                "삼성전자가 발표한 2분기 실적이 시장 예상치를 크게 상회했습니다. 특히 반도체 부문의 회복세가 뚜렷하게 나타나며 전체 실적을 견인했습니다. 메모리 반도체 가격 상승과 AI 관련 수요 증가가 주요 원인으로 분석됩니다.",
                              source: "한국경제",
                              time: "2023-07-15T10:30:00Z",
                              sentiment: "positive",
                              url: "https://example.com/news/001",
                            },
                          ],
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>사용자 API</CardTitle>
              <CardDescription>사용자 정보 관리를 위한 API 엔드포인트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* 사용자 정보 조회 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h3 className="text-lg font-semibold">/user</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">현재 로그인한 사용자의 정보를 조회합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        data: {
                          id: "user_001",
                          name: "홍길동",
                          email: "hong@example.com",
                          phone: "010-1234-5678",
                          createdAt: "2023-01-01T00:00:00Z",
                          subscription: {
                            type: "free",
                            expiresAt: null,
                          },
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 사용자 정보 업데이트 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">PUT</Badge>
                    <h3 className="text-lg font-semibold">/user</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">사용자 정보를 업데이트합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">요청 본문 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        name: "홍길동",
                        phone: "010-9876-5432",
                      },
                      null,
                      2,
                    )}
                  </pre>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        message: "사용자 정보가 업데이트되었습니다.",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                {/* 비밀번호 변경 API */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">PUT</Badge>
                    <h3 className="text-lg font-semibold">/user/password</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">사용자 비밀번호를 변경합니다.</p>

                  <h4 className="font-medium mt-4 mb-2">요청 본문 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        currentPassword: "current_password",
                        newPassword: "new_password",
                        confirmPassword: "new_password",
                      },
                      null,
                      2,
                    )}
                  </pre>

                  <h4 className="font-medium mt-4 mb-2">응답 예시</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(
                      {
                        success: true,
                        message: "비밀번호가 변경되었습니다.",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
