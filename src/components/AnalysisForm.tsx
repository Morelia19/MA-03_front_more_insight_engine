interface AnalysisFormProps {
    objetivos: string[];
    desarrollo: string;
    actitud: string;
    recomendaciones: string;
    onObjetivosChange: (value: string[]) => void;
    onDesarrolloChange: (value: string) => void;
    onActitudChange: (value: string) => void;
    onRecomendacionesChange: (value: string) => void;
}

export default function AnalysisForm({ objetivos, desarrollo, actitud, recomendaciones, onObjetivosChange, onDesarrolloChange, onActitudChange, onRecomendacionesChange }: AnalysisFormProps) {
    const addObjetivo = () => {
        onObjetivosChange([...objetivos, ''])
    }

    const updateObjetivo = (index: number, value: string) => {
        const newObjetivos = [...objetivos]
        newObjetivos[index] = value
        onObjetivosChange(newObjetivos)
    }

    const removeObjetivo = (index: number) => {
        onObjetivosChange(objetivos.filter((_, i) => i !== index))
    }

    return (
        <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-6">
            <h3 className="font-semibold text-gray-900 mb-4">Análisis Pedagógico (Editable)</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objetivos de la Sesión
                </label>
                {objetivos.map((obj, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={obj}
                            onChange={(e) => updateObjetivo(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                            placeholder={`Objetivo ${index + 1}`}
                        />
                        <button
                            type="button"
                            onClick={() => removeObjetivo(index)}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addObjetivo}
                    className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200"
                >
                    + Agregar Objetivo
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desarrollo de la Sesión
                </label>
                <textarea
                    value={desarrollo}
                    onChange={(e) => onDesarrolloChange(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                    placeholder="Describe cómo se desarrolló la sesión..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actitud en Clase
                </label>
                <textarea
                    value={actitud}
                    onChange={(e) => onActitudChange(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                    placeholder="Describe la actitud y participación del estudiante..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recomendaciones
                </label>
                <textarea
                    value={recomendaciones}
                    onChange={(e) => onRecomendacionesChange(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
                    placeholder="Recomendaciones para mejorar..."
                />
            </div>
        </div>
    )
}
