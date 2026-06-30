import React, { useState } from 'react'
import { Wallet, CheckCircle, ChevronDown, ChevronUp, CreditCard } from 'lucide-react'
import { TeacherPaymentInterface, StudentPaymentDetail } from '../interface'

interface PaymentsTabProps {
    payments: TeacherPaymentInterface[]
    setPayments: React.Dispatch<React.SetStateAction<TeacherPaymentInterface[]>>
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({ payments, setPayments }) => {
    const [openTeacherId, setOpenTeacherId] = useState<string | null>('teacher-1')

    const totalPending = payments
        .filter(p => p.status === 'Pendiente')
        .reduce((sum, p) => sum + p.amount, 0)

    const totalPaid = payments
        .filter(p => p.status === 'Pagado')
        .reduce((sum, p) => sum + p.amount, 0)

    const totalClassesImparted = payments.reduce((sum, p) => sum + p.totalClasses, 0)

    const handlePayTeacher = (teacherId: string, amount: number) => {
        if (!globalThis.confirm(`¿Confirmas el pago de S/ ${amount} a este docente?`)) {
            return
        }

        const markStudentDetailsPaid = (sd: StudentPaymentDetail) => ({
            ...sd,
            completedClasses: sd.totalClasses
        })

        const updateTeacherPayment = (p: TeacherPaymentInterface) => {
            if (p.id !== teacherId) {
                return p
            }
            return {
                ...p,
                status: 'Pagado' as const,
                studentDetails: p.studentDetails.map(markStudentDetailsPaid)
            }
        }

        setPayments(prev => prev.map(updateTeacherPayment))
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pagos a Docentes</h1>
                <p className="text-slate-500 text-sm mt-1">S/20 por clase impartida</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">S/ {totalPending}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total pendiente</div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">S/ {totalPaid}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total pagado este mes</div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{totalClassesImparted}</div>
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Clases impartidas</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {payments.map((payment) => {
                    const isOpen = openTeacherId === payment.id
                    const isPaid = payment.status === 'Pagado'

                    return (
                        <div
                            key={payment.id}
                            className="bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300"
                        >
                            <button
                                type="button"
                                className="w-full text-left p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 block focus:outline-none"
                                onClick={() => setOpenTeacherId(isOpen ? null : payment.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        💳
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-base leading-snug">{payment.teacherName}</h3>
                                        <p className="text-slate-400 text-xs font-semibold mt-0.5">
                                            {payment.totalClasses} clases x S/{payment.rate} • {payment.studentsCount} alumnos
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    <div className="text-right">
                                        <div className="text-base font-extrabold text-slate-900">S/ {payment.amount}</div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{payment.status}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {isPaid ? (
                                            <span className="px-4 py-2 bg-slate-50 border border-slate-200 text-[#8568C0] rounded-xl text-xs font-bold shadow-xs">
                                                Pagado
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handlePayTeacher(payment.id, payment.amount)
                                                }}
                                                className="px-5 py-2 bg-[#8568C0] hover:bg-[#7456b3] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#8568c0]/10"
                                            >
                                                Pagar
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setOpenTeacherId(isOpen ? null : payment.id)
                                            }}
                                            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-all"
                                        >
                                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </button>

                            {isOpen && (
                                <div className="px-6 pb-6 border-t border-slate-100 pt-5 bg-slate-50/30">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Detalle por alumno</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {payment.studentDetails.map((detail:any) => {
                                            const pendingCount = detail.totalClasses - detail.completedClasses
                                            const subtotal = detail.completedClasses * detail.ratePerClass

                                            return (
                                                <div
                                                    key={detail.id}
                                                    className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.01)] flex flex-col gap-4"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                                            {detail.studentName.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h5 className="font-bold text-slate-800 text-xs leading-none">{detail.studentName}</h5>
                                                            <span className="text-[10px] text-slate-400 mt-1 block">
                                                                {detail.completedClasses} de {detail.totalClasses} clases
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-1.5 flex-wrap">
                                                        {Array.from({ length: detail.totalClasses }).map((_, idx) => {
                                                            const isCompleted = idx < detail.completedClasses
                                                            return (
                                                                <span
                                                                    key={`${detail.id}-class-${idx}`}
                                                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                                                                        isCompleted
                                                                            ? 'bg-[#8568C0] text-white border-transparent'
                                                                            : 'bg-transparent text-slate-400 border-slate-200 border-dashed'
                                                                    }`}
                                                                >
                                                                    {idx + 1}
                                                                </span>
                                                            )
                                                        })}
                                                    </div>

                                                    <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3 mt-1 text-slate-500">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-semibold text-slate-400 uppercase">Pendientes</span>
                                                            <span className="font-extrabold text-slate-700">{pendingCount}</span>
                                                        </div>
                                                        <div className="flex flex-col text-right">
                                                            <span className="text-[10px] font-semibold text-slate-400 uppercase">Subtotal</span>
                                                            <span className="font-extrabold text-[#8568C0]">S/ {subtotal}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
