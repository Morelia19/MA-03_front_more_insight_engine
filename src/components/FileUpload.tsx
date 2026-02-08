import { Upload } from 'lucide-react'
import { ChangeEvent } from 'react'

interface FileUploadProps {
    id: string;
    label: string;
    accept?: string;
    file: File | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showPreview?: boolean;
    type?: 'image' | 'video' | 'session-photo' | 'logo';
}

export default function FileUpload({ id, label, accept, file, onChange, showPreview = true, type = 'image' }: FileUploadProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors">
                <label htmlFor={id} className="cursor-pointer">
                    {file && showPreview ? (
                        <div>
                            {type === 'image' ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="mx-auto h-24 w-auto rounded-lg mb-2 object-contain"
                                />
                            ) : type === 'video' ? (
                                <video
                                    src={URL.createObjectURL(file)}
                                    className="mx-auto h-32 w-auto rounded-lg mb-2 object-cover"
                                    controls={false}
                                />
                            ) : null}
                            <p className="text-sm text-gray-600">{type === 'video' ? '🎥' : ''} {file.name}</p>
                            <p className="text-xs text-gray-600">Cambiar archivo</p>
                        </div>
                    ) : (
                        <div>
                            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                            <span className="text-sm text-indigo-600">{label}</span>
                            {type === 'session-photo' && (
                                <p className="text-xs text-gray-500 mt-1">Captura horizontal con profesor y alumno</p>
                            )}
                            {type === 'logo' && (
                                <p className="text-xs text-gray-500 mt-1">Imagen circular o cuadrada</p>
                            )}
                        </div>
                    )}
                    <input
                        id={id}
                        type="file"
                        accept={accept}
                        className="sr-only"
                        onChange={onChange}
                    />
                </label>
            </div>
        </div>
    )
}
