'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminPage() {
  const { user, loading, signOut } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <Container maxW="md" py={12}>
        <VStack gap={4}>
          <Text>Cargando...</Text>
        </VStack>
      </Container>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Container maxW="container.md" py={12}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color={colorMode === 'dark' ? 'white' : 'gray.900'}>
                Panel de Administración
              </Heading>
              <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                Bienvenido, {user?.email}
              </Text>
            </Box>
            <HStack gap={2}>
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
              />
              <Button onClick={handleSignOut} colorScheme="red" size="sm">
                Cerrar Sesión
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* User Info */}
        <Box
          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          border="1px"
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        >
          <Heading size="md" color={colorMode === 'dark' ? 'white' : 'gray.900'} mb={4}>
            Información del Usuario
          </Heading>
          
          <VStack gap={4} align="stretch">
            <Box>
              <Text fontWeight="bold" color={colorMode === 'dark' ? 'white' : 'gray.900'}>Email:</Text>
              <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                {user?.email}
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold" color={colorMode === 'dark' ? 'white' : 'gray.900'}>ID:</Text>
              <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'} fontSize="sm">
                {user?.id}
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold" color={colorMode === 'dark' ? 'white' : 'gray.900'}>Fecha de Registro:</Text>
              <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                {formatDate(user?.created_at || null)}
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold" color={colorMode === 'dark' ? 'white' : 'gray.900'}>Último Acceso:</Text>
              <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                {formatDate(user?.last_sign_in_at || null)}
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold" color={colorMode === 'dark' ? 'white' : 'gray.900'}>Email Confirmado:</Text>
              <Text color={user?.email_confirmed_at ? 'green.600' : 'yellow.600'}>
                {user?.email_confirmed_at ? '✅ Sí' : '⏳ Pendiente'}
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Additional Info */}
        <Box
          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          border="1px"
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        >
          <Heading size="md" color={colorMode === 'dark' ? 'white' : 'gray.900'} mb={4}>
            Funcionalidades del Sistema
          </Heading>
          <VStack gap={3} align="stretch">
            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
              ✅ Autenticación con Supabase
            </Text>
            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
              ✅ Modo oscuro/claro funcional
            </Text>
            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
              ✅ Diseño responsive con Chakra UI
            </Text>
            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
              ✅ Protección de rutas
            </Text>
            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
              ✅ Gestión de usuarios
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}