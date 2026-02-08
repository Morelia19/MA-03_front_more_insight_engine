import { useState, ChangeEvent, FormEvent } from 'react'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import FormHeader from '../components/FormHeader'
import FileUpload from '../components/FileUpload'
import StatusMessage from '../components/StatusMessage'
import AnalysisForm from '../components/AnalysisForm'
import '../index.css'

interface AnalysisData {
  transcript: string;
  report: {
    desarrollo: {
      objetivos: string[] | null;
      desarrollo: string | { [key: string]: unknown };
      actitud: string | number;
      recomendaciones: string;
    };
  };
}

interface ResultData {
  status: string;
  report_image: string;
}

function Dashboard() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [sessionPhoto, setSessionPhoto] = useState<File | null>(null)
  const [logo, setLogo] = useState<File | null>(null)
  const [teacherName, setTeacherName] = useState<string>('Profesor')
  const [studentName, setStudentName] = useState<string>('Estudiante')
  const [sessionNumber, setSessionNumber] = useState<number>(1)
  const [totalSessions, setTotalSessions] = useState<number>(8)
  const [sessionDate, setSessionDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState<boolean>(false)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)

  const [objetivos, setObjetivos] = useState<string[]>([])
  const [desarrollo, setDesarrollo] = useState<string>('')
  const [actitud, setActitud] = useState<string>('')
  const [recomendaciones, setRecomendaciones] = useState<string>('')

  const [result, setResult] = useState<ResultData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [generatingReport, setGeneratingReport] = useState<boolean>(false)

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
    setError(null)
    setAnalysisData(null)
    setObjetivos([])
    setDesarrollo('')
    setActitud('')
    setRecomendaciones('')
    setResult(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!videoFile) {
      setError('Por favor selecciona un archivo de video')
      return
    }

    setLoading(true)
    setError(null)
    setAnalysisData(null)
    setResult(null)

    const formData = new FormData()
    formData.append('video', videoFile)
    formData.append('teacher_name', teacherName)
    formData.append('student_name', studentName)
    formData.append('session_number', sessionNumber.toString())
    formData.append('total_sessions', totalSessions.toString())
    formData.append('session_date', sessionDate)

    try {
      const response = await axios.post<AnalysisData>('http://localhost:8000/analyze_class', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setAnalysisData(response.data)
      const desarrolloData = response.data.report.desarrollo

      setObjetivos(Array.isArray(desarrolloData.objetivos) ? desarrolloData.objetivos : [])
      setDesarrollo(typeof desarrolloData.desarrollo === 'string' ? desarrolloData.desarrollo : JSON.stringify(desarrolloData.desarrollo))
      setActitud(typeof desarrolloData.actitud === 'string' ? desarrolloData.actitud : String(desarrolloData.actitud))
      setRecomendaciones(typeof desarrolloData.recomendaciones === 'string' ? desarrolloData.recomendaciones : '')


    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al procesar el archivo')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = async () => {
    setGeneratingReport(true)
    setError(null)

    try {
      const editedReport = { objetivos, desarrollo, actitud, recomendaciones }
      const formData = new FormData()
      formData.append('analysis', JSON.stringify(editedReport))

      if (sessionPhoto) formData.append('session_photo', sessionPhoto)
      if (logo) formData.append('logo', logo)

      formData.append('teacher_name', teacherName)
      formData.append('student_name', studentName)
      formData.append('session_number', sessionNumber.toString())
      formData.append('total_sessions', totalSessions.toString())
      formData.append('session_date', sessionDate)

      const response = await axios.post<ResultData>('http://localhost:8000/generate_report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setResult(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al generar el reporte')
    } finally {
      setGeneratingReport(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <FormHeader />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Estudiante
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                  placeholder="Nombre del estudiante"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Profesor
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                  placeholder="Nombre del profesor"
                />
              </div>
            </div>

            <FileUpload
              id="video-upload"
              label="Archivo de Video"
              accept="video/*"
              file={videoFile}
              onChange={handleVideoChange}
              type="video"
            />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Sesión
                </label>
                <input
                  type="number"
                  min="1"
                  value={sessionNumber}
                  onChange={(e) => setSessionNumber(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total de Sesiones
                </label>
                <input
                  type="number"
                  min="1"
                  value={totalSessions}
                  onChange={(e) => setTotalSessions(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de la Sesión
                </label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                />
              </div>
            </div>

            <FileUpload
              id="logo"
              label="Logo (Opcional)"
              accept="image/*"
              file={logo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) setLogo(e.target.files[0])
              }}
              type="image"
            />

            <FileUpload
              id="session-photo"
              label="Foto de la Sesión (Opcional)"
              accept="image/*"
              file={sessionPhoto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) setSessionPhoto(e.target.files[0])
              }}
              type="image"
            />

            <button
              type="submit"
              disabled={loading || !videoFile}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analizando...
                </>
              ) : (
                'Analizar Clase'
              )}
            </button>
          </form>

          {error && (
            <StatusMessage type="error" title="Error" message={error} />
          )}

          {analysisData && !result && (
            <div className="mt-6 space-y-4">
              <StatusMessage
                type="info"
                title=" Análisis Completado"
                message="Revisa el contenido y edítalo si es necesario. Luego genera el reporte visual."
              />

              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-gray-900">▼ Ver transcripción</summary>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{analysisData.transcript}</p>
              </details>

              <AnalysisForm
                objetivos={objetivos}
                desarrollo={desarrollo}
                actitud={actitud}
                recomendaciones={recomendaciones}
                onObjetivosChange={setObjetivos}
                onDesarrolloChange={setDesarrollo}
                onActitudChange={setActitud}
                onRecomendacionesChange={setRecomendaciones}
              />

              <button
                onClick={handleGenerateReport}
                disabled={generatingReport}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {generatingReport ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generando Reporte Visual...
                  </>
                ) : (
                  'Generar Reporte Visual'
                )}
              </button>
            </div>
          )}

          {result?.status === 'success' && (
            <div className="mt-6 space-y-4">
              <StatusMessage
                type="success"
                title="¡Reporte Generado!"
                message="El análisis se completó exitosamente"
              />

              {result.report_image && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Reporte Visual:</h3>
                  <img
                    src={`http://localhost:8000${result.report_image}`}
                    alt="Reporte Pedagógico"
                    className="w-full rounded-lg shadow-lg"
                  />
                  <a
                    href={`http://localhost:8000${result.report_image}`}
                    download
                    className="mt-4 inline-block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Descargar Reporte
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
