'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin')
    }

    setLoading(false)
  }

  return (
    <Container maxW="md" py={12}>
      <Box
        bg="white"
        _dark={{ bg: 'gray.800' }}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        border="1px"
        borderColor="gray.200"
        _dark={{ borderColor: 'gray.700' }}
      >
        <VStack gap={6}>
          <Box textAlign="center">
            <Heading size="lg" color="gray.900" _dark={{ color: 'gray.50' }}>
              Iniciar Sesión
            </Heading>
            <Text mt={2} color="gray.600" _dark={{ color: 'gray.400' }}>
              Accede a tu cuenta de administrador
            </Text>
          </Box>

          {error && (
            <Box
              p={4}
              bg="red.50"
              borderRadius="md"
              border="1px"
              borderColor="red.200"
              _dark={{ bg: 'red.900', borderColor: 'red.700' }}
            >
              <Text color="red.600" _dark={{ color: 'red.300' }}>
                {error}
              </Text>
            </Box>
          )}

          <Box as="form" onSubmit={handleSubmit} w="full">
            <VStack gap={4}>
              <Box w="full">
                <Text mb={2} color="gray.900" _dark={{ color: 'gray.50' }} fontWeight="medium">
                  Email
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  bg="white"
                  _dark={{ bg: 'gray.700' }}
                  required
                />
              </Box>

              <Box w="full">
                <Text mb={2} color="gray.900" _dark={{ color: 'gray.50' }} fontWeight="medium">
                  Contraseña
                </Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  bg="white"
                  _dark={{ bg: 'gray.700' }}
                  required
                />
              </Box>

              <Button
                type="submit"
                size="lg"
                w="full"
                isLoading={loading}
                bg="brand.600"
                _hover={{ bg: 'brand.700' }}
                color="white"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </VStack>
          </Box>

          <VStack gap={2}>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              ¿No tienes cuenta?{' '}
              <Text
                as="span"
                color="brand.600"
                _hover={{ color: 'brand.700' }}
                cursor="pointer"
                textDecoration="underline"
                onClick={() => window.location.href = '/register'}
              >
                Regístrate aquí
              </Text>
            </Text>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              color="gray.600"
              _dark={{ color: 'gray.400' }}
            >
              {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Container>
  )
}
