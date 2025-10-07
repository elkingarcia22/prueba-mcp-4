'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Heading, Text, VStack, Spinner } from '@chakra-ui/react'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/admin')
      } else {
        router.push('/login')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <Container maxW="md" py={12}>
        <VStack gap={4}>
          <Spinner size="xl" />
          <Text>Cargando...</Text>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="md" py={12}>
      <VStack gap={6} textAlign="center">
        <Heading size="lg">
          Sistema de Autenticación
        </Heading>
        <Text>
          Redirigiendo...
        </Text>
      </VStack>
    </Container>
  )
}