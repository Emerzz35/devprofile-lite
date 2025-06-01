"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, FileText, ExternalLink, LogOut } from "lucide-react"
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface UserProfile {
  nomeCompleto: string
  bioCurta: string
  linkPortfolio: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        await loadUserProfile(currentUser.uid)
      } else {
        router.push("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const loadUserProfile = async (uid: string) => {
    try {
      const profileDoc = await getDoc(doc(db, "userProfiles", uid))

      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as UserProfile)
      } else {
        setProfile(null)
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error)
      setError("Erro ao carregar dados do perfil")
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p>Carregando perfil...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações da Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>UID:</strong> {user?.uid}
              </p>
              <p>
                <strong>Conta criada em:</strong>{" "}
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString("pt-BR")
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Data Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dados do Perfil
            </CardTitle>
            <CardDescription>Informações lidas do Firestore</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {profile ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                  <p className="mt-1 text-gray-900">{profile.nomeCompleto}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Biografia</label>
                  <p className="mt-1 text-gray-900">{profile.bioCurta}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Link do Portfólio</label>
                  {profile.linkPortfolio ? (
                    <div className="mt-1">
                      <a
                        href={profile.linkPortfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        {profile.linkPortfolio}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ) : (
                    <p className="mt-1 text-gray-500">Não informado</p>
                  )}
                </div>
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  Perfil ainda não configurado. Os dados do perfil devem ser adicionados manualmente no Firestore usando
                  o UID: <code className="bg-gray-100 px-1 rounded">{user?.uid}</code>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Como configurar o perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Para configurar seu perfil, adicione um documento na coleção{" "}
                <code className="bg-gray-100 px-1 rounded">userProfiles</code> do Firestore com:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>ID do documento:</strong> {user?.uid}
                </li>
                <li>
                  <strong>Campos:</strong>
                </li>
                <ul className="list-disc list-inside ml-4">
                  <li>nomeCompleto: &quot;Seu Nome Aqui&quot;</li>
                  <li>bioCurta: &quot;Uma breve descrição sobre você&quot;</li>
                  <li>linkPortfolio: &quot;http://seulink.com&quot;</li>
                </ul>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
