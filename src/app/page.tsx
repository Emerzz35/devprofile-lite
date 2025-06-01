import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">DevProfile Lite</CardTitle>
          <CardDescription>Sistema simples de autenticação e visualização de perfil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/login">
              <Button className="w-full" variant="default">
                Entrar
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-full" variant="outline">
                Cadastrar
              </Button>
            </Link>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>Faça login para acessar seu perfil</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
