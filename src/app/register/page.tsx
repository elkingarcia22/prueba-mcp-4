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
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signUp(email, password)

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
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        border="1px"
        borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      >
        <VStack gap={6}>
          <Box textAlign="center" w="full">
            <VStack gap={2}>
              <Heading size="lg" color={colorMode === 'dark' ? 'white' : 'gray.900'}>
                Crear Cuenta
              </Heading>
              <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                Regístrate para acceder al sistema
              </Text>
            </VStack>
          </Box>

          {error && (
            <Box
              p={4}
              bg="red.50"
              border="1px"
              borderColor="red.200"
              borderRadius="md"
              w="full"
            >
              <Text color="red.600" fontSize="sm">
                {error}
              </Text>
            </Box>
          )}

          <Box as="form" onSubmit={handleSubmit} w="full">
            <VStack gap={4}>
              <Box w="full">
                <Text mb={2} color={colorMode === 'dark' ? 'white' : 'gray.900'} fontWeight="medium">
                  Email
                </Text>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg={colorMode === 'dark' ? 'gray.700' : 'white'}
                  borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
                  color={colorMode === 'dark' ? 'white' : 'gray.900'}
                  _hover={{
                    borderColor: colorMode === 'dark' ? 'gray.500' : 'gray.400',
                  }}
                  _focus={{
                    borderColor: 'brand.500',
                    boxShadow: `0 0 0 1px ${colorMode === 'dark' ? '#0ea5e9' : '#0284c7'}`,
                  }}
                />
              </Box>

              <Box w="full">
                <Text mb={2} color={colorMode === 'dark' ? 'white' : 'gray.900'} fontWeight="medium">
                  Contraseña
                </Text>
                <Input
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={colorMode === 'dark' ? 'gray.700' : 'white'}
                  borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
                  color={colorMode === 'dark' ? 'white' : 'gray.900'}
                  _hover={{
                    borderColor: colorMode === 'dark' ? 'gray.500' : 'gray.400',
                  }}
                  _focus={{
                    borderColor: 'brand.500',
                    boxShadow: `0 0 0 1px ${colorMode === 'dark' ? '#0ea5e9' : '#0284c7'}`,
                  }}
                />
              </Box>

              <Button
                type="submit"
                size="lg"
                w="full"
                isLoading={loading}
                bg="brand.600"
                color="white"
                _hover={{
                  bg: 'brand.700',
                }}
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </VStack>
          </Box>

          <VStack gap={2} w="full">
            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'} fontSize="sm">
              ¿Ya tienes cuenta?{' '}
              <Text
                as="span"
                color="brand.600"
                cursor="pointer"
                textDecoration="underline"
                onClick={() => router.push('/login')}
              >
                Inicia sesión aquí
              </Text>
            </Text>
            
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
              />
              <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                {colorMode === 'light' ? 'Modo Claro' : 'Modo Oscuro'}
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </Container>
  )
}