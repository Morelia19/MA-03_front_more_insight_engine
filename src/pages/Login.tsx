import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MoreAcademyMiniLogo from '../assets/img/more-academy-mini-logo.png'
import { supabase } from '../data/supabase'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // First attempt to login with Supabase Auth
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (authError) {
                // Fallback to local testing credentials if Supabase fails
                if (email === 'admin@moreacademy.edu' && password === 'admin123') {
                    navigate('/dashboard')
                    return
                }
                console.error('Supabase Login error:', authError.message)
                setError('Correo o contraseña incorrectos. Por favor, intenta de nuevo.')
                return
            }

            if (data.user) {
                navigate('/dashboard')
            }
        } catch (err) {
            console.error('Unexpected login error:', err)
            setError('Ocurrió un error inesperado. Por favor, intenta más tarde.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] p-6">
            <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl animate-[slideInUp_0.6s_ease-out]">
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300">
                        <img
                            src={MoreAcademyMiniLogo}
                            alt="More Academy Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1
                        className="text-3xl text-gray-900 mb-2 font-bold"
                        style={{ fontFamily: 'TTSquares-Bold, sans-serif' }}
                    >
                        Bienvenido de Nuevo
                    </h1>
                    <p
                        className="text-base text-gray-600"
                        style={{ fontFamily: 'Lato-Regular, sans-serif' }}
                    >
                        Inicia sesión en tu cuenta de More Academy
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-[shake_0.5s_ease-in-out]">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-900 mb-2"
                            style={{ fontFamily: 'Lato-Bold, sans-serif' }}
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3.5 text-black border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 bg-gray-50 focus:border-[#8568C0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(133,104,192,0.1)] placeholder:text-gray-400"
                            placeholder="tu@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ fontFamily: 'Lato-Regular, sans-serif' }}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-900 mb-2"
                            style={{ fontFamily: 'Lato-Bold, sans-serif' }}
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3.5 text-black border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 bg-gray-50 focus:border-[#8568C0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(133,104,192,0.1)] placeholder:text-gray-400"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ fontFamily: 'Lato-Regular, sans-serif' }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-4 text-base font-semibold text-white bg-gradient-to-br from-[#8568C0] to-[#6B4FA3] border-none rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-[#8568C0]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#8568C0]/40 active:translate-y-0 active:shadow-lg active:shadow-[#8568C0]/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        style={{ fontFamily: 'Lato-Bold, sans-serif' }}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="text-center text-sm">
                    <span
                        className="text-gray-600"
                        style={{ fontFamily: 'Lato-Regular, sans-serif' }}
                    >
                        ¿Necesitas ayuda?{' '}
                    </span>
                    <a
                        href="https://wa.me/51972799160"
                        className="text-[#8568C0] font-semibold no-underline transition-all duration-300 relative hover:text-[#6B4FA3] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-2px] after:left-0 after:bg-[#8568C0] after:transition-all after:duration-300 hover:after:w-full"
                        style={{ fontFamily: 'Lato-Bold, sans-serif' }}
                    >
                        Contáctanos
                    </a>
                </div>
            </div>

            <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
        </div>
    )
}

export default Login
