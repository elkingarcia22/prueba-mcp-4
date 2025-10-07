'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container, Heading, Text, VStack, Button, Spinner } from '@chakra-ui/react'
import { useAuth } from '@/contexts/AuthContext'
import { NoSSR } from '@/components/NoSSR'

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
    <NoSSR fallback={
      <Container maxW="md" py={12}>
        <VStack gap={6} textAlign="center">
          <Heading size="lg" color="gray.900" _dark={{ color: 'gray.50' }}>
            Sistema de Autenticación
          </Heading>
          <Text color="gray.600" _dark={{ color: 'gray.400' }}>
            Cargando...
          </Text>
        </VStack>
      </Container>
    }>
      <Container maxW="md" py={12}>
        <VStack gap={6} textAlign="center">
          <Heading size="lg" color="gray.900" _dark={{ color: 'gray.50' }}>
            Sistema de Autenticación
          </Heading>
          <Text color="gray.600" _dark={{ color: 'gray.400' }}>
            Redirigiendo...
          </Text>
        </VStack>
      </Container>
    </NoSSR>
  )
}
