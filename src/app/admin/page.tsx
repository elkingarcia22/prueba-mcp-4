'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
} from '@chakra-ui/react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  email_confirmed_at: string | null
}

export default function AdminPage() {
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    setLoading(false)
  }, [user, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack gap={4}>
          <Spinner size="xl" />
          <Text>Cargando...</Text>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900" _dark={{ color: 'gray.50' }}>
                Panel de Administración
              </Heading>
              <Text color="gray.600" _dark={{ color: 'gray.400' }}>
                Bienvenido, {user?.email}
              </Text>
            </Box>
            <HStack gap={4}>
              <Button
                variant="ghost"
                onClick={toggleTheme}
                color="gray.600"
                _dark={{ color: 'gray.400' }}
              >
                {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Oscuro' : 'Claro'}
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={handleSignOut}
              >
                Cerrar Sesión
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* User Info */}
        <Box
          bg="white"
          _dark={{ bg: 'gray.800' }}
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          border="1px"
          borderColor="gray.200"
          _dark={{ borderColor: 'gray.700' }}
        >
          <Heading size="md" color="gray.900" _dark={{ color: 'gray.50' }} mb={4}>
            Información del Usuario
          </Heading>
          
          <VStack gap={4} align="stretch">
            <Box>
              <Text fontWeight="bold" color="gray.900" _dark={{ color: 'gray.50' }}>Email:</Text>
              <Text color="gray.600" _dark={{ color: 'gray.400' }}>
                {user?.email}
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold" color="gray.900" _dark={{ color: 'gray.50' }}>ID:</Text>
              <Text color="gray.600" _dark={{ color: 'gray.400' }} fontSize="sm">
                {user?.id}
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold" color="gray.900" _dark={{ color: 'gray.50' }}>Fecha de Registro:</Text>
              <Text color="gray.600" _dark={{ color: 'gray.400' }}>
                {formatDate(user?.created_at || null)}
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold" color="gray.900" _dark={{ color: 'gray.50' }}>Último Acceso:</Text>
              <Text color="gray.600" _dark={{ color: 'gray.400' }}>
                {formatDate(user?.last_sign_in_at || null)}
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold" color="gray.900" _dark={{ color: 'gray.50' }}>Email Confirmado:</Text>
              <Text color={user?.email_confirmed_at ? 'green.600' : 'yellow.600'}>
                {user?.email_confirmed_at ? '✅ Sí' : '⏳ Pendiente'}
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Info Alert */}
        <Box
          p={4}
          bg="blue.50"
          borderRadius="md"
          border="1px"
          borderColor="blue.200"
          _dark={{ bg: 'blue.900', borderColor: 'blue.700' }}
        >
          <Text fontWeight="bold" color="blue.600" _dark={{ color: 'blue.300' }}>
            Nota:
          </Text>
          <Text color="blue.600" _dark={{ color: 'blue.300' }}>
            Para acceder a funciones administrativas completas, necesitas permisos de administrador en Supabase.
            Actualmente solo puedes ver tu propia información.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}
